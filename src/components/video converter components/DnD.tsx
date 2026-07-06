"use client"

//import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import Warning from "./warning";
import { Music } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export default function DnD() {
    const [mediafile, setMediaFile] = useState<File | null>(null);
    const [crf, setCrf] = useState([23]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [status, setStatus] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("video");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadIsRunning, setUploadIsRunning] = useState(false);

    const ffmpegRef = useRef(new FFmpeg());

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

    //run upload and file preparation
    const startProcess = (file: File) => {
        setUploadProgress(0);
        setUploadIsRunning(true);

        let count = 0;
        const interval = setInterval(() => {
            count++;
            setUploadProgress(count);

            if (count >= 100) {
                clearInterval(interval)
                setTimeout(() => {
                    setUploadIsRunning(false);
                    setMediaFile(file);
                }, 500);
            }
        }, 30)
    }
    
    //check file type
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

    
    //Load FFmpeg library into the browser page
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
    };

    //video compressor slider value functions
    const getLabel = (value: number) => {
        if (value <= 18) return "High Quality"
        if (value <= 23) return "Balanced"
        if (value <= 28) return "Small Size"
        return <span className="text-red-500">Extreme Compression</span>
    }

    const processFile = (file: File) => {
        console.log(file.name)
        //upload logic
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
                    <p>Preparing...</p>
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
                    <form>
                        <div className="w-full mb-10">
                            <b className="mb-2">Compression strength :  </b>
                            <span>{getLabel(crf[0])} ({crf[0]})</span>
                            <Slider min={0} max={51} step={1} value={crf} onValueChange={setCrf} className="mt-3" />
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Best Quality</span>
                                <span>Smallest Size</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mb-5 justify-between flex-wrap">
                            <div>
                                <Checkbox id="aspect-ratio" name="aspect-ratio" defaultChecked className="inline-block" />
                                <b className="mx-2">Keep Aspect Ratio</b>
                            </div>
                            <div>
                                <Checkbox id="remove-audio" name="remove-audio" className="inline-block" />
                                <b className="mx-2">Remove Audio</b>
                            </div>
                            <div>
                                <label>
                                    <b className="mx-2">Trim Video : From</b>
                                    <input placeholder="00:00:00" value={startTime} className="border-solid border 
                                    border-black px-2 rounded-2xl mx-2" 
                                    onChange={(e) => setStartTime(e.target.value)} /> <b>To</b>
                                    <input placeholder="00:00:00" value={endTime} className="border-solid border 
                                    border-black px-2 rounded-2xl mx-2"
                                    onChange={(e) => setEndTime(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-row w-full flex-wrap justify-between">
                            <label>
                                <b className="mb-1 px-1 md:block">Resolution Quality</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Resolution" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1080p">1080p</SelectItem>
                                    <SelectItem value="720p">720p</SelectItem>
                                    <SelectItem value="480p">480p</SelectItem>
                                    <SelectItem value="360p">360p</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                            <label>
                                <b className="mb-1 px-1 md:block">Video Format</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MP4">MP4</SelectItem>
                                    <SelectItem value="MKV">MKV</SelectItem>
                                    <SelectItem value="MOV">MOV</SelectItem>
                                    <SelectItem value="WebM">WebM</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                            <label>
                                <b className="mb-1 px-1 md:block">Video Codec</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Codec" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="h264">H.264</SelectItem>
                                    <SelectItem value="H.265/HEVC">H.265</SelectItem>
                                    <SelectItem value="VP9">VP9</SelectItem>
                                    <SelectItem value="AV1">AV1</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                            <label>
                                <b className="mb-1 px-1 md:block">Frame Rate</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="FPS" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="60">60</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="24">24</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                        </div>
                        <button type="button" className="rounded-3xl w-fit px-7 py-2 text-white bg-blue-700
                        mt-12 mb-5">
                            Compress
                        </button>
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
                    <form>
                        <div className="flex flex-row w-full flex-wrap justify-between">
                            <label>
                                <b className="mb-1 px-1 md:block">Audio Bitrate</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="bitrate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="320kbps">320kbps</SelectItem>
                                    <SelectItem value="256kbps">256kbps</SelectItem>
                                    <SelectItem value="192kbps">192kbps</SelectItem>
                                    <SelectItem value="128kbps">128kbps</SelectItem>
                                    <SelectItem value="64kbps">64kbps</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                            <label>
                                <b className="mb-1 px-1 md:block">Audio Codec</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="codec" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MP3">MP3</SelectItem>
                                    <SelectItem value="AAC">AAC</SelectItem>
                                    <SelectItem value="Opus">Opus</SelectItem>
                                    <SelectItem value="WAV">WAV</SelectItem>
                                    <SelectItem value="FLAC">FLAC</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                            <label>
                                <b className="mb-1 px-1 md:block">Sample Rate</b>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="sample rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="48000">48000</SelectItem>
                                    <SelectItem value="44100">44100</SelectItem>
                                    <SelectItem value="22050">22050</SelectItem>
                                </SelectContent>
                            </Select>
                            </label>
                        </div>
                        <div className="mb-10 mt-3">
                            <label>
                                <b className="mx-2">Trim Audio : From</b>
                                <input placeholder="00:00:00" value={startTime} className="border-solid border 
                                border-black px-2 rounded-2xl mx-2" 
                                onChange={(e) => setStartTime(e.target.value)} /> <b>To</b>
                                <input placeholder="00:00:00" value={endTime} className="border-solid border 
                                border-black px-2 rounded-2xl mx-2"
                                onChange={(e) => setEndTime(e.target.value)} />
                            </label>
                        </div>
                        <button type="button" className="rounded-3xl w-fit px-7 py-2 text-white bg-blue-700
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

