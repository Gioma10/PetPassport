"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Image from "next/image";
import Icon from '../../assets/userIcon.webp'
import { ImCancelCircle } from "react-icons/im";


export default function AccountDisplay({ username, selectAccount }) {
  const [showAccount, setShowAccount] = useState(true); // Stato per gestire la visibilità del componente

  function handleCloseAccount() {
    setShowAccount(false); // Nascondi il componente quando clicchi su X
    setTimeout(() => selectAccount(), 500); // Puoi chiamare selectAccount dopo un breve ritardo per sincronizzare con l'animazione
  }

  return (
    <AnimatePresence mode="wait">
      {showAccount && (
        <motion.div
          initial={{ x: -420 }}
          animate={{ x: 0 }}
          exit={{ x: -420 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 h-full w-1/5 bg-[#6B4F4F] text-white shadow-xl"
        >
          <div className="flex flex-col p-10 h-full gap-5">
            <div
              className="absolute top-0 p-2 right-0 cursor-pointer"
              onClick={handleCloseAccount} // Usa la funzione per chiudere e rimuovere il componente
            >
              <ImCancelCircle />
            </div>
            <div className="flex flex-col items-center gap-2 pb-2 border-b">
              <Image src={Icon} alt="User Icon" className="w-32" />
              <p>Ciao, {username}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
