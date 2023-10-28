import { db } from "@/app/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

const handler = async (req, res) => {
    if (req.method === "DELETE") {
        try {
            const { tid, uid } = req.body;
            console.log({ tid, uid })

            await deleteDoc(doc(db, "tasks", tid))

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