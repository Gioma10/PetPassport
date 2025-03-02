"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Image from "next/image";
import { GiPassport } from "react-icons/gi";
import { TiArrowBackOutline } from "react-icons/ti";

import AnimalProfile from "../../assets/animalProfile.png";
import Passport from "@/components/Passport/Passport";
import InputPass from "@/components/Passport/InputPass";
import PassportControls from "@/components/Passport/PassportControls";
import PassportNavigation from "@/components/Passport/PassportNavigation";
import ControlBtn from "@/components/generic/RouteBtn";

import { fetchUserPassports, handleDeletePassport, handleSavePassport } from "@/utils/passportUtils";
import { scaleUp, slideLeft, slideRight } from "@/animations/transition";

export default function ViewPassport() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [passports, setPassports] = useState([]);
    const [selectedPassportIndex, setSelectedPassportIndex] = useState(0);
    const [animationPass, setAnimationPass] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPassport, setEditedPassport] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/");
            } else {
                setIsCheckingAuth(false);
                fetchUserPassports(user.uid, setPassports, setSelectedPassportIndex);
            }
        });
        setAnimationPass(scaleUp(1, 0));

        return () => unsubscribe();
    }, [router]);

    if (isCheckingAuth) return null;

    const handleEditPassport = () => {
        setIsEditing(true);
        setEditedPassport({ ...passports[selectedPassportIndex] });
    };

    const handleChange = (e) => {
        setEditedPassport({ ...editedPassport, [e.target.name]: e.target.value });
    };

    const handlePrevPassport = () => {
        if (selectedPassportIndex > 0) setSelectedPassportIndex(selectedPassportIndex - 1);
        setAnimationPass(slideRight(0.3, 0));
    };

    const handleNextPassport = () => {
        if (selectedPassportIndex < passports.length - 1) setSelectedPassportIndex(selectedPassportIndex + 1);
        setAnimationPass(slideLeft(0.3, 0));
    };


    const selectedPassport = passports[selectedPassportIndex];

    return (
        <div className="h-screen grid grid-cols-3">
            <div className="h-full col-start-1 flex flex-col justify-center items-center bg-[#6B4F4F] text-white gap-8 relative">
                <div
                    className="absolute top-0 p-2 left-0 cursor-pointer border rounded-xl m-2"
                    onClick={()=>router.push('/dashboard')}>
                        <TiArrowBackOutline size={20}/>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <h2 className="text-4xl">I tuoi passaporti</h2>
                    <p className="text-sm">Sfoglia i vari passaporti che hai creato!</p>
                </div>
               {selectedPassport && 
                    <PassportControls
                        isEditing={isEditing}
                        handleEdit={handleEditPassport}
                        handleSave={() => handleSavePassport(editedPassport, passports, setPassports, setIsEditing)}
                        handleDelete={() => handleDeletePassport(selectedPassport, passports, setPassports, setSelectedPassportIndex, selectedPassportIndex)}/>
                }
            </div>
            <div className="col-start-2 col-span-2 flex justify-center items-center relative overflow-hidden">
                {(selectedPassport && !isEditing) &&
                    <PassportNavigation handlePrev={handlePrevPassport} handleNext={handleNextPassport} />
                }
                {/* Passaporto */}
                {selectedPassport ? (
                     <Passport key={selectedPassport.id} animation={animationPass} stamp={true}>
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
                                 <InputPass 
                                     label="Cognome" 
                                     type="text"
                                     name="cognome" 
                                     value={isEditing ? editedPassport.cognome : selectedPassport.cognome}
                                     onChange={isEditing ? handleChange : undefined}
                                     readOnly={!isEditing} />
                                 <InputPass 
                                     label="Nome" 
                                     type="text" 
                                     name="nome" 
                                     value={isEditing ? editedPassport.nome : selectedPassport.nome}
                                     onChange={isEditing ? handleChange : undefined}
                                     readOnly={!isEditing} />
                             </div>
                             <div className="flex gap-4">
                                 <InputPass 
                                     label="Nazionalità" 
                                     type="text" 
                                     name="nazionalita" 
                                     value={isEditing ? editedPassport.nazionalita : selectedPassport.nazionalita}
                                     onChange={isEditing ? handleChange : undefined}
                                     readOnly={!isEditing} />
                                 <InputPass 
                                     label="Luogo di nascita" 
                                     type="text" 
                                     name="luogoDiNascita" 
                                     value={isEditing ? editedPassport.luogoDiNascita : selectedPassport.luogoDiNascita}
                                     onChange={isEditing ? handleChange : undefined}
                                     readOnly={!isEditing} />
                             </div>
                             <div className="flex gap-4">
                                 <InputPass 
                                     label="Sesso" 
                                     type="text" 
                                     name="sesso" 
                                     value={isEditing ? editedPassport.sesso : selectedPassport.sesso}
                                     onChange={isEditing ? handleChange : undefined}
                                     readOnly={!isEditing} />
                                 <InputPass 
                                     label="Razza" 
                                     type="text"
                                     name="razza" 
                                     value={isEditing ? editedPassport.razza : selectedPassport.razza}
                                     onChange={isEditing ? handleChange : undefined}
                                     readOnly={!isEditing} />
                             </div>
                             <InputPass 
                                 label="Data di nascita" 
                                 type="date" 
                                 name="dataDiNascita" 
                                 value={isEditing ? editedPassport.dataDiNascita : selectedPassport.dataDiNascita}
                                 onChange={isEditing ? handleChange : undefined}
                                 readOnly={!isEditing} />
                         </div>
                     </Passport>
                 ) : (
                     <div className="flex flex-col gap-2">
                         <p className="text-2xl">Non ci sono passaporti</p>
                         <ControlBtn name='Crea' icon={<GiPassport />} route='new-passport' />
                     </div>
                 )}
            </div>
        </div>
    );
}
