type Props = {
  image: string;
};

export default function Logo({image}: Props) {
    return(
        <div className="md:w-16 md:h-16 w-10 h-10">
            <img src={image} alt="logo" className="m-auto w-full object-contain" />
        </div>
    )
}