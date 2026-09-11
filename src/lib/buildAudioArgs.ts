import type { AudioOptions } from "@/types/compression";

export function BuildAudioArgs(options: AudioOptions, inputName: string, outputName: string) {
    const args = ["-y","-i", inputName, "-vn"]

    const bitrateApplicable = options.audioCodec !== "pcm_s16le" && options.audioCodec !== "flac"

    if (options.bitrate !== "none" && bitrateApplicable) {
        args.push("-b:a", options.bitrate)
    }

    // audio codec
    if (options.audioCodec !== "none") {
        args.push("-c:a", options.audioCodec)
    }

    // sample Rate
    if (options.sampleRate !== "none") {
        args.push("-ar", String(options.sampleRate))
    }

    // start Time
    if (options.startTime) {
        args.push("-ss", options.startTime)
    }

    // end Time
    if (options.endTime) {
        args.push("-to", options.endTime)
    }

    args.push(outputName)

    return args
}