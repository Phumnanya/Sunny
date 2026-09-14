"use client"

//import type React from "react";
import { useState, useRef, useEffect } from "react"; 
import type { VideoOptions } from "@/types/compression";
import type { AudioOptions } from "@/types/compression";
import { BuildVideoArgs } from "@/lib/buildVideoArgs";
import { BuildAudioArgs } from "@/lib/buildAudioArgs";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export default function useConverter(mediafile: File | null, ffmpegRef: React.RefObject<FFmpeg>) {

    const [ConversionStatus, setConversionStatus] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [compressIsRunning, setCompressIsRunning] = useState(false);
    const [downloadName, setDownloadName] = useState<string>("compressed-video.mp4")
    const [newFileSize, setNewFileSize] = useState<string>("0.00");


    const videoMimeTypes: Record<string, string> = {
        mp4: "video/mp4",
        mov: "video/quicktime",
        mkv: "video/x-matroska",
        webm: "video/webm",
    }

    const audioExtensionMap: Record<string, string> = {
        libmp3lame: "mp3",
        aac: "m4a",
        libopus: "opus",
        pcm_s16le: "wav",
        flac: "flac",
    }

    const audioMimeTypes: Record<string, string> = {
        mp3: "audio/mpeg",
        m4a: "audio/mp4",
        opus: "audio/opus",
        wav: "audio/wav",
        flac: "audio/flac",
    }

    //memory cleanup in case the component unmounts or user navigates away, or page re-renders
    useEffect(() => {
        return () => {
            if (videoUrl) URL.revokeObjectURL(videoUrl)
        }
    }, [videoUrl])

    //useref for progress capture
    const isRunningRef = useRef(false)

    useEffect(() => {
        const ffmpeg = ffmpegRef.current

        const handleProgress = ({ progress }: { progress: number }) => {
            if (!isRunningRef.current) return
            const clamped = Math.min(100, Math.max(0, Math.round(progress * 100)))
            setCompressionProgress(clamped)
        }
        const handleLog = ({ message }: { message: string }) => {
            console.log("[ffmpeg]", message)
        }
        ffmpeg.on('progress', handleProgress)
        ffmpeg.on('log', handleLog)

        return () => {
            ffmpeg.off('progress', handleProgress)
            ffmpeg.off('log', handleLog)
        }
    }, [])

    const compressMediaFile = async (
        buildArgs: (inputName: string, outputName: string) => string[],
        outputExtension: string,
        mimeTypeMap: Record<string, string>
    ) => {
        if (!mediafile) return
        const ffmpeg = ffmpegRef.current

        try {
            setCompressIsRunning(true)
            setCompressionProgress(0)
            isRunningRef.current = true   // start accepting progress events
            setConversionStatus("Preparing media engine sandbox...")

            const outputName = `compressed.${outputExtension}`

            try { await ffmpeg.deleteFile(mediafile.name) } catch {}
            try { await ffmpeg.deleteFile(outputName) } catch {}

            await ffmpeg.writeFile(
                mediafile.name,
                await fetchFile(mediafile)
            )
            setConversionStatus("Analyzing editing options...")

            const args = buildArgs(
                mediafile.name,
                outputName
            )
            console.log("Output name:", outputName)
            console.log("FFmpeg args:", args)
            console.log("Starting FFmpeg execution...")

            //check and catch error exit code and Run FFmpeg
            const exitCode = await ffmpeg.exec(args)

            if (exitCode !== 0) {
                throw new Error(`FFmpeg exited with code ${exitCode} — conversion failed`)
            }
            console.log("FFmpeg finished successfully")


            isRunningRef.current = false
            setCompressionProgress(100)
            setConversionStatus("Processing complete! Unpacking results...")

            // Read output
            console.log("Trying to read:", outputName)
            const output = await ffmpeg.readFile(outputName)

            if (!(output instanceof Uint8Array)) {
                throw new Error("Expected binary output from FFmpeg")
            }

            const blob = new Blob(
                [new Uint8Array(output)],
                {
                    type:
                        mimeTypeMap[outputExtension] ??
                        "application/octet-stream",
            })
            //memory cleanup so user can re-convert or run another operation
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl)
            }
            const url = URL.createObjectURL(blob)
            const compressedFile = (blob.size / (1024 * 1024)).toFixed(2);

            setVideoUrl(url)
            setDownloadName(outputName)
            setNewFileSize(compressedFile)
            setConversionStatus("Ready to view and download!")
            setCompressIsRunning(false)

            await ffmpeg.deleteFile(mediafile.name)
            await ffmpeg.deleteFile(outputName)

        } catch (error) {
            console.error("Compression failed:", error)
            setConversionStatus("Compression failed.")
            isRunningRef.current = false
            setCompressIsRunning(false)
        }
    }

    //wrapper for video submit
    const onVideoSubmit = (data: VideoOptions) => {
        if (!mediafile) return;
        
        const extension =
            data.format === "none"
                ? mediafile.name.split(".").pop()!
                : data.format.toLowerCase()

        return compressMediaFile(
            (i, o) => BuildVideoArgs(data, i, o),
            extension,
            videoMimeTypes
        )
    }

    //wrapper for Audio submit
    const onAudioSubmit = (data: AudioOptions) => {
        console.log(data)
        const extension = audioExtensionMap[data.audioCodec] ?? "mp3"

        return compressMediaFile(
            (i, o) => BuildAudioArgs(data, i, o),
            extension,
            audioMimeTypes
        )
    }

    return { ConversionStatus, compressionProgress, compressIsRunning, downloadName, newFileSize, 
        videoUrl, onVideoSubmit, onAudioSubmit }
}