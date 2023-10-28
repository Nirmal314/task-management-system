import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { uid } = req.body;
            console.log("Received UID:", uid);

            const notes = await getDocs(collection(db, "notes"));
            let notesArr = [];

            notes.forEach((note) => {
                notesArr.push({ ...note.data(), id: note.id });
            });
            res.status(200).json({ notesArr });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).json({ error: true, status: 500 });
        }
    } else {
        res.status(405).json({ error: true, status: 405 });
    }
};

export default handler;
