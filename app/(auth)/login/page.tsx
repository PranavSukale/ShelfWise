"use client";

import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import "./style.css"; // your CSS file

export default function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      {/* Curved Background */}
      <div className="curved-shape"></div>
      <div className="curved-shape2"></div>

      {/* Form Box */}
      <div className={`form-box ${isLogin ? "Login" : "Register"}`}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-box">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>
          )}

          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="input-box">
            <button className="btn" type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </div>

          <div className="regi-link">
            {isLogin ? (
              <p>
                Don’t have an account?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  Sign Up
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>
                  Sign In
                </a>
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Info Content */}
      <div className={`info-content ${isLogin ? "Login" : "Register"}`}>
        <h2>{isLogin ? "WELCOME BACK!" : "WELCOME!"}</h2>
        <p>
          {isLogin
            ? "We are happy to have you with us again. If you need anything, we are here to help."
            : "We’re delighted to have you here. If you need any assistance, feel free to reach out."}
        </p>
      </div>
    </div>
  );
}

