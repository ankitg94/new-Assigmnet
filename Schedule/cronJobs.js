import cron from 'node-cron';
import TaskData from '../Modals/TaskModel.js';
import sendEmail from '../nodemailer/mail.js';
import userData from '../Modals/AuthModal.js';



cron.schedule('59 6 * * *', async () => {
    try {
        const currentDate = new Date();
        const tasks = await TaskData.find({ status: { $ne: 'completed' } });

        for (let task of tasks) {
            const taskId = task._id.toString();
            const taskDueDate = new Date(task.duedate);
            const remainingDays = Math.floor((taskDueDate - currentDate) / (1000 * 60 * 60 * 24));

            if (remainingDays <=2 ) {
               const updatedTask= await TaskData.findByIdAndUpdate(taskId, { 
                    status: 'completed', 
                    remday: remainingDays 
                }, { new: true });
                const userId = task.userid;  
                const userDatanew =await userData.findById(userId)
                const name  = userDatanew.name;
                const email = userDatanew.email;

                const emailData ={
                    from: 'noreply@node-react.com',
                    to: email, 
                    subject: 'your task deadline reminder',
                    text: `Name: ${name}\nEmail: ${email}`,
                    html: `
                        <h2>Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p>${updatedTask.title}</p>                       
                        <p>${updatedTask.description}</p>
                        <p>${updatedTask.status}</p>
                        <p>${updatedTask.remday}</p>
                    `
                };
               sendEmail(emailData);
        
            }
        }
        console.log('Tasks updated successfully');
    } catch (error) {
        console.error('Error updating tasks:', error.message);
    }
});
export default  {};
