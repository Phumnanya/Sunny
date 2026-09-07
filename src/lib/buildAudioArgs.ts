import type { AudioOptions } from "@/types/compression";

export function BuildAudioArgs(options: AudioOptions, inputName: string, outputName: string) {
    const args = ["-i", inputName]

    if (options.bitrate !== "none") {
        args.push("-b:a", options.bitrate)
    }

    args.push("-c:a", options.audioCodec)

    if (options.sampleRate) {
        args.push("-ar", String(options.sampleRate))
    }

    if (options.startTime) {
        args.push("-ss", options.startTime)
    }

    if (options.endTime) {
        args.push("-to", options.endTime)
    }

    args.push(outputName)

    return args
}