"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Image from "next/image";

import AnimalProfile from "../../assets/animalProfile.png";
import Passport from "@/components/Passport/Passport";
import InputPass from "../../components/Passport/InputPass";
import { TiArrowBackOutline } from "react-icons/ti";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import { scaleUp, slideLeft, slideRight } from "@/animations/transition";

export default function ViewPassport() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [passports, setPassports] = useState([]); // Lista di passaporti
    const [selectedPassportIndex, setSelectedPassportIndex] = useState(0); // Passaporto attuale
    const [animationPass, setAnimationPass] = useState(null); // Passaporto attuale

    // Funzione per recuperare i passaporti dell'utente
    const fetchUserPassports = async (userId) => {
        try {
            const passportsRef = collection(db, "users", userId, "passports");
            const querySnapshot = await getDocs(passportsRef);
    
            console.log("Numero di passaporti trovati:", querySnapshot.size); // 👀 Controlla quanti passaporti sono stati recuperati
    
            if (!querySnapshot.empty) {
                const passportsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
    
                console.log("Passaporti recuperati:", passportsData); // 👀 Stampa i passaporti
    
                setPassports(passportsData);
                setSelectedPassportIndex(0); // Seleziona il primo passaporto
            } else {
                console.log("Nessun passaporto trovato.");
            }
        } catch (error) {
            console.error("Errore nel recupero dei passaporti:", error.message);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/");
            } else {
                setIsCheckingAuth(false);
                fetchUserPassports(user.uid);
            }
        });
        setAnimationPass(scaleUp(1,0))

        return () => unsubscribe();
    }, [router]);
    
    if (isCheckingAuth) {
        return null;
    }

    // Funzione per selezionare il passaporto precedente
    const handlePrevPassport = () => {
        if (selectedPassportIndex > 0) {
            setSelectedPassportIndex(selectedPassportIndex - 1);
        }
        setAnimationPass(slideLeft(1,0))
    };

    // Funzione per selezionare il passaporto successivo
    const handleNextPassport = () => {
        if (selectedPassportIndex < passports.length - 1) {
            setSelectedPassportIndex(selectedPassportIndex + 1);
        }
        setAnimationPass(slideRight(1,0))
    };
    
    const selectedPassport = passports[selectedPassportIndex];

    return (
        <div className="h-screen grid grid-cols-3">
            <div className="h-full col-start-1 flex flex-col justify-center items-center bg-[#6B4F4F] text-white gap-8">
                <div className="p-5 flex flex-col items-center justify-center">
                    <h2 className="text-4xl">I tuoi passaporti</h2>
                    <p className="text-sm">Sfoglia i vari passaporti che hai creato!</p>
                </div>
                <div className="flex gap-2">
                    <button className="border rounded-xl px-3 py-1 ">Modifica</button>
                    <button className="border rounded-xl px-3 py-1">Elimina</button>
                </div>
            </div>

            {/* Dettagli del passaporto selezionato */}
            <div className="col-start-2 col-span-2 flex justify-center items-center relative overflow-hidden">
                <div className="text-2xl absolute left-10 cursor-pointer" onClick={handlePrevPassport}>
                    {/* <TiArrowBackOutline /> */}
                    <FiArrowLeftCircle />
                </div>
                <div className="text-2xl absolute right-10 cursor-pointer" onClick={handleNextPassport}>
                    {/* <TiArrowBackOutline /> */}
                    <FiArrowRightCircle />
                </div>
                {selectedPassport ? (
                    <Passport key={selectedPassport.id} animation={animationPass}>
                        <div className="flex items-center justify-center col-start-1 cursor-pointer">
                            <Image
                                src={AnimalProfile}
                                alt="User Icon"
                                width={200}
                                height={200}
                                className="rounded-full border-2 border-black cursor-pointer"
                            />
                        </div>

                        <div className="flex flex-col gap-4 col-start-2 w-full col-span-2">
                            <div className="flex gap-4">
                                <InputPass label="Cognome" type="text" name="cognome" value={selectedPassport.cognome} readOnly />
                                <InputPass label="Nome" type="text" name="nome" value={selectedPassport.nome} readOnly />
                            </div>
                            <div className="flex gap-4">
                                <InputPass label="Nazionalità" type="text" name="nazionalita" value={selectedPassport.nazionalita} readOnly />
                                <InputPass label="Luogo di nascita" type="text" name="luogoDiNascita" value={selectedPassport.luogoDiNascita} readOnly />
                            </div>
                            <div className="flex gap-4">
                                <InputPass label="Sesso" type="text" name="sesso" value={selectedPassport.sesso} readOnly />
                                <InputPass label="Razza" type="text" name="razza" value={selectedPassport.razza} readOnly />
                            </div>
                            <InputPass label="Data di nascita" name="dataDiNascita" type="date" value={selectedPassport.dataDiNascita} readOnly />
                        </div>
                    </Passport>
                ) : (
                    <p>Seleziona un passaporto per visualizzarlo.</p>
                )}
            </div>
        </div>
    );
}
