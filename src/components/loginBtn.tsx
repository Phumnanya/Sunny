type Props ={
    name: string;
    bgColor: string;
    text?: string;
    hover?: string;
}

export default function LoginBtn({name, bgColor, text, hover}: Props) {
    return(
        <div>
            <button type="button" className={`${bgColor} md:py-3 py-2 px-2 md:px-0 mx-2 md:w-24 w-18 box-border cursor-pointer
            rounded-lg ${text} ${hover} opacity-[0.8]`}>{name}</button>
        </div>
    )
}