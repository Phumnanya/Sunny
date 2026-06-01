import { Link } from "react-router-dom"

type Props = {
    name: string;
}

export default function TC({name}: Props) {
    return(
        <Link to="" className="hover:opacity-75 hover:text-gray-400">{name}</Link>
    )
}