"use client"

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Importa le funzioni Firestore
import Navbar from "../../components/Dashboard/Navbar";
import Paw from "../../components/Dashboard/Paw";
import { auth } from "../../lib/firebase"; // Usa il file di inizializzazione

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); // Stato per lo username
  const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento
  const router = useRouter();
  const db = getFirestore(); // Inizializza Firestore

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

  if (isLoading) {
    return (
        <div className="flex justify-center items-center relative">
            <Paw />
        </div>
    ); // Mostra il caricamento finché `isLoading` è true
  }

  return (
    <div className="h-screen w-full">
      <Navbar username={username}/>
      <div className="flex justify-center items-center text-2xl h-full ">
        <p>Nessun passaporto selezionato</p>
        {/* Se lo username esiste, lo mostriamo, altrimenti mostriamo l'email */}
      </div>
    </div>
  );
}
