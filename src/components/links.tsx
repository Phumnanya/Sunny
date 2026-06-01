import { Link } from "react-router-dom";

type Props = {
  link: string;
};

export default function Links({link}: Props)  {
    return(
        <nav className="px-2 py-3 hover:bg-gray-200 hover:rounded-sm">
            <Link to="" className="cursor-pointer">{link}</Link>
        </nav>
    )
}