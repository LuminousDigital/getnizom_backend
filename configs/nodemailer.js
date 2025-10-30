import nodemailer from "nodemailer";

// Simple provider flag with shared creds; host/port can be overridden via env
const provider = (process.env.MAIL_PROVIDER || "brevo").toLowerCase();
const host = process.env.SMTP_HOST || (provider === "mailtrap" ? "sandbox.smtp.mailtrap.io" : "smtp-relay.brevo.com");
const port = Number(process.env.SMTP_PORT || 587);

const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async ({ to, subject, body }) => {
    console.log(to, subject, body);
    const response = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html: body,
    });
    return response;
};

export default sendEmail;
