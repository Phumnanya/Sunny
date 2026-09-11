import Details from "./details"

export default function HeroContainer() {
    return(
        <main className="flex md:flex-row flex-col w-full md:items-center md:space-between md:p-16  
        mb-5">
            <div className="md:w-1/2 w-full md:px-0 px-4">
                <Details />
            </div>
            <div className="md:w-1/2 w-full h-fit">
                <img src="/infinity.png" alt="compressor" className="w-full object-cover m-auto" />
            </div>
        </main>
    )
}