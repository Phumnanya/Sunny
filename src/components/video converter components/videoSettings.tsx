"use client"
import { videoFormats } from "@/lib/videoFornat";
import { Controller } from "react-hook-form"
import type { Control, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { VideoOptions } from '@/types/compression';
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"


type Props = {
  control: Control<VideoOptions>
  register: UseFormRegister<VideoOptions>
  watch: UseFormWatch<VideoOptions>
}

export default function VideoSettings({ control, register, watch}: Props) {

    //dropdown codecs to tally with available format selection
    const selectedFormat = watch("format")
    const availableCodecs = videoFormats[selectedFormat as keyof typeof videoFormats]?.codecs ?? []

    return(
        <>
        {/* CRF Slider*/}
            <div className="w-full mb-10">
                <Controller control={control} name="crf" render={({ field }) => (
                <>
                <b className="mb-2">Compression strength :  </b>
                <span>{watch("crf")}</span>
                <Slider min={0} max={51} step={1} value={[field.value]} 
                onValueChange={(value) => field.onChange(value[0])} className="mt-3" />
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Best Quality</span>
                    <span>Smallest Size</span>
                </div>
                </>
                )} />
            </div>
            <div className="flex flex-row items-center mb-5 justify-between flex-wrap">
                <Controller control={control} name="ratio" render={({ field }) => (
                    <div>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="inline-block" />
                    <b className="mx-2">Keep Aspect Ratio</b>
                    </div>
                    )}
                />
                <Controller control={control} name="removeAudio" render={({ field }) => (
                    <div>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="inline-block" />
                    <b className="mx-2">Remove Audio</b>
                    </div>
                    )}
                />
                <div>
                    <label>
                        <b className="mx-2">Trim Video : From</b>
                        <input placeholder="00:00:00" {...register("startTime")} className="border-solid border 
                        border-black px-2 rounded-2xl mx-2" 
                        //onChange={(e) => setStartTime(e.target.value)} 
                        /> <b>To</b>
                        <input placeholder="00:00:00" {...register("endTime")} className="border-solid border 
                        border-black px-2 rounded-2xl mx-2"
                        //onChange={(e) => setEndTime(e.target.value)} 
                        />
                    </label>
                </div>
            </div>
            <div className="flex flex-row w-full flex-wrap justify-between">
                <label>
                    <b className="mb-1 px-1 md:block">Resolution Quality</b>
                    <Controller control={control} name="quality" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Quality" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">same as original</SelectItem>
                                <SelectItem value="1080p">1080p</SelectItem>
                                <SelectItem value="720p">720p</SelectItem>
                                <SelectItem value="480p">480p</SelectItem>
                                <SelectItem value="360p">360p</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </label>
                <label>
                    <b className="mb-1 px-1 md:block">Output Format</b>
                    <Controller control={control} name="format" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="Output Format" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Same as Original</SelectItem>
                                <SelectItem value="MP4">MP4</SelectItem>
                                <SelectItem value="MKV">MKV</SelectItem>
                                <SelectItem value="MOV">MOV</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </label>
                <label>
                    <b className="mb-1 px-1 md:block">Video Codec</b>
                    <Controller control={control} name="codec" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="Codec" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="auto">Auto (recommended)</SelectItem>
                                {availableCodecs.map((codec) => (
                                    <SelectItem
                                        key={codec.value}
                                        value={codec.value}
                                    >
                                        {codec.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )} />
                </label>
                <label>
                    <b className="mb-1 px-1 md:block">Frame Rate</b>
                    <Controller control={control} name="fps" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="FPS" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">same as original</SelectItem>
                                <SelectItem value="60">60</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="24">24</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </label>
            </div>
        </>
    )
}


//video compressor slider value functions
/*    const getLabel = (value: number) => {
        if (value <= 18) return "High Quality"
        if (value <= 23) return "Balanced"
        if (value <= 28) return "Small Size"
        return <span className="text-red-500">Extreme Compression</span>
    }
     <SelectItem value="">none</SelectItem>
    <SelectItem value="libx264">H.264</SelectItem>
    <SelectItem value="libx265">H.265</SelectItem>
    <SelectItem value="libvpx-vp9">VP9</SelectItem>
    <SelectItem value="libaom-av1">AV1</SelectItem>   
    */
//<span>{getLabel(crf[0])} ({crf[0]})</span>