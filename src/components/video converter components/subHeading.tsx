type Props = {
    name: string;
}

export default function Subheading({name}: Props) {
    return(
        <h3 className="md:text-2xl md:mb-7">{name}</h3>
    )
}