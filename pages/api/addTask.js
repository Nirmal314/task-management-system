import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { title, description, dueDate, priority, uid } = req.body;
            const data = { title, description, due_date: dueDate, priority, uid }
            data['completed'] = false

            console.log("Received data:", data);

            const task = await addDoc(collection(db, "tasks"), data);

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