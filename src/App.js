import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const addExpense = (expense) => {
    setExpenses([...expenses, { id: Date.now(), ...expense }]);
  };
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
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
