"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RouteBtn({name, icon, route}){
    const router = useRouter()
    return (
        <motion.div 
            initial={{y:0}}
            whileHover={{y:2}}
            tranistion={{duration:1}}
            onClick={()=> router.push(`/${route}`)}
            className="cursor-pointer flex gap-2 justify-center items-center bg-[#FFD3B5] text-sm px-3 py-1 md:text-base md:px-5 md:py-2 rounded-xl shadow-xl">
                <p>{name}</p>
                {icon}
        </motion.div>
    )
}