"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import "./Navbar.css"; // We will create this

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">InternAgent</Link>
      </div>
      <div className="navbar-menu">
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <span className="user-name">Welcome, {session.user?.name}</span>
            <button onClick={() => signOut()} className="btn btn-outline">Sign Out</button>
          </>
        ) : (
          <button onClick={() => signIn("google")} className="btn btn-primary">Sign In with Google</button>
        )}
      </div>
    </nav>
  );
}
