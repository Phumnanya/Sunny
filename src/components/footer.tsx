import TC from "./T&C-links"

export default function Footer() {
    return(
        <footer className="flex md:flex-row flex-col w-full items-center md:px-20 px-3
        bg-gray-100 py-5">
            <div className="md:w-1/2 w-full text-center">
                <p>&copy; 2026 Sunny ltd.  All rights reserved</p>
            </div>
            <div className="md:w-1/2 w-full">
                <div className="flex flex-row md:justify-end justify-between items-center w-full">
                    <div className="md:w-1/5 w-1/6"><TC name="Terms" /></div>
                    <div className="md:w-1/5 w-1/6"><TC name="Privacy" /></div>
                    <div className="md:w-1/5 w-1/6"><TC name="Cookies" /></div>
                    <div className="md:w-1/5 w-1/6"><TC name="Refund" /></div>
                    <div className="md:w-1/5 w-1/6"><TC name="Help" /></div>
                </div>
            </div>
        </footer>
    )
}