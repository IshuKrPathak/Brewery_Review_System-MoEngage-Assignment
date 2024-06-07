
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, TextField, Typography } from "@mui/material";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    if (user.email === "" || user.password === "" || user.username === "") {
      alert('Please enter the Username, email and password');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-around h-screen bg-yellow-50">
      <div className="font-calibri text-6xl text-green-500 font-bold tracking-wide">
        Brewery Review System
      </div>

      <div className="flex flex-col items-center justify-center font-bold border-spacing-1 text-red-600">
        Create an account 👇
        <hr style={{ width: "75%", marginBottom: "1rem" }} />
        <TextField
          margin="normal"
          required
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={onSignup}
          className="px-4 py-2 bg-green-800 text-white rounded hover:bg-red-600"
        >
          Sign Up
        </Button>
        <Link
          href="/login"
          className=" font-bold text-slate-600 hover:text-red-600"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
