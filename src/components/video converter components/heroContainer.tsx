import Details from "./details"
import Upload from "./upload"

export default function HeroContainer() {
    return(
        <main className="flex flex-row w-full items-center space-between p-16 
        my-16">
            <div className="w-1/2">
                <Details />
            </div>
            <div className="w-1/2">
                <Upload />
            </div>
        </main>
    )
}