function ExpenseList({ expenses, handleDelete }) {
  if (!expenses.length) return <p>No expenses added yet.</p>;
  const total = expenses.reduce((sum, item) => item.amount + sum, 0);

  return (
    
    <ul className="list-group">
      {expenses.map((exp) => (
        
        <li
          key={exp.id}
          className="list-group-item d-flex justify-content-between align-items-start"
        >
          <div>
            <span>{exp.title}</span>
            <div className="text-muted small">{exp.category}</div>
          </div>
          <div className="text-end">
            <span className="fw-bold mb-2">${exp.amount.toFixed(2)}</span>
            <br />
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(exp.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}

      <h5 className="list-group-item d-flex justify-content-between ">
        Total Expenditure is <span>${total.toFixed(2)}</span>{" "}
      </h5>
    </ul>
  );
}

export default ExpenseList;
