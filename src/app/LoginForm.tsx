"use client";

import { useState } from "react";
// import { signIn, useSession, signOut } from "next-auth/react";

import styles from "../styles/LoginPage.module.css";

// Hooks
import { useAuthSession } from "@/shared/hooks/useAuthSession";

//Components
import Button from "@/shared/components/Button";

//Icons
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LoginForm() {
  const { session, signIn, signOut } = useAuthSession();

  const [email, setEmail] = useState("glaysonwow@gmail.com");
  const [password, setPassword] = useState("glayson123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!session ? (
          <>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button text="login" type="submit" fullWidth icon={<LoginIcon />} />
          </>
        ) : (
          <>
            <span className={styles.loggedText}>Você está logado.</span>

            <Button
              text="deslogar"
              fullWidth
              icon={<LogoutIcon />}
              onClick={handleLogout}
            />

            <div className={styles.userDataWrapper}>
              <div className={styles.userDataRow}>
                <span>ID:</span>
                <span>{session.user.id}</span>
              </div>

              <div className={styles.userDataRow}>
                <span>USERNAME:</span>
                <span>{session.user.username}</span>
              </div>

              <div className={styles.userDataRow}>
                <span>EMAIL:</span>
                <span>{session.user.email}</span>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
