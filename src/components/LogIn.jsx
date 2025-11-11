 import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LogIn({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      setError("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogIn} className="w-50 mx-auto mt-3">
      <h3 className="text-center mb-3">Log In</h3>
      <input
        type="email"
        placeholder="Enter Your Email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-success w-100">
        Log In
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
}

export default LogIn;
