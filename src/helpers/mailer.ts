import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any)=>{
    try {
        const hashedToken= await bcryptjs.hash(userId.toString(), 10)

       if(emailType==="VERIFY"){
        await User.findByIdAndUpdate(userId,
            {
                verifyToken:hashedToken, verifyTokenExpiry:
                Date.now()+ 3600000
            },
            // {
            //     new:true,
            //     runValidators:true
            // }
         )
       }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {
                forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry:
                Date.now()+ 3600000
            },
         
         )
       }
       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5ddae285754c6b",
          pass: "6ed91099918a97"
        }
      });

      var mailOptions = {
        from: "wBn7V@example.com",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        // text: `http://localhost:3000/api/users/verify?token=${hashedToken}`
        html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
         to ${emailType ==="VERIFY" ? "verify your email" : "reset your password"} 
         or copy and paste the link . <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
         </p>`
      };

      const mailResponse= await transport.sendMail(mailOptions)

      return mailResponse
       

        
    } catch (error:any) {
        throw new Error (error.message);
        
    }

}