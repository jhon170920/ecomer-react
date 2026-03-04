import nodemailer from 'nodemailer';

export const enviarEmailPedido = async ({ to, subject, html }) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const info = await transporter.sendMail({
        from: `"Mi Tienda" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      });
  
      console.log("Correo enviado:", info.messageId);
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
  };