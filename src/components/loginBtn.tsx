type Props ={
    name: string;
    bgColor: string;
    text?: string;
    hover?: string;
}

export default function LoginBtn({name, bgColor, text, hover}: Props) {
    return(
        <div>
            <button type="button" className={`${bgColor} py-3 mx-2 w-24 cursor-pointer
            rounded-lg ${text} ${hover} opacity-[0.8]`}>{name}</button>
        </div>
    )
}