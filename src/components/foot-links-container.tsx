import Links from "./links"

export default function LinksContainer() {
    return(
        <nav className="flex flex-row items-center center bg-gray-100 
        w-full h-fit md:p-20 box-border border-b border-solid border-gray-300">
            <div className="w-1/5">
                <div className="w-full flex flex-col space-between">
                    <Links link="Video Editor" />
                    <Links link="Meme Maker" />
                    <Links link="Split video" />
                    <Links link="Slideshow maker" />
                    <Links link="Filter video" />
                    <Links link="Presentation recorder" />
                </div>
            </div>

            <div className="w-1/5">
                <div className="w-full flex flex-col space-between">
                    <Links link="Add Subtitles" />
                    <Links link="Crop Video" />
                    <Links link="GIF maker" />
                    <Links link="Flip Video" />
                    <Links link="Adjust video" />
                    <Links link="Camera Recorder" />
                </div>
            </div>

            <div className="w-1/5">
                <div className="w-full flex flex-col space-between">
                    <Links link="Compress Video" />
                    <Links link="Merge Video" />
                    <Links link="Rotate Video" />
                    <Links link="Reverse Video" />
                    <Links link="GIF Editor" />
                    <Links link="Auto subtitle generator" />
                </div>
            </div>

            <div className="w-1/5">
                <div className="w-full flex flex-col space-between">
                    <Links link="Resize video" />
                    <Links link="Speed Video" />
                    <Links link="Add music to video" />
                    <Links link="Mute Video" />
                    <Links link="Audio recorder" />
                    <Links link="DPI converter" />
                </div>
            </div>

            <div className="w-1/5">
                <div className="w-full flex flex-col space-between">
                    <Links link="Cut video" />
                    <Links link="Video maker" />
                    <Links link="Loop video" />
                    <Links link="Stop motion" />
                    <Links link="Screen recorder" />
                    <Links link="Cut audio" />
                </div>
            </div>
        </nav>
    )
}