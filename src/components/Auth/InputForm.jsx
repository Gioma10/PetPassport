export default function Input({label, err, ...props}){
    return (
            <input
                className="py-1 px-2 sm:py-2 sm:px-4 rounded-lg w-36 sm:w-56 md:w-80"
                placeholder={label}
                {...props}/>
    )
}