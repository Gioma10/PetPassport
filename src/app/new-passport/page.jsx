"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";

import Image from "next/image";
import Passport from "../../components/Dashboard/Passport";
import AnimalProfile from "../../assets/animalProfile.png"; // Assicurati che l'immagine sia in "public/assets/"
import InputPass from "../../components/Dashboard/InputPass";

export default function NewPassport() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Stato per il controllo autenticazione
  const [passportData, setPassportData] = useState({
    nome: "",
    cognome: "",
    nazionalita: "",
    luogoDiNascita: "",
    sesso: "",
    razza: "",
    dataDiNascita: "",
  });

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
  
    // Funzione per aggiungere un passaporto dentro la collezione dell'utente
    const savePassportToUser = async () => {
      const user = auth.currentUser; // Ottieni l'utente autenticato
      if (!user) {
        alert("Devi essere loggato per salvare il passaporto!");
        return;
      }
    
      console.log("Dati del passaporto prima del salvataggio:", passportData);
    
      // Verifica che nessun campo sia vuoto
      for (const key in passportData) {
        if (!passportData[key]) {
          alert(`Il campo "${key}" è vuoto. Compila tutti i campi.`);
          return;
        }
      }
    
      try {
        // Riferimento alla collezione "passaporti" dentro il documento dell'utente
        const userRef = doc(db, "users", user.uid);
        const passportsRef = collection(userRef, "passaporti");
    
        // Aggiungere un passaporto alla collezione "passaporti"
        await addDoc(passportsRef, {
          ...passportData,
          createdAt: new Date(),
          userId: user.uid,
        });
    
        alert("Passaporto salvato con successo!");
      } catch (error) {
        console.error("Errore nel salvataggio del passaporto:", error.message);
        alert("C'è stato un errore nel salvataggio del passaporto.");
      }
    };
    
  
    const handleChange = (event) => {
      setPassportData({
        ...passportData,
        [event.target.name]: event.target.value,
      });
    };
  
    // console.log(passportData);

  return (
    <div className="h-screen flex items-center justify-around gap-5 relative">
        <button
            onClick={()=>router.push('/dashboard')}
            className=" rounded-xl border border-black p-2 hover:bg-[#FFD3B5] ">
            Indietro
        </button>
        <Passport>
            {/* IMMAGINE PROFILO */}
            <div className="flex items-center justify-center col-start-1 cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload">
                <Image 
                  src={AnimalProfile} 
                  alt="User Icon" 
                  width={200}
                  height={200}
                  className="rounded-full border-2 border-black cursor-pointer"
                />
              </label>
            </div>
    
            {/* FORM */}
            <div className="flex flex-col gap-4 col-start-2 w-full col-span-2">
              <div className="flex gap-4 ">
                <InputPass label='Cognome' type="text" name='cognome' onChange={handleChange}/>
                <InputPass label='Nome' type="text" name='nome' onChange={handleChange} />
              </div>
              <div className="flex gap-4 ">
                <InputPass label='Nazionalità' type="text" name='nazionalita' onChange={handleChange} />
                <InputPass label='Luogo di nascita' type="text" name='luogoDiNascita' onChange={handleChange} />
              </div>
              <div className="flex gap-4">
                <InputPass label='Sesso' type="text" name='sesso' onChange={handleChange} />
                <InputPass label='Razza' type="text" name='razza' onChange={handleChange} />
              </div>
              <InputPass label='Data di nascita' name='dataDiNascita' type="date" onChange={handleChange} />
            </div>
        </Passport>
        <button 
            onClick={() => savePassportToUser(passportData)}
            className="rounded-xl border border-black p-2 hover:bg-[#FFD3B5] "
            >
                Salva
        </button>
    </div>
  );
}
