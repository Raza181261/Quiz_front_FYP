"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ActivatePage() {
  const { token } = useParams(); // Get token from URL
  const [message, setMessage] = useState("Activating your account...");
  const router = useRouter();

  useEffect(() => {
    async function activate() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/activation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
          setMessage("Account activated successfully! Redirecting to login...");
          setTimeout(() => router.push("/signin"), 3000);
        } else {
          setMessage(data.message || "Activation failed!");
        }
      } catch (error) {
        setMessage("Something went wrong during activation!");
      }
    }

    activate();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Account Activation</h1>
      <p>{message}</p>
    </div>
  );
}
