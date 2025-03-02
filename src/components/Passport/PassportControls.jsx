import { hoverControlsBtn } from "@/animations/transition";
import { motion } from "framer-motion"

export default function PassportControls({ isEditing, handleEdit, handleSave, handleDelete }) {
    return (
        <>
            {isEditing ? (
                <motion.button 
                    {...hoverControlsBtn(0.2,0)}
                    className="border rounded-xl px-3 py-1 shadow-xl" onClick={handleSave}>
                    Salva
                </motion.button>
            ) : (
                <div className="flex gap-2">
                    <motion.button 
                        {...hoverControlsBtn(0.2,0)}
                        className="border rounded-xl px-3 py-1 shadow-xl" 
                        onClick={handleEdit}>
                            Modifica
                    </motion.button>
                    <motion.button 
                        {...hoverControlsBtn(0.2,0)}
                        onClick={handleDelete} 
                        className="border rounded-xl px-3 py-1 shadow-xl">
                            Elimina
                    </motion.button>
                </div>
            )}
        </>
    );
}

export const Btn= ({name, ...props})=>{
    return (

    <motion.button 
        {...hoverControlsBtn(0.2,0)}
        className="border rounded-xl px-3 py-1 shadow-xl"
        {...props}>
            {name}
    </motion.button>
    )
}
