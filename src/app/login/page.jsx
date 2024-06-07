"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    if (user.email === "" || user.password === "") {
      alert('Please enter both email and password');;
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      toast.success("Login success");
      router.push("/homepage");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-around h-screen bg-yellow-50" 
      
    >
      <div className="font-calibri text-6xl text-green-500 font-bold tracking-wide">
      Brewery Review System
      </div>

      <div className="flex flex-col items-center justify-center font-bold border-spacing-1 text-red-600">
          Login with your credentials 👇
        <hr style={{ width: "75%", marginBottom: "1rem" }} />
        <TextField
          margin="normal"
          required id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={{ marginBottom: "1rem" }} 
        />
        <TextField
          margin="normal"
          required name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={{ marginBottom: "1rem" }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          onClick={onLogin}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-red-600"
          style={{ marginBottom: "1rem" }}
        >
          Login
        </Button>
        <Link href="/signup" className=" font-bold text-slate-600 hover:text-red-600"
        >
          Dont have an account | Sign Up!
        </Link>
      </div>

    </div>
  );
}
