import TC from "./T&C-links"

export default function Footer() {
    return(
        <footer className="flex flex-row w-full items-center px-20
        bg-gray-100 py-5">
            <div className="w-1/2">
                <p>&copy; 2026 Sunny ltd.    All rights reserved</p>
            </div>
            <div className="w-1/2">
                <div className="flex flex-row justify-end">
                    <div className="w-1/5"><TC name="Terms" /></div>
                    <div className="w-1/5"><TC name="Privacy" /></div>
                    <div className="w-1/5"><TC name="Cookies" /></div>
                    <div className="w-1/5"><TC name="Refund" /></div>
                    <div className="w-1/5"><TC name="Help" /></div>
                </div>
            </div>
        </footer>
    )
}