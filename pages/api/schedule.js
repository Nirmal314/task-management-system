// import schedule from 'node-schedule';
import cron from "node-cron"
import admin from "firebase-admin"
import sendEmail from '@/app/mail';

const serviceAccount = require('task-management-20cce-firebase-adminsdk-b8chw-8a9f2d46cf.json');
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default async function handler(req, res) {
    // ! Run everyday at midnight
    cron.schedule('0 0 * * *', async () => {
        try {

            // ? fetch tasks which has deadline of exactly 1 day
            const tasks = await fetch("http://localhost:3000/api/deadlineTasks")
            const { filteredTasks } = await tasks.json()

            // ? loop through each task
            filteredTasks.forEach(async (task) => {

                // ! get user's email id from user id (present in 'task' object)
                const userRecord = await admin.auth().getUser(task.uid);
                const userEmail = userRecord.email;

                // ? send email
                await sendEmail(userEmail, "Urgent: Task Deadline Approaching - Take Action!", `Dear user,
        
                I hope this email finds you well. We wanted to remind you that you have a pending task with a deadline of just 1 day remaining. Your attention to completing this task is crucial to ensure its timely delivery.
                
                Task Details:
                
                    Task: ${task.title}
                    Deadline: ${task.due_date}
                    Description: ${task.description}
                    Priority: ${task.priority}
                
                Please make sure to allocate the necessary time and resources to complete this task before the deadline.
                
                Best regards,
                Taskify
                `)

            })
            res.status(200).send({ message: "Executed 1 day deadline api" });
        } catch (error) {
            console.error('Error sending emails:', error);
            res.status(500).send('Internal Server Error');
        }
    });
}
