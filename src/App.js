import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const expensesCollection = collection(db, "expenses");

  const addExpense = async(expense) => {
     await addDoc(expensesCollection,expense);
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(expensesCollection, (snapshot) => {
      const expenseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })); setExpenses(expenseData);
    });
    return ()=>unsubscribe();
  },[]);
  const handleDelete = async(id) => {
    const expenseDoc = doc(db,"expenses",id);
    await deleteDoc(expenseDoc);
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Expense Tracker</h2>
      <ExpenseForm addExpense={addExpense} />
      <div className="mb-4">
        <select
          class="form-select mb-3 w-50"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Default select example"
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
           <option value="Travel">Travel</option>
          <option value="Basic">Basic</option>
          <option value="Groceries">Groceries</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <ExpenseList
        expenses={
          filterCategory === "All"
            ? expenses
            : expenses.filter((e) => e.category === filterCategory)
        }
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
