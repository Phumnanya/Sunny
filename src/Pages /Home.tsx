import Navbar from "../components/home page components/navbar"
import Hero from "../components/home page components/hero"
import Features from "../components/home page components/features"
import Capabilities from "../components/home page components/capabilities"
import Bottom from "../components/home page components/bottom-hero"
import LinksContainer from "../components/foot-links-container"
import Footer from "../components/footer"

export default function Home() {
    return(
        <>
            <Navbar />
            <Hero />
            <Features />
            <Capabilities />
            <Bottom />
            <LinksContainer />
            <Footer />
        </>
    )
}