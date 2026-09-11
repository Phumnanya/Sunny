type Props = {
    name: string;
}

export default function Intro({name}: Props) {
    return(
        <header className="md:mb-3 md:mt-0 mt-10 w-full">
            <h1 className="md:text-5xl text-2xl font-extrabold md:font-extrabold">{name}</h1>
        </header>
    )
}