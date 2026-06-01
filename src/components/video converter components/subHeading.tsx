type Props = {
    name: string;
}

export default function Subheading({name}: Props) {
    return(
        <h3 className="text-2xl mb-7">{name}</h3>
    )
}