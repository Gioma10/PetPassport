import { useRouter } from "next/navigation"; // Importa il router per reindirizzare
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

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
      <motion.button
        initial={{y:-5}}
        whileHover={{y:0}}
        transition={{duration: 0.5, ease: 'easeOut'}}
        className="px-3 py-1 border-2 border-[#6B4F4F] bg-[#e8e8d5] text-[#6B4F4F] rounded-xl shadow-xl"
        onClick={handleLogout}>
        Log out
      </motion.button>
    </nav>
  );
}
