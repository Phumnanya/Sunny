# FFmpeg Video Compressor / Converter

A browser-based video compression and format conversion tool built with **React**, **TypeScript**, and **ffmpeg.wasm**. All processing happens entirely client-side — no video is ever uploaded to a server, so files never leave the user's device.

## Features

- **Video compression** via adjustable CRF (constant rate factor) slider
- **Format conversion** between MP4, MKV, and MOV
- **Codec selection** that's format-aware — the codec dropdown only shows codecs valid for the selected output format, preventing unsupported container/codec combinations
- **Resolution scaling** (1080p, 720p, 480p, 360p) or original resolution
- **Frame rate control** (60 / 30 / 24 fps, or original)
- **Trim support** — set start and end timestamps to cut a clip before conversion
- **Aspect ratio lock** toggle
- **Audio removal** toggle for silent/muted output
- **In-browser preview and download** of the processed result, with no server round-trip

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) as the build tool
- [react-hook-form](https://react-hook-form.com/) for form state management
- [ffmpeg.wasm](https://ffmpegwasm.netlify.app/) (`@ffmpeg/ffmpeg`, `@ffmpeg/util`) for in-browser video processing
- [shadcn/ui](https://ui.shadcn.com/) components (Select, Slider, Checkbox) styled with Tailwind CSS

## How It Works

1. The user selects/drops a video file, which is written into ffmpeg.wasm's in-memory virtual filesystem.
2. Compression and conversion options (CRF, format, codec, quality, fps, trim range, audio removal) are captured through a form and translated into an `ffmpeg` argument array.
3. `ffmpeg.exec()` runs the conversion entirely inside a WebAssembly sandbox in the browser.
4. The resulting output file is read back out of the virtual filesystem, wrapped in a `Blob`, and exposed as a downloadable/previewable object URL.
5. Input and output files are cleaned up from the virtual filesystem after each run to avoid memory buildup across a session.

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/Phumnanya/Sunny.git
cd Sunny
npm install
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Building for production

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── DnD.tsx              # Main upload + conversion submit handler
│   │   ├── videoSettings.tsx    # Video option controls (crf, format, codec, quality, fps, trim)
│   │   └── audioSettings.tsx    # Audio-specific option controls
│   ├── lib/
│   │   ├── buildVideoArgs.ts    # Builds the ffmpeg argument array for video jobs
│   │   ├── buildAudioArgs.ts    # Builds the ffmpeg argument array for audio jobs
│   │   └── videoFormat.ts       # Maps output formats to their valid/available codecs
│   └── types/
│       └── compression.ts       # Shared TypeScript types (VideoOptions, AudioOptions)
```

## Known Limitations

- **WebM / VP8 / VP9 / AV1 are currently unsupported.** The default single-threaded `@ffmpeg/core` build used in this project does not reliably encode `libvpx`, `libvpx-vp9`, or `libaom-av1` — attempts to use them fail with a low-level `RuntimeError: index out of bounds` rather than a clean error. Supporting these properly would require switching to the multi-threaded `@ffmpeg/core-mt` build, which in turn requires the app to be served with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers (for `SharedArrayBuffer` support).
- Processing speed and memory usage are bound by the user's browser and device, since there is no server-side fallback. Large files or high-effort codecs (e.g. H.265) may be slow on lower-end devices.
- AV1 encoding, even where available, is significantly slower in WebAssembly than natively and is not recommended for interactive use.

## Roadmap / Ideas

- [ ] Multi-threaded core (`@ffmpeg/core-mt`) support for WebM/VP9 once COOP/COEP headers are configured
- [ ] Progress bar driven by ffmpeg's `progress` event instead of static status messages
- [ ] Batch conversion of multiple files
- [ ] Audio-only extraction/conversion flow (building on `buildAudioArgs.ts`)


## Acknowledgements

- [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) for making in-browser video processing possible
- [shadcn/ui](https://ui.shadcn.com/) for the component primitives