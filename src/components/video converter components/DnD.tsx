"use client"

//import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form'
import Warning from "./warning";
import { Music } from "lucide-react";
import type { VideoOptions } from "@/types/compression";
import type { AudioOptions } from "@/types/compression";
import VideoSettings from "./videoSettings";
import AudioSettings from "./audioSettings";
import { BuildVideoArgs } from "@/lib/buildVideoArgs";
import { BuildAudioArgs } from "@/lib/buildAudioArgs";
import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';


export default function DnD() {
    const [mediafile, setMediaFile] = useState<File | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState('');
    const [ConversionStatus, setConversionStatus] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("video");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadIsRunning, setUploadIsRunning] = useState(false);
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [compressIsRunning, setCompressIsRunning] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [downloadName, setDownloadName] = useState<string>("compressed-video.mp4")

    //new ffmpeg call/creation
    const ffmpegRef = useRef(new FFmpeg());

    //initialize the video form
    const videoForm = useForm<VideoOptions>({
        defaultValues: {
            crf: 23,
            ratio: true,
            removeAudio: false,
            startTime: '',
            endTime: '',
            quality: 'none',
            format: 'none',
            codec: 'auto',
            fps: 'none'
        },
    })

    //initialize the audio form
    const audioForm = useForm<AudioOptions>({
        defaultValues: {
            bitrate: 'original',
            audioCodec: 'original',
            sampleRate: 'original',
            startTime: 'original',
            endTime: 'original'
            },
    })

    //memory cleanup in case the component unmounts or user navigates away, or page re-renders
    useEffect(() => {
        return () => {
            if (videoUrl) URL.revokeObjectURL(videoUrl)
        }
    }, [videoUrl])

    useEffect(() => {
        const ffmpeg = ffmpegRef.current

        const handleProgress = ({ progress }: { progress: number }) => {
            setCompressionProgress(Math.round(progress * 100))
        }
        ffmpeg.on('progress', handleProgress)

        return () => {
            ffmpeg.off('progress', handleProgress)
        }
    }, [])

    //submitting the video comression form
    const onVideoSubmit = async (data: VideoOptions) => {
         try {
            console.log(data)

            if (!mediafile) return

            const ffmpeg = ffmpegRef.current

            setCompressIsRunning(true)
            setCompressionProgress(0)
            setConversionStatus("Preparing media engine sandbox...")

            const extension =
                data.format === "none"
                    ? mediafile.name.split(".").pop()!
                    : data.format.toLowerCase()

            const outputName = `compressed.${extension}`

            try {
                await ffmpeg.deleteFile(mediafile.name)
            } catch {
                // file didn't exist, ignore
            }
            try {
                await ffmpeg.deleteFile(outputName)
            } catch {
                // file didn't exist, ignore
            }

            await ffmpeg.writeFile(
                mediafile.name,
                await fetchFile(mediafile)
            )

            setConversionStatus("Analyzing editing options...")

            const args = BuildVideoArgs(
                data,
                mediafile.name,
                outputName
            )

            console.log("Output name:", outputName)
            console.log("FFmpeg args:", args)

            // Run FFmpeg
            console.log("Starting FFmpeg execution...")

            await ffmpeg.exec(args)

            console.log("FFmpeg finished successfully")

            setConversionStatus("Processing complete! Unpacking results...")

            // Read output
            console.log("Trying to read:", outputName)

            const output = await ffmpeg.readFile(outputName)

            console.log("Output successfully read:", output)

            if (!(output instanceof Uint8Array)) {
                throw new Error("Expected binary output from FFmpeg")
            }

            const videoMimeTypes: Record<string, string> = {
                mp4: "video/mp4",
                mov: "video/quicktime",
                mkv: "video/x-matroska",
                webm: "video/webm",
            }

            const blob = new Blob(
                [new Uint8Array(output)],
                {
                    type:
                        videoMimeTypes[extension] ??
                        "application/octet-stream",
                }
            )
            //memory cleanup so user can re-convert or run another operation
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl)
            }
            const url = URL.createObjectURL(blob)

            setVideoUrl(url)
            setDownloadName(outputName)
            setConversionStatus("Ready to view and download!")
            setCompressIsRunning(false)

            await ffmpeg.deleteFile(mediafile.name)
            await ffmpeg.deleteFile(outputName)

        } catch (error) {
            console.error("Compression failed:", error)
            setConversionStatus("Compression failed.")
        }
    }

    //submitting the Audio compression form
    const onAudioSubmit = async (data: AudioOptions) => {}

    // This handles the entire drag-and-drop state machine automatically
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'audio/*': [],
            'video/*': []
        },
        onDrop: (acceptedFiles) => {     
            if (acceptedFiles.length > 0) {
                startProcess(acceptedFiles[0]);
            }
        }
    });

    //run ffmpeg local file loading while uploading file
    const startProcess = async (file: File) => {
        setUploadProgress(0);
        setUploadIsRunning(true);

        // 1. Kick off Wasm loading in the background
        const ffmpegPromise = loadFFmpeg().catch((err) => {
            console.error("Failed to load FFmpeg engine:", err);
            return false;
        });

        // 2. Run your smooth UI progress bar
        let count = 0;
        await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                count++;
                setUploadProgress(count);

                if (count >= 100) {
                    clearInterval(interval)
                    resolve();
                }
            }, 30);
        });

        // 3. Ensure FFmpeg is ACTUALLY done loading before unlocking the UI
        const loadedSuccessfully = await ffmpegPromise;

        if (loadedSuccessfully !== false) {
            setTimeout(() => {
                setUploadIsRunning(false);
                setMediaFile(file);
                console.log("Upload successful for the chosen file....");
            }, 500);
        } else {
            setUploadIsRunning(false);
        }
    }
    
    //check file type & display features
    const isVideo = mediafile?.type.startsWith("video/") ?? false
    const isAudio = mediafile?.type.startsWith("audio/")?? false
    const previewURL = mediafile ? URL.createObjectURL(mediafile) : null;
    const fileSize = mediafile ? (mediafile.size / (1024 * 1024)).toFixed(2) : null;

    //automatically switch tabs between video & audio depending on type of file uploaded
    useEffect(() => {
        if(isVideo) {
            document.getElementById("fileUpload").style.display = "none";
            document.getElementById("compressor").style.display = "block";
            setActiveTab("video")
        }
        else if (isAudio) {
            document.getElementById("fileUpload").style.display = "none";
            document.getElementById("compressor").style.display = "block";
            setActiveTab("audio")
        }
    }, [isVideo, isAudio])

    
    //Load FFmpeg library into the browser page from files
    const loadFFmpeg = async () => {
        setStatus('Loading FFmpeg binaries...');
        const ffmpeg = ffmpegRef.current;
        
        // Bind logging to watch real-time console prints from the C engine
        ffmpeg.on('log', ({ message }) => {
        setStatus(`Processing: ${message}`);
        });

        // Load Wasm files directly from local storage
        const baseURL = window.location.origin + '/ffmpeg';
        await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        
        setLoaded(true);
        setStatus('FFmpeg Ready for Action!');
        console.log("Upload successful....", status);
    };


    return(
        <>
        <section className="w-full max-w-md border-dashed border-2 border-amber-500 p-10 bg-gray-100 m-auto" id="fileUpload">
            <div className={`h-75 w-full max-w-75 border-2 border-solid flex flex-col cursor-pointer transition-all
            items-center justify-center m-auto rounded-lg
            ${isDragActive ? "border-blue-500 bg-white" : "border-gray-400 bg-gray-50"}`}
            {...getRootProps()}
            >
                <div className="flex flex-col items-center gap-3 pointer-events-none select-none">
                    <img src="/icons8-upload-24.png" alt="upload" className="w-12 h-12 pointer-events-none" draggable="false" />

                    <p className="text-sm text-gray-600 font-medium pointer-events-none">
                        {isDragActive ? "Drop the files here..." : "Drag files to Upload"} 
                    </p>

                    <span className="text-xs text-gray-400 font-light pointer-events-none">or</span>

                    <p className="text-sm text-gray-600 font-medium pointer-events-none">
                        Click here
                    </p>
                    
                    <input {...getInputProps()} className="hidden" id="myfile" name="myfile" />
                </div>
            </div>
            <div className={`w-screen h-screen fixed inset-0 items-center bg-black/50 z-10 p-20 
            justify-center ${uploadIsRunning ? "flex flex-col" : "hidden"}`} id="loader">
                <div className="flex flex-row justify-between items-center w-1/2 mx-auto px-10 pt-5 bg-white">
                    <p>{status}</p>
                    <p>{uploadProgress} %</p>
                </div>
                <div className="bg-white w-1/2 px-10 pb-5 mx-auto">
                    <Progress value={uploadProgress} className="m-auto" />
                </div>
            </div>
        </section>
        <section className="w-full border-3 border-groove p-10 mt-4 hidden" id="compressor">
            { isVideo && previewURL && (
                <>
                <div className="w-60 rounded-lg border p-3">
                    <video src={previewURL} className="w-full h-40 object-cover rounded" muted />
                    <p className="mt-2 text-sm truncate">{mediafile.name}</p>
                </div>
                { mediafile.size > 100 * 1024 * 1024 && (<span><Warning warning="100mb" text="text-yellow-500" /></span>)}
                { mediafile.size > 500 * 1024 * 1024 && (<span><Warning warning="500mb" text="text-orange-500" /></span>)}
                { mediafile.size > 1000 * 1024 * 1024 && (<span><Warning warning="1000mb" text="text-red-500" /></span>)}
                </>
            )}
            { isAudio && previewURL && (
                <>
                <div className="w-60 rounded-lg border p-4 flex items-center gap-3">
                    <div><Music size={20} /></div>
                    <p className="mt-2 text-sm truncate">{mediafile.name}</p>
                    <p className="text-sm text-gray-500">Audio File</p>
                </div>
                { mediafile.size > 100 * 1024 * 1024 && (<span><Warning warning="100mb" text="text-yellow-500" /></span>)}
                { mediafile.size > 500 * 1024 * 1024 && (<span><Warning warning="500mb" text="text-orange-500" /></span>)}
                { mediafile.size > 1000 * 1024 * 1024 && (<span><Warning warning="1000mb" text="text-red-500" /></span>)}
                </>
            )}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-10 mt-10">
                <TabsList variant="line" className="flex justify-between w-full mb-10">
                    <TabsTrigger value="video" disabled={!isVideo} className="disabled:opacity-40">Video</TabsTrigger>
                    <TabsTrigger value="audio" disabled={!isAudio} className="disabled:opacity-40">Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="video">
                    { isVideo && previewURL && (
                        <div className="w-full flex flex-row items-center justify-between mb-10 rounded-lg border p-4">
                            <div>
                                <p className="font-bold text-3xl">{fileSize}mb</p>
                                <p className="text-sm text-gray-600">Uploaded file size</p>
                            </div>
                            <div>
                                <p className="font-bold text-3xl">10.00mb</p>
                                <p className="text-sm text-gray-600">Compressed file size</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={videoForm.handleSubmit(onVideoSubmit)}>
                        <VideoSettings
                            control={videoForm.control}
                            register={videoForm.register}
                            watch={videoForm.watch}
                        />
                        <button type="submit" className="rounded-3xl w-fit px-7 py-2 text-white bg-blue-700
                        mt-12 mb-5">
                            Compress
                        </button>
                        {videoUrl && (
                            <div>
                                <h3 className="text-md font-bold mb-2 text-green-400">Output Result (Processed locally):</h3>
                                <video src={videoUrl} controls className="w-full rounded-lg border border-slate-700" />
                                <div>
                                    <a href={videoUrl} download={downloadName}>
                                        <button type="submit" className="rounded-3xl w-fit px-7 py-2 text-white bg-blue-700
                                        mt-12 mb-5">
                                            Download {downloadName}
                                        </button>
                                    </a>
                                </div>
                            </div>
                        )}
                
                        <div className={`w-screen h-screen fixed inset-0 items-center bg-black/50 z-10 p-20 
                        justify-center ${compressIsRunning ? "flex flex-col" : "hidden"}`} id="loader">
                            <div className="flex flex-row justify-between items-center w-1/2 mx-auto px-10 pt-5 bg-white">
                                <p>{ConversionStatus}</p>
                                <p>{compressionProgress} %</p>
                            </div>
                            <div className="bg-white w-1/2 px-10 pb-5 mx-auto">
                                <Progress value={compressionProgress} className="m-auto" />
                            </div>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="audio">
                    { isAudio && previewURL && (
                        <div className="w-full flex flex-row items-center justify-between mb-10 rounded-lg border p-4">
                            <div>
                                <p className="font-bold text-3xl">{fileSize}mb</p>
                                <p className="text-sm text-gray-600">Uploaded file size</p>
                            </div>
                            <div>
                                <p className="font-bold text-3xl">10.00mb</p>
                                <p className="text-sm text-gray-600">Compressed file size</p>
                            </div>
                        </div>
                    )}
                    <form onSubmit={audioForm.handleSubmit(onAudioSubmit)}>
                        <AudioSettings
                            control={audioForm.control}
                            register={audioForm.register}
                            watch={audioForm.watch}
                        />
                        <button type="submit" className="rounded-3xl w-fit px-7 py-2 text-white bg-blue-700
                        mt-2 mb-5">
                            Compress
                        </button>
                    </form>
                </TabsContent>
            </Tabs>
        </section>
        </>
    )
}


/**
 * 
 */