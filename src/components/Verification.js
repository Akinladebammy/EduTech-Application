import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const email =
    localStorage.getItem("signupEmail") || "*****timothy201@gmail.com";

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://studybuddy-1-taps.onrender.com/auth/verify-code?email=${encodeURIComponent(
          email
        )}&code=${otpCode}`,
        {
          method: "POST",
        }
      );
      console.log("Response status:", response.status, "Headers:", [
        ...response.headers,
      ]);

      if (!response.ok) {
        let errorMessage = `Error: ${response.status}`;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } else {
          errorMessage = (await response.text()) || "Server error occurred";
        }
        if (response.status === 500) {
          errorMessage =
            "Server error occurred. Please try again or contact support.";
        }
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          localStorage.removeItem("signupEmail");
          navigate("/login");
        } else {
          setError(data.message || "Invalid verification code");
        }
      } else {
        const text = await response.text();
        if (text.includes("Email verified successfully")) {
          localStorage.removeItem("signupEmail");
          navigate("/login");
        } else {
          setError(text || "Unexpected response format");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error: Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      // You might want to implement a resend code API endpoint
      console.log("Resending code...");
      // Add your resend logic here
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>OTP Verification</h1>
        <p className={styles.subtitle}>
          Please enter the 6 digit code sent to
          <br />
          <span className={styles.email}>{email}</span>
        </p>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`${styles.otpInput} ${
                digit ? styles.otpInputFilled : ""
              }`}
              disabled={isLoading}
            />
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.verifyButton}
            onClick={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
            <span className={styles.arrow}>→</span>
          </button>

          <button
            className={styles.resendButton}
            onClick={handleResendCode}
            disabled={isLoading}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
