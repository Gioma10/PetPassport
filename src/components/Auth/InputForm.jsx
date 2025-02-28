export default function Input({label, err, ...props}){
    return (
            <input
                className="py-2 px-4 rounded-lg w-80"
                placeholder={label}
                {...props}/>
    )
}