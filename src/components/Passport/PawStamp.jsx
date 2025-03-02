import Image from "next/image"
import Paw from "../../assets/longer_paw.png"

import { motion } from "framer-motion"

export default function PawStamp(){
    return (
        <motion.div 
            initial={{y:700,}}
            animate={{y:[700, 0, 700]}}
            transition={{duration:3}}
            className="absolute z-10 bottom-0 right-20">
            <Image src={Paw} alt="PawStamp" className="-rotate-45"/>
        </motion.div>
    )
}