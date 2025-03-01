import { collection, deleteDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

// 🔹 Recupera i passaporti dell'utente
export const fetchUserPassports = async (userId, setPassports, setSelectedPassportIndex) => {
    try {
        const passportsRef = collection(db, "users", userId, "passports");
        const querySnapshot = await getDocs(passportsRef);

        if (!querySnapshot.empty) {
            const passportsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPassports(passportsData);
            setSelectedPassportIndex(0);
        } else {
            console.log("Nessun passaporto trovato.");
        }
    } catch (error) {
        console.error("Errore nel recupero dei passaporti:", error.message);
    }
};

// 🔹 Elimina un passaporto
export const handleDeletePassport = async (selectedPassport, passports, setPassports, setSelectedPassportIndex, selectedPassportIndex) => {
    try {
        const passportRef = doc(db, "users", auth.currentUser.uid, "passports", selectedPassport.id);
        await deleteDoc(passportRef);

        const updatedPassports = passports.filter(passport => passport.id !== selectedPassport.id);
        setPassports(updatedPassports);

        if (updatedPassports.length > 0) {
            setSelectedPassportIndex(Math.max(0, selectedPassportIndex - 1));
        }

        alert("Passaporto eliminato con successo!");
    } catch (error) {
        console.error("Errore nell'eliminazione del passaporto:", error.message);
    }
};

// 🔹 Aggiorna un passaporto
export const handleSavePassport = async (editedPassport, passports, setPassports, setIsEditing) => {
    try {
        const passportRef = doc(db, "users", auth.currentUser.uid, "passports", editedPassport.id);
        await updateDoc(passportRef, editedPassport);

        const updatedPassports = passports.map((passport) =>
            passport.id === editedPassport.id ? editedPassport : passport
        );

        setPassports(updatedPassports);
        setIsEditing(false);
        alert("Passaporto aggiornato con successo!");
    } catch (error) {
        console.error("Errore nell'aggiornamento del passaporto:", error.message);
    }
};
