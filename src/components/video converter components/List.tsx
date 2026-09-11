type Props = {
    name: string;
    p: string;
}

export default function List({name, p}: Props) {
    return(
        <div className="flex flex-row md:items-center">
            <div>
                <img src="/icons8-tick-box-16.svg" alt="list item" className="
                object-contain md:w-8 md:h-8 w-4 h-4" />
            </div>
            <div className="md:my-3">
                <b className="inline">{name} :</b> <p className="inline">{p}</p>
            </div>
        </div>
    )
}