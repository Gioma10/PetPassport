import { motion } from "framer-motion";

export default function Passport({children, animation}) {
  
  return (
      <motion.div 
        {...animation}
        className="bg-[#FFD3B5] w-[30rem] relative pattern-pass border-x-2 border-b-2 shadow-2xl border-[#6b4f4f] rounded-xl  p-5 flex flex-col items-center gap-5"
      >
        <div className="rounded-xl pattern-pass border-x-2 border-t-2 shadow-2xl border-[#6b4f4f] bg-[#FFD3B5] absolute bottom-full w-full h-full"></div>
        <h1 className="text-2xl">Passaporto UE</h1>
        <div className="grid grid-cols-3 content-center w-full h-full gap-4">
          {children}
        </div>
      </motion.div>
  );
}
