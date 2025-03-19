"use client";
import React, { useState } from "react";
import ForgetFirstStep from "./components/ForgetFirstStep";
import ForgetSecondStep from "./components/ForgetSecondStep";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");

  const Allsteps = [ForgetFirstStep, ForgetSecondStep][currentStep];

  const resetPasswordRequest = async (email: string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/auth/reset-password-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error", error);
      alert("aldaa garlaa");
    }
  };

  return (
    <Allsteps
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      email={email}
      setEmail={setEmail}
      resetPasswordRequest={resetPasswordRequest}
    />
  );
};

export default Page;
