import nodemailer from "nodemailer";

let transporter = null;

const getTransporter = () => {
    if (transporter) return transporter;

    if (!process.env.SMTP_HOST) {
        return null;
    }

    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER
            ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
            : undefined
    });

    return transporter;
};

export const sendEmail = async ({ to, subject, html, text }) => {
    const client = getTransporter();

    if (!client) {
        console.log("EMAIL (SMTP no configurado, mostrando en consola)");
        console.log(`Para: ${to}`);
        console.log(`Asunto: ${subject}`);
        console.log(text);
        return;
    }

    await client.sendMail({
        from: process.env.SMTP_FROM || "TableMaster <no-reply@tablemaster.com>",
        to,
        subject,
        html,
        text
    });
};