export const videoFormats = {
    MP4: {
        codecs: [
            { label: "H.264", value: "libx264" },
            { label: "H.265 / HEVC", value: "libx265" },
        ],
    },

    WebM: {
        codecs: [
            { label: "VP8", value: "libvpx" },
            { label: "VP9", value: "libvpx-vp9" },
        ],
    },

    MKV: {
        codecs: [
            { label: "H.264", value: "libx264" },
            { label: "H.265 / HEVC", value: "libx265" },
            //{ label: "VP9", value: "libvpx-vp9" },
        ],
    },

    MOV: {
        codecs: [
            { label: "H.264", value: "libx264" },
            { label: "H.265 / HEVC", value: "libx265" },
        ],
    },
} as const