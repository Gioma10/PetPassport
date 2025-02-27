"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Dashboard/Navbar";
import { auth } from "../../lib/firebase"; // Usa il file di inizializzazione

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setTimeout(() => {
          setUser(user);
        }, 1000); // Ritardo di 1 secondo
      }
    });
  
    return () => unsubscribe();
  }, [router]);
  

  if (!user) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="flex justify-center items-center text-2xl h-full ">
        <h1>Benvenuto nel tuo dashboard, {user.email}!</h1>
      </div>
    </div>
  );
}
