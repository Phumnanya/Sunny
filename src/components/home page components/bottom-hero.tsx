import StartBtn from "./startBtn"

export default function Bottom() {
    return(
        <section className="w-full text-center flex flex-col items-center my-20">
            <h3 className="font-extrabold my-4 text-xl">
                Ready to make your own Video
            </h3>
            <p className="md:w-80 m-auto">
                Lets do it with our online video editor
            </p>
            <div className="mt-12">
                <StartBtn name="Get Started" hover="hover:opacity-100" bgColor="bg-amber-500" text="text-white" />
            </div>
        </section>
    )
}