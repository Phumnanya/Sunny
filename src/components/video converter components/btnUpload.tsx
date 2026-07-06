export default function UploadBtn() {
    const processFiles = (files: File[]) => {
        console.log(files)
        //upload logic
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(Array.from(e.target.files || []));
    };

    return(
        <form>
        <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileSelect} id="myfile" name="myfile" accept="audio/video/*" />
            <button type="button" className="rounded-3xl w-fit px-7 py-2 text-white bg-blue-700">
                Choose File
            </button>
        </label>
        </form>
    )
}