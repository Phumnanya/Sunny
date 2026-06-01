type Props = {
    h3: string;
    p: string;
    image: string;
    alt: string;
}

export default function Template({h3, p, image, alt}: Props) {
    return(
        <article className="flex flex-row w-full justify-between">
            <div className="px-20 py-10 w-2/5">
                <h3 className="font-extrabold my-4 text-3xl">{h3}</h3>
                <p>{p}</p>
            </div>
            <div className="w-2/5 h-2/5 px-20 py-10">
                <img src={image} alt={alt} className="m-auto w-full h-full 
                object-contain rounded-2xl" />
            </div>
        </article>
    )
}