import Intro from "./intro"
import Subheading from "./subHeading"
import List from "./List"
import { Link } from "react-router-dom"

export default function Details() {
    return(
        <section className="w-full">
            <div className="w-full">
                <Intro name="Convert Media files Online" />
            </div>
            <div>
                <Subheading name="Save videos/audio in a format that fits" />
            </div>
            <div className="md:my-0 my-7">
                <List 
                name="Fast Conversion" p="Transform your files in seconds" />
                <List 
                name="High quality" p="Preserve detail and clarity in every conversion" />
                <List 
                name="Multi-format support" p="Convert MP4, MOV, MKV, and other formats" />         
            </div>
            <p className="text-gray-500 mt-5">
            By uploading a file you agree to our <Link to="" className="underline">
            Terms of use</Link> and acknowledge our <Link to="" className="underline"> 
            Privacy Policy</Link></p>
        </section>
    )
}