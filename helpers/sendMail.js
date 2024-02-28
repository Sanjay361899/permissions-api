const nodemailer=require("nodemailer");
const transporter= nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
})
const sendMail=async(mailTo,mailSubject,mailHtml)=>{
try {
    console.log(process.env,"env file");
    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:mailTo,
        subject:mailSubject,
        html:mailHtml
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error,"error in send Mail");
        }
        console.log("mail has been sent",info)
    })
    
} catch (error) {
 throw error.message   
}}

module.exports={
    sendMail
}