type Props = {
    name: string;
}

export default function Headers({name}: Props) {
    return(
        <header className="mb-3">
            <h1 className="md:text-5xl md:font-extrabold">{name}</h1>
        </header>
    )
}