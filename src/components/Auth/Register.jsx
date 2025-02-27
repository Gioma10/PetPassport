

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Input from "./Input";

export default function Register({ selectIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Stato per il messaggio

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    try {
      // Crea l'utente
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Invia la mail di verifica
      await sendEmailVerification(user);
      console.log("Registrazione riuscita!");

      // Resetta i campi del form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");

      // Mostra il messaggio all'utente
      setMessage("Registrazione riuscita! Controlla la tua email per confermare il tuo account.");

    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Questa email è già registrata. Prova con un'altra.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex justify-center items-center flex-col gap-2">
        <h2 className="text-4xl">Benvenuto</h2>
        <p className="text-sm">Registriamoci insieme e realizza il tuo passaporto !!!</p>
      </div>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              <Input label="Nome utente" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex justify-center gap-2">
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input label="Conferma Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="border border-[#6B4F4F] px-2 py-1 rounded-xl" type="submit">
              Registrati
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>} {/* Mostra l'errore */}
          {message && <div className="text-green-500">{message}</div>} {/* Mostra il messaggio di successo */}
          <div className="text-sm flex gap-2">
            <p>Sei già registrato?</p>
            <button type="button" onClick={selectIsLogin} className="border-b-2 border-transparent hover:border-[#6B4F4F]">
              Accedi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
