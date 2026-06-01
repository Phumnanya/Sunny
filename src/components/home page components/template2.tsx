type Props = {
    image: string;
    alt: string;
    h3: string;
    p: string;
}

export default function Template2({h3, p, image, alt}: Props) {
    return(
        <article className="flex flex-col py-8 h-76
        px-12 w-92 bg-gray-100 rounded-2xl">
            <div>
                <img src={image} alt={alt} className="w-1/4 h-full mb-0 object-cover" />
            </div>
            <div className="mb-3">
                <h3 className="font-extrabold text-lg">{h3}</h3>
            </div>
            <div>
                <p>{p}</p>
            </div>
        </article>
    )
}