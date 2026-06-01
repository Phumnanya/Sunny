import StartBtn from "./startBtn"

export default function Hero() {
    return(
        <main className="mt-16 mb-9 w-full text-center flex flex-col items-center">
            <h1 className="text-center font-extrabold text-7xl m-3">
                Online Video Editor
            </h1>
            <p className="md:w-80 m-auto">
                Create your own photos, audios, and videos and edit to your taste on any device
            </p>
            <div className="mt-16">
                <StartBtn name="Get Started" hover="hover:opacity-100" bgColor="bg-amber-500" text="text-white" />
            </div>
        </main>
    )
}