import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { uid } = req.body;
            console.log("Received UID:", uid);

            const tasks = await getDocs(collection(db, "tasks"));
            let tasksArr = [];

            tasks.forEach((task) => {
                if (uid === task.data().uid) {
                    tasksArr.push({ ...task.data(), id: task.id });
                }
            });
            res.status(200).json({ tasksArr });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).json({ error: true, status: 500 });
        }
    } else {
        res.status(405).json({ error: true, status: 405 });
    }
};

export default handler;
