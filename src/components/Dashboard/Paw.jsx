import { motion } from "framer-motion";
import { IoPawOutline } from "react-icons/io5";

const pawVariants = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom % 2 === 0 ? 0 : -20,
  }),

  // Animazione di uscita e ritorno ciclico
  
};

export default function Paw() {

  const arr = [1, 2, 3, 4, 5];

  return (      
      <motion.div
        initial="hidden"
        className="flex gap-2"
      >
        {arr.map((item, index) => (
          <motion.div
            key={index}
            variants={pawVariants}
            custom={index}
            className="text-2xl rotate-90"
            animate={{
              opacity: [0, 1, 0], // Fai scomparire e riapparire
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop", // Loop ciclico per ripetere l'animazione
              delay: index * 0.5, // Ritardo per un effetto in sequenza
            }}
          >
            <IoPawOutline />
          </motion.div>
        ))}
      </motion.div>
  );
}
