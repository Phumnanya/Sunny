import type { VideoOptions } from "@/types/compression";

export function BuildVideoArgs(options: VideoOptions, inputName: string, outputName: string) {
    const args = ["-y","-i", inputName]
    
    // Video codec
    const defaultCodecByFormat: Record<string, string> = {
        mp4: "libx264",
        webm: "libvpx-vp9",
        mkv: "libx264",
        mov: "libx264",
    }

    const formatKey = options.format === "none"
    ? inputName.split(".").pop()?.toLowerCase() ?? "mp4"
    : options.format.toLowerCase()

    const codec =
        options.codec === "auto"
            ? defaultCodecByFormat[formatKey]
            : options.codec

    if (codec) {
        args.push("-c:v", codec)
    }

    if ((codec === "libx264" || codec === "libx265") && options.preset && options.preset !== "none") {
        args.push("-preset", options.preset)
    }

    if (codec === "libvpx-vp9" || codec === "libvpx") {
        args.push("-b:v", "0")
    }

    // Compression strength
    args.push("-crf", String(options.crf))

    // FPS
    if (options.fps !== "none") {
        args.push("-r", options.fps)
    }

    // Start time
    if (options.startTime) {
        args.push("-ss", options.startTime)
    }

    // End time
    if (options.endTime) {
        args.push("-to", options.endTime)
    }

    // Remove audio
    if (options.removeAudio) {
        args.push("-an")
    }

    // Video quality / resolution
    const qualityMap: Record<string, string | null> = {
        original: null,
        "1080p": "scale=-2:1080",
        "720p": "scale=-2:720",
        "480p": "scale=-2:480",
        "360p": "scale=-2:360",
    }
    if (options.quality !== "none" && qualityMap[options.quality]) {
        args.push("-vf", qualityMap[options.quality])
    }

    args.push(outputName)

    return args
}