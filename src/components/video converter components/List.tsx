type Props = {
    name: string;
    p: string;
}

export default function List({name, p}: Props) {
    return(
        <div className="flex flex-row items-center">
            <div>
                <img src="/icons8-tick-box-16.svg" alt="list item" className="
                object-contain w-8 h-8" />
            </div>
            <div className="my-3">
                <b className="inline">{name} :</b> <p className="inline">{p}</p>
            </div>
        </div>
    )
}