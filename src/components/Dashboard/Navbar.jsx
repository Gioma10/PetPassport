import { useRouter } from "next/navigation"; // Importa il router per reindirizzare
import { getAuth } from "firebase/auth";

export default function Navbar() {
  const router = useRouter(); // Crea un'istanza del router

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      // Reindirizza alla pagina di login dopo il logout
      router.push("/");
    }).catch((error) => {
      // Gestisci eventuali errori durante il logout
      console.error("Errore durante il logout:", error.message);
    });
  };

  return (
    <nav className="bg-[#FFD3B5] w-full py-2 px-2 flex justify-end">
      <button
        className="px-2 py-2 border-2 border-[#efb48c] bg-[#6B4F4F] text-[#F5F5DC] rounded-xl"
        onClick={handleLogout}
      >
        Log out
      </button>
    </nav>
  );
}
