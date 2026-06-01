import Video from "./article1"
import Audio from "./article2"
import Photos from "./article3"

export default function Features() {
    return(
        <section className="flex flex-col items-center w-full box-border p-5">
            <Video />
            <Audio />
            <Photos />
        </section>
    )
}