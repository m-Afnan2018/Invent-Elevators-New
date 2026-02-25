"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./forgot-password.module.css";

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Replace with real API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Reset Password</h1>
                    <p>Enter your email to receive reset instructions</p>
                </div>

                {!success ? (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            className={styles.resetBtn}
                            disabled={loading}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>
                    </form>
                ) : (
                    <div className={styles.successBox}>
                        <p>
                            ✅ Reset link sent to your email.
                            Please check your inbox.
                        </p>
                    </div>
                )}

                <div className={styles.footer}>
                    <p>
                        Remembered your password?{" "}
                        <span onClick={() => router.push("/login")}>
                            Back to Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}