import { db } from "@/app/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function dateToString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function calculateDateDifference(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const timeDifference = endDate - startDate;

    // ! Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysDifference);
}

const handler = async (req, res) => {
    const today = dateToString(new Date())
    // ! yyyy-mm-dd

    if (req.method === "GET") {
        try {
            const tasks = await getDocs(collection(db, "tasks"));
            const filteredTasks = [];
            tasks.forEach((task) => {
                if (calculateDateDifference(today, task.data().due_date) == 1 && task.data().completed == false) {
                    filteredTasks.push(task.data())
                }
            })
            res.status(200).json({ filteredTasks });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).json({ error: true, status: 500 });
        }
    } else {
        res.status(405).json({ error: true, status: 405 });
    }
};

export default handler;
