import Navbar from "../components/navbar"
import HeroContainer from "../components/video converter components/heroContainer"
import Converter from "../components/video converter components/converter"
import LinksContainer from "../components/foot-links-container"
import Footer from "../components/footer"
import WasmTest from "@/Test"

export default function Home() {
    return(
        <>
            <Navbar />
            <HeroContainer />
            <Converter />
            <WasmTest />
            <LinksContainer />
            <Footer />
        </>
    )
}