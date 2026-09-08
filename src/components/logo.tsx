type Props = {
  image: string;
};

export default function Logo({image}: Props) {
    return(
        <div className="w-16 h-16">
            <img src={image} alt="logo" className="m-auto w-full object-contain" />
        </div>
    )
}