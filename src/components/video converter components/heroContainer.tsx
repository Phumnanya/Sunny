import Details from "./details"

export default function HeroContainer() {
    return(
        <main className="flex flex-row w-full items-center space-between p-16 
        mb-5">
            <div className="w-1/2">
                <Details />
            </div>
            <div className="w-1/2 h-fit">
                <img src="/infinity.png" alt="compressor" className="w-full object-cover m-auto" />
            </div>
        </main>
    )
}