"use client"

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore"; // Importa solo le funzioni necessarie di Firestore
import { auth, db } from "../../lib/firebase"; // Importa da firebase.js

import Navbar from "../../components/Dashboard/Navbar";
import Paw from "../../components/Dashboard/Paw";
import AccountDisplay from "../../components/Dashboard/AcountDisplay";

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
        }, 7000); // Ritardo di 1 secondo
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
      <div className="flex justify-center items-center text-2xl h-full ">
        <p>Nessun passaporto selezionato</p>
      </div>
      {viewAccount && <AccountDisplay username={username} selectAccount={handleAccount}/>}
    </div>
  );
}
