import Logo from "./logo"
import summer from '/icons8-summer-94.png'
 
export default function Headerlogo() {
    return(
        <div className="flex flex-row items-center">
            <div className="mr-1"><Logo image={summer} /></div>
            <div><h1 className="md:text-3xl text-2xl">Sunny</h1></div> 
        </div>
    )
}