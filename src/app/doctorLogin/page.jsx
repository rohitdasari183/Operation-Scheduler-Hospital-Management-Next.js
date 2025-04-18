"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  isRegisteredDoctor,
  sendVerificationCode,
  verifyCode,
  generateCode,
} from "@/lib/doctorAuth";

export default function DoctorLoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendCode = async () => {
    const doctor = await isRegisteredDoctor(email);
    if (!doctor) {
      setError("Email not registered as a doctor.");
      return;
    }

    const generatedCode = generateCode();
    const success = await sendVerificationCode(email, generatedCode);
    if (success) {
      setStep(2);
      setError("");
    } else {
      setError("Failed to send verification email.");
    }
  };

  const handleVerify = () => {
    if (verifyCode(email, code)) {
      // Simulate login — store session info as needed
      router.push("/patientDashboard");
    } else {
      setError("Invalid verification code.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Doctor Login</h2>

        {step === 1 && (
          <>
            <label className="block mb-2 font-medium">Doctor Email (Gmail)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 mb-4"
              placeholder="Enter your Gmail"
              required
            />
            <button
              onClick={handleSendCode}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
            >
              Send Verification Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 font-medium">Enter Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 mb-4"
              placeholder="123456"
              required
            />
            <button
              onClick={handleVerify}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-md font-semibold"
            >
              Verify & Login
            </button>
          </>
        )}

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
