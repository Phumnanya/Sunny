import Template2 from "./template2"

export default function Capabilities() {
    return(
        <>
        <div className="flex flex-row items-center justify-between w-full box-border px-20 
        mb-16 mt-20 flex-wrap">
            <div className="w-1/3">
                <Template2 
                    image="/icons8-devices.png" alt="devices"
                    h3="Works on All Devices"
                    p="Sunny works right in your browser on any device including Mac,
                        Windows, Android, and IOS"
                />
            </div>
            <div className="w-1/3">
                <Template2 
                    image="/icons8-aspectratio.png" alt="aspect ratio"
                    h3="Aspect Ratio Presets"
                    p="Make your video square, vertical, or landshape to share on social
                        media such as Youtube, Facebook, Instagram, Twitter(X) etc"
                />
            </div>
            <div className="w-1/3">
                <Template2 
                    image="/icons8-settings-1.png" alt="settings"
                    h3="Different Settings"
                    p="Change volume of all recordings, slow down or speed up video, adjust
                        brightness of and contrast of each file...and much more"
                />
            </div>
        </div>



        <div className="flex flex-row items-center justify-between w-full box-border px-20 
        mb-16 mt-10 flex-wrap">
            <div className="w-1/3">
                <Template2 
                    image="/icons8-internet.png" alt="completely online 24/7"
                    h3="Completely Online"
                    p="Our service needs neither downloads nor installations, thus it 
                        doesn't take up space on your device."
                />
            </div>
            <div className="w-1/3">
                <Template2 
                    image="/icons8-experience-2.png" alt="no experience icon"
                    h3="No Experience Needed"
                    p="We have made the interface truly user-friendly and easy to use so 
                        you don't need any experience in editing to be able to use it!"
                />
            </div>
            <div className="w-1/3">
                <Template2 
                    image="/icons8-format.png" alt="formats icon"
                    h3="All Formats Supported"
                    p="You don't need to worry about the formats anymore as Sunny is
                        compatible with all the modern image, audio, and video formats"
                />
            </div>
        </div>
        </>
    )
} 