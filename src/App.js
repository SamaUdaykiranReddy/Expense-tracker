// src/App.js
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import SignUp from "./components/signUp";
import LogIn from "./components/LogIn";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user-specific expenses from Firestore
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Logout function
  const handleLogout = () => signOut(auth);

  // Delete expense from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Show SignUp / LogIn if user is not logged in
  if (!currentUser) {
    return (
      <div>
        <SignUp setCurrentUser={setCurrentUser} />
        <hr />
        <LogIn setCurrentUser={setCurrentUser} />
      </div>
    );
  }

  // Main App UI
  return (
    <div className="container mt-4">
      <h2>Expense Tracker</h2>
      <h5>Welcome, {currentUser.email}</h5>
      <button className="btn btn-warning mb-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Expense Form writes directly to Firestore */}
      <ExpenseForm currentUser={currentUser} />

      {/* Expense List shows Firestore expenses and allows deletion */}
      <ExpenseList expenses={expenses} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
