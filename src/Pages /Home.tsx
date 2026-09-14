import Navbar from "../components/navbar"
import HeroContainer from "../components/video converter components/heroContainer"
import DnD from "@/components/video converter components/DnD"
import Footer from "../components/footer"

export default function Home() {
    return(
        <>
            <Navbar />
            <HeroContainer />
            <section className="md:w-4/5 w-full md:px-0 px-2 m-auto mb-10">
                <DnD />
            </section>
            <Footer />
        </>
    )
}