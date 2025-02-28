"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth, } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


import Passport from "../../components/Dashboard/Passport";

export default function NewPassport() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Stato per il controllo autenticazione

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // Reindirizza subito se non autenticato
      } else {
        setIsCheckingAuth(false); // L'utente è autenticato, mostra il contenuto
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isCheckingAuth) {
    return null; // Non mostra nulla finché l'autenticazione non è verificata
  }

  return (
    <div className="h-screen flex items-center justify-around gap-5 relative">
        <button
            className=" rounded-xl border border-black p-2 hover:bg-[#FFD3B5] ">
            Indietro
        </button>
        <Passport />
        <button 
            className="rounded-xl border border-black p-2 hover:bg-[#FFD3B5] "
            >
                Salva
        </button>
    </div>
  );
}
