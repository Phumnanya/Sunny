"use client"

import { Controller } from "react-hook-form"
import type { Control, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AudioOptions } from '@/types/compression';

type Props = {
  control: Control<AudioOptions>
  register: UseFormRegister<AudioOptions>
  watch: UseFormWatch<AudioOptions>
}

export default function AudioSettings({ control, register}: Props) {
    return(
        <>
            <div className="flex flex-row w-full flex-wrap justify-between">
                <label>
                    <b className="mb-1 px-1 md:block">Audio Bitrate</b>
                    <Controller control={control} name="bitrate" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="bitrate" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Same as Original</SelectItem>
                                <SelectItem value="64k">64kbps</SelectItem>
                                <SelectItem value="96k">96kbps</SelectItem>
                                <SelectItem value="128k">128kbps</SelectItem>
                                <SelectItem value="192k">192kbps</SelectItem>
                                <SelectItem value="256k">256kbps</SelectItem>
                                <SelectItem value="320k">320kbps</SelectItem> 
                            </SelectContent>
                        </Select>
                    )} />
                </label>
                <label>
                    <b className="mb-1 px-1 md:block">Audio Codec</b>
                    <Controller control={control} name="audioCodec" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="codec" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Same as Original</SelectItem>
                                <SelectItem value="libmp3lame">MP3</SelectItem>
                                <SelectItem value="aac">AAC</SelectItem>
                                <SelectItem value="libopus">Opus</SelectItem>
                                <SelectItem value="pcm_s16le">WAV</SelectItem>
                                <SelectItem value="flac">FLAC</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </label>
                <label>
                    <b className="mb-1 px-1 md:block">Sample Rate</b>
                    <Controller control={control} name="sampleRate" render={({field}) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger><SelectValue placeholder="sample rate" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Same as Original</SelectItem>
                                <SelectItem value="22050">22050</SelectItem>
                                <SelectItem value="32000">32000</SelectItem>
                                <SelectItem value="44100">44100</SelectItem>
                                <SelectItem value="48000">48000</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                </label>
            </div>
            <div className="mb-10 mt-3">
                <label>
                    <b className="mx-2">Trim Audio : From</b>
                    <input placeholder="00:00:00" {...register("startTime")} className="border-solid border 
                    border-black px-2 rounded-2xl mx-2" />
                     <b>To</b>
                    <input placeholder="00:00:00" {...register("endTime")} className="border-solid border 
                    border-black px-2 rounded-2xl mx-2" />
                </label>
            </div>
        </>
    )
}