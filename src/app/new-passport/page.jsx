"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";

import Image from "next/image";
import Passport from "../../components/Passport/Passport";
import AnimalProfile from "../../assets/animalProfile.png"; // Assicurati che l'immagine sia in "public/assets/"
import InputPass from "../../components/Passport/InputPass";
import { scaleUp } from "@/animations/transition";

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
      // console.log("Dati del passaporto prima del salvataggio:", passportData);
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
        const passportsRef = collection(userRef, "passports");
    
        // Aggiungere un passaporto alla collezione "passaporti"
        await addDoc(passportsRef, {
          ...passportData,
          createdAt: new Date(),
          userId: user.uid,
        });
        alert("Passaporto salvato con successo!");
        router.push('/dashboard')

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
    <div className="h-screen grid grid-cols-3 gap-5">
      <div className="h-full col-start-1 flex flex-col justify-center items-center bg-[#6B4F4F] text-white gap-8"> 
        <div className="p-5 flex flex-col items-center justify-center">
          <h2 className="text-4xl">Crea il tuo passaporto</h2>
          <p className="text-sm">Inserisci le caratteristiche nei vari input e crea il tuo passaporto !!!</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
              onClick={()=>router.push('/dashboard')}
              className=" rounded-xl border px-2 py-1 hover:bg-[#FFD3B5] hover:text-[#6B4F4F]">
              Indietro
          </button>
          <button 
              onClick={() => savePassportToUser(passportData)}
              className="rounded-xl border px-2 py-1 hover:bg-[#FFD3B5] hover:text-[#6B4F4F]"
              >
                  Salva
          </button>
        </div>
      </div>
      <div className="col-start-2 col-span-2 flex justify-center items-center overflow-hidden ">
          <Passport animation={scaleUp(1,0)}>
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
        </div>
    </div>
  );
}
