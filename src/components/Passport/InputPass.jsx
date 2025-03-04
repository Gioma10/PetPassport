export default function InputPass({label, ...props}){
    return (
        <div className="flex flex-col gap-1 smallest-input text-xs">
            <label>{label}</label>
            <input {...props} className=" italic border-b border-black focus:outline-none p-1 bg-transparent" />
        </div>
    )
}