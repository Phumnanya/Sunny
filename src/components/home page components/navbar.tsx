import Headerlogo from "./header";
import LoginBtn from "./loginBtn";

function Navbar() {
    return(
        <nav className="flex flex-row justify-between items-center p-3 w-full 
        border-b border-solid border-gray-300 sticky top-0 bg-white z-10">
            <div>
                <Headerlogo />
            </div>
            <div className="flex flex-row items center justify-end w-1/5">
                <LoginBtn bgColor="bg-gray-100" hover="hover:opacity-100" name="Log in" />
                <LoginBtn bgColor="bg-amber-500" hover="hover:opacity-100" name="Sign up" text="text-white" />
            </div>
        </nav>
    )
}

export default Navbar;