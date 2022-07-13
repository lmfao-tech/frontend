import { useDropzone } from "react-dropzone";

export default function Dropzone({ onFileDrop, maxFiles }: {
    onFileDrop?: (files: File[]) => void;
    maxFiles: number;
}) {

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ onDrop: onFileDrop, accept: { 'image/*': [] }, maxFiles: maxFiles });

    function onDrag() {
        if (isDragAccept) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 stroke-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            )
        }

        if (isDragReject) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="hotpink">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            )
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    }

    return (
        <div
            {...getRootProps({ className: "dropzone" })}
            className={`
                border-2 border-dashed rounded
                cursor-pointer 
                flex justify-center items-center flex-row gap-2 
                p-28 mt-2
                transition-[background-color]
                border-gray-500
                ${isDragReject ? `bg-[rgba(224,49,49,0.35)]` : isDragAccept ? `bg-[rgba(25,113,194,0.35)]` : 'bg-transparent'}
                dark:hover:bg-slate-800 hover:bg-slate-200
            `}
        >
            <input {...getInputProps()} />

            {onDrag()}

            <div >
                <h1 className="text-xl">Drag images here or click to select files</h1>
                <h1 className="text-sm mt-2">Attach as many files as you like, each file should not exceed 5mb</h1>
            </div>
        </div>
    )
}