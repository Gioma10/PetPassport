"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, addDoc, doc } from "firebase/firestore";

import { Btn } from "@/components/Passport/PassportControls";
import Image from "next/image";
import Passport from "../../components/Passport/Passport";
import AnimalProfile from "../../assets/animalProfile.png"; // Assicurati che l'immagine sia in "public/assets/"
import InputPass from "../../components/Passport/InputPass";
import { scaleUp, passportStamp } from "@/animations/transition";
import PawStamp from "@/components/Passport/PawStamp";
import { TiArrowBackOutline } from "react-icons/ti";

export default function NewPassport() {
  const router = useRouter();
  const [isStamp, setIsStamp]= useState(false)
  const [pawAnimation, setPawAnimation]= useState(false)
  const [error, setError]= useState('')
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
    setIsStamp(false);
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
    
    const savePassportWithAnimation = () => {
      // Verifica che nessun campo sia vuoto
      for (const key in passportData) {
        if (!passportData[key]) {
          alert(`Il campo "${key}" è vuoto. Compila tutti i campi.`);
          return;
        }
      }
      setPawAnimation(true); // Attiva l'animazione

      setTimeout(() => {
        setIsStamp(true)
      }, 1500); // Cambia il tempo in base alla durata dell'animazione
      setTimeout(() => {
        savePassportToUser(); // Salva nel database dopo l'animazione
        setPawAnimation(false); // Reset dell'animazione se serve
      }, 3000); // Cambia il tempo in base alla durata dell'animazione
    };
  
    const handleChange = (event) => {
      setPassportData({
        ...passportData,
        [event.target.name]: event.target.value,
      });
    };
  
    // console.log(passportData);

  return (
    <div className="h-screen grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-5">
      <div className="h-full row-start-3 md:row-start-1 md:col-start-1 flex flex-col justify-center items-center bg-[#6B4F4F] text-white gap-8 relative"> 
        <div
            className="absolute top-0 p-2 left-0 cursor-pointer border rounded-xl m-2"
            onClick={()=>router.push('/dashboard')}>
                <TiArrowBackOutline size={20}/>
        </div>
        <div className="p-5 flex flex-col items-center justify-center">
          <h2 className="text-4xl">Crea il tuo passaporto</h2>
          <p className="text-xs md:text-sm">Inserisci le caratteristiche nei vari input e crea il tuo passaporto !!!</p>
        </div>
          <Btn onClick={savePassportWithAnimation} name='Salva'/>
      </div>
      <div className="row-start-1 row-span-2 md:row-span-1 md:col-start-2 md:col-span-2 flex justify-center items-center overflow-hidden relative">
          {pawAnimation && <PawStamp />}
          <Passport animation={!pawAnimation ? scaleUp(1,0) : passportStamp(1,0)} stamp={isStamp}>
              {/* IMMAGINE PROFILO */}
              <div className="flex w-full items-center justify-center col-start-1 cursor-pointer">
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
                    className="rounded-full border-2 w-full border-black cursor-pointer"
                  />
                </label>
              </div>
      
              {/* FORM */}
              <div className="flex flex-col gap-2 sm:gap-4 sm:col-start-2 w-full  sm:col-span-2">
                <div className="flex gap-2 sm:gap-4 ">
                  <InputPass label='Cognome' type="text" name='cognome' onChange={handleChange}/>
                  <InputPass label='Nome' type="text" name='nome' onChange={handleChange} />
                </div>
                <div className="flex gap-2 sm:gap-4 ">
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
