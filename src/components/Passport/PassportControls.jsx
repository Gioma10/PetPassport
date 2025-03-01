export default function PassportControls({ isEditing, handleEdit, handleSave, handleDelete }) {
    return (
        <>
            {isEditing ? (
                <button className="border rounded-xl px-3 py-1" onClick={handleSave}>
                    Salva
                </button>
            ) : (
                <div className="flex gap-2">
                    <button className="border rounded-xl px-3 py-1" onClick={handleEdit}>Modifica</button>
                    <button onClick={handleDelete} className="border rounded-xl px-3 py-1">Elimina</button>
                </div>
            )}
        </>
    );
}
