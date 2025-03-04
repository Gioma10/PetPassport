"use client"

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore"; // Importa solo le funzioni necessarie di Firestore
import { auth, db } from "../../lib/firebase"; // Importa da firebase.js

import Navbar from "../../components/Dashboard/Navbar";
import Paw from "../../components/Dashboard/Paw";
import AccountDisplay from "../../components/Dashboard/AcountDisplay";
import { PiEyesFill } from "react-icons/pi";
import { GiPassport } from "react-icons/gi";
import RouteBtn from "@/components/generic/RouteBtn";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [viewAccount, setViewAccount]= useState(false)
  const [username, setUsername] = useState(""); // Stato per lo username
  const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/"); // Reindirizza alla pagina di login se l'utente non è autenticato
      } else {
        setTimeout(async () => {
          setUser(user); // Imposta l'utente

          // Recupera lo username dal Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Imposta lo username preso dal Firestore
            setUsername(userDocSnap.data().username);
          } else {
            console.log("Nessun documento trovato per l'utente");
          }

          setIsLoading(false); // Disabilita il loading dopo il timeout
        }, 4000); // Ritardo di 1 secondo
      }
    });

    return () => unsubscribe();
  }, [router, db]);

  function handleAccount(){
    setViewAccount(prevAccount => !prevAccount)
  }



  if (isLoading) {
    return (
        <div className="flex justify-center items-center relative">
            <Paw />
        </div>
    ); // Mostra il caricamento finché `isLoading` è true
  }

  return (
    <div className="h-screen w-full relative">
      <Navbar username={username} selectAccount={handleAccount}/>
      <div className="flex flex-col justify-center gap-8 items-center h-full ">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-center text-6xl md:text-8xl">Pet Passport</h1>
          <p className="text-xs sm:text-sm md:text-base">Crea il passaporto per il tuo animale domestico !!!</p>
        </div>
        <div className="flex gap-4">
          <RouteBtn name='Crea' icon={<GiPassport />} route='new-passport' />
          <RouteBtn name='Vedi' icon={<PiEyesFill />} route='view-passport' />
        </div>
      </div>

      {/* Barra Utente  */}
      {/* {viewAccount && <AccountDisplay username={username} selectAccount={handleAccount}/>} */}
    </div>
  );
}
