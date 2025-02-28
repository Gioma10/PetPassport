import { useRouter } from "next/navigation"; // Importa il router per reindirizzare
import { getAuth } from "firebase/auth";

import Image from "next/image";
import Icon from '../../assets/userIcon.webp'

export default function Navbar({username, selectAccount}) {
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
    <nav className="bg-[#FFD3B5] fixed w-full py-2 px-2 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={Icon} alt='User Icon' className="w-20 cursor-pointer" onClick={selectAccount} />
        <p>Ciao, {username}</p>
      </div>
      <button
        className="px-2 py-2 border-2 border-black bg-white text-black rounded-xl"
        onClick={handleLogout}
      >
        Log out
      </button>
    </nav>
  );
}
