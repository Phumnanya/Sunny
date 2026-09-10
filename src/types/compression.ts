export type VideoOptions = {
    crf: number
    ratio: boolean
    removeAudio: boolean
    startTime: string
    endTime: string
    quality: string
    format: string
    codec: string
    fps: string
    preset: string // "ultrafast" | "veryfast" | "medium" | "slow" | "none"
}

export type AudioOptions = {
    bitrate: string
    audioCodec: string
    sampleRate: string
    startTime: string
    endTime: string
}