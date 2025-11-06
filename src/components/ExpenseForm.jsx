import { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    addExpense({ title, amount: parseFloat(amount), category });
    setAmount("");
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        className="form-control mb-3 w-50"
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-control mb-3 w-50"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={0}
        step={0.01}
      />
      <select
        className="form-control mb-3 w-50"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Default select example"
      >
        <option>Select the Category</option>
        <option value="Basic">Basic</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Groceries">Groceries</option>
      </select>
      <button className="btn btn-primary w-10 " type="submit">
        Add Expense
      </button>
    </form>
  );
}
export default ExpenseForm;
