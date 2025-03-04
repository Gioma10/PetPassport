"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa il router di Next.js
import { signIn } from "../../lib/auth";
import Input from "./InputForm";

export default function Login({ selectIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Hook per navigare tra le pagine

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset dell'errore e messaggio prima di ogni login
    setError("");
    setMessage("");

    // Validazioni
    if (!email || !password) {
      setError("Per favore, inserisci email e password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Per favore, inserisci un'email valida.");
      return;
    }

    if (password.length < 6) {
      setError("La password deve essere lunga almeno 6 caratteri.");
      return;
    }

    try {
      const user = await signIn(email, password);

      if (user.error) {
        setError(user.error); // Mostra l'errore se c'è
      } else {
        setMessage("Login riuscito! Benvenuto!");
        console.log("Utente autenticato:", user);

        // Reindirizza alla pagina del dashboard
        router.push("/dashboard");
      }
    } catch (err) {
        // Gestione errori Firebase
      if (err.code === "auth/wrong-password") {
        setError("La password inserita è errata.");
      } else if (err.code === "auth/user-not-found") {
        setError("L'utente con questa email non è stato trovato.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Credenziali non valide. Verifica la tua email e password.");
      } else {
        // Messaggio generico per altri errori
        setError("Si è verificato un errore durante il login.");
      }
      console.error("Errore durante il login:", err); // Log dell'errore
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 md:gap-10">
      <div className="flex justify-center items-center flex-col gap-2">
        <h2 className="text-4xl">Bentornato</h2>
        <p className="text-xs sm:text-sm">Inserisci le credenziali per vedere il tuo passaporto !!!</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-5 md:gap-10">
          <div className="flex flex-col justify-center items-center gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button className="border border-[#6B4F4F] px-2 py-1 rounded-xl text-xs sm:text-sm md:text-base" type="submit">
              Accedi
            </button>
          </div>
          {error && <div className="text-[#ba3838]">{error}</div>}
          {message && <div className="text-[#FFD3B5]">{message}</div>}
          <div className="text-xs sm:text-sm flex gap-2">
            <p>Non hai ancora un account?</p>
            <button
              type="button"
              onClick={selectIsLogin}
              className="border-b-2 border-transparent hover:border-[#6B4F4F]"
            >
              Registrati
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}