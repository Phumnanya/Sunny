import { TriangleAlert } from "lucide-react"

type Props = {
    warning: string;
    text: string;
}

export default function Warning({warning, text}: Props) {
    return(
        <div className={`flex items-center gap-2 rounded-md bg-yellow-50 my-4 ${text} p-3`}>
            <TriangleAlert size={18} />
            <p className={`text-sm ${text}`}>
                Files above {warning} may cause slow Compression or browser crashes</p>
        </div>
    )
}
