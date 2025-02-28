import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import AnimalProfile from "../../assets/animalProfile.png"; // Assicurati che l'immagine sia in "public/assets/"
import InputPass from "./InputPass";

// Questo è il componente Passport che raccoglie i dati
export default function Passport({ onSave }) {
  const [passportData, setPassportData] = useState({
    nome: "",
    cognome: "",
    nazionalita: "",
    luogoDiNascita: "",
    sesso: "",
    razza: "",
    dataDiNascita: "",
  });

  const handleChange = (event) => {
    setPassportData({
      ...passportData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <motion.div 
      initial={{y: 100, scale: 0.9}}
      whileInView={{y: 0, scale: 1}}
      transition={{duration: 1}}
      className="bg-[#FFD3B5] w-[30rem] relative pattern-pass border-x-2 border-b-2 shadow-2xl border-[#6b4f4f] rounded-xl  p-5 flex flex-col items-center gap-5"
    >
      <div className="rounded-xl pattern-pass border-x-2 border-t-2 shadow-2xl border-[#6b4f4f] bg-[#FFD3B5] absolute bottom-full w-full h-full"></div>
      <h1 className="text-2xl">Passaporto UE</h1>
      <div className="grid grid-cols-3 content-center w-full h-full gap-4">
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
            <InputPass label='Cognome' type="text" nome='cognome' onChange={handleChange} />
            <InputPass label='Nome' type="text" nome='nome' onChange={handleChange} />
          </div>
          <div className="flex gap-4 ">
            <InputPass label='Nazionalità' type="text" nome='nazionalita' onChange={handleChange} />
            <InputPass label='Luogo di nascita' type="text" nome='luogoDiNascita' onChange={handleChange} />
          </div>
          <div className="flex gap-4">
            <InputPass label='Sesso' type="text" nome='sesso' onChange={handleChange} />
            <InputPass label='Razza' type="text" nome='razza' onChange={handleChange} />
          </div>
          <InputPass label='Data di nascita' nome='dataDiNascita' type="date" onChange={handleChange} />
        </div>
      </div>
    </motion.div>
  );
}
