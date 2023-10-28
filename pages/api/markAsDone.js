import { db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { tid, uid } = req.body;
            console.log({ tid, uid })

            // const docRef = db.collection('tasks').doc(tid);
            const docRef = doc(db, "tasks", tid)

            await setDoc(docRef, { completed: true }, { merge: true })

            res.status(200).json({ success: true });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).json({ error: true, status: 500 });
        }
    } else {
        res.status(405).json({ error: true, status: 405 });
    }
};

export default handler;