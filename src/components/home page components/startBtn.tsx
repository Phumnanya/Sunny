type Props = {
    name: string;
    bgColor: string;
    text?: string;
    hover?: string;
}

export default function StartBtn({name, bgColor, text, hover}: Props) {
    return(
        <button type="button" className={`${bgColor} ${text} cursor-pointer rounded-lg
        w-56 py-5 font-bold ${hover} opacity-[0.8]`}>{name}</button>
    )
}