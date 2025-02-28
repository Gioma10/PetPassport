"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Image from "next/image";
import Icon from '../../assets/userIcon.webp'
import { ImCancelCircle } from "react-icons/im";
import { useRouter } from "next/navigation";

export default function AccountDisplay({ username, selectAccount }) {
  const [viewPassport, setViewPassport] = useState(false);
  const [showAccount, setShowAccount] = useState(true); // Stato per gestire la visibilità del componente
  const router= useRouter()

  function handleViewPassport() {
    setViewPassport((prevViewPassport) => !prevViewPassport);
  }

  function handleCloseAccount() {
    setShowAccount(false); // Nascondi il componente quando clicchi su X
    setTimeout(() => selectAccount(), 500); // Puoi chiamare selectAccount dopo un breve ritardo per sincronizzare con l'animazione
  }

  function handleNewPassport(){
    router.push('/new-passport')
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
            <div className="flex flex-col items-center gap-2">
              <Image src={Icon} alt="User Icon" className="w-32" />
              <p>Ciao, {username}</p>
            </div>
            <div className="border-t border-white py-5 flex flex-col items-center gap-2">
              <h3 className="text-4xl">Passaporti</h3>
              <div className="flex gap-2">
                <button
                  className="py-1 px-3 border rounded-xl"
                  onClick={handleViewPassport}
                >
                  {!viewPassport ? "Visualizza" : "Nasondi"}
                </button>
                <button 
                  className="py-1 px-3 border rounded-xl"
                  onClick={handleNewPassport}>+</button>
              </div>
            </div>
            {viewPassport && (
              <div>
                <ul className="flex flex-col gap-2 p-3">
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
