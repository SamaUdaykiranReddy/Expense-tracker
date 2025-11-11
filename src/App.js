import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SignUp from "./components/signUp";
import LogIn from "./components/LogIn";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(auth);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  if (!currentUser) {
    return (
      <div>
        <SignUp setCurrentUser={setCurrentUser} />
        <hr />
        <LogIn setCurrentUser={setCurrentUser} />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Expense Tracker</h2>
      <h5>Welcome, {currentUser.email}</h5>
      <button className="btn btn-warning mb-3" onClick={handleLogout}>
        Logout
      </button>
      <ExpenseForm addExpense={addExpense} currentUser={currentUser} />
      <ExpenseList expenses={expenses} currentUser={currentUser} />
    </div>
  );
}

export default App;
