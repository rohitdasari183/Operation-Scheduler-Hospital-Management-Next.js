import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

let codeStorage = {}; // Temporary in-memory store

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const isRegisteredDoctor = async (email) => {
  const snapshot = await getDocs(collection(db, "doctors"));
  return snapshot.docs.find((doc) => doc.data().email === email);
};

export const sendVerificationCode = async (email, code) => {
  const templateParams = {
    to_email: email,
    message: `Your verification code is: ${code}`,
  };

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(templateParams),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to send email.");
    codeStorage[email] = code;
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

export const verifyCode = (email, code) => {
  return codeStorage[email] === code;
};
