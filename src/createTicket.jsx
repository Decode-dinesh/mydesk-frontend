import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateTicket = () => {
  let history = useHistory();
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("New");
  const [assignedTo, setAssignedto] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      details,
      category,
      priority,
      status,
      assignedTo,
      createdBy: localStorage.getItem("user"),
    };
    setDetails("");
    setCategory("");
    setAssignedto("");
    setPriority("");
    setStatus("New");
    history.goBack();

    
    let url = "https://ticket-management-tool.herokuapp.com/customer/tickets";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Data added to db!!");
  };

  return (
    <div className="bg bg-secondary" style={{ height: "100vh" }}>
      <div className="container w-50 p-5 align-content-center">
        <div className="card">
          <div className="card-header bg-dark text-light text-center">
            <h3 className="card-title">New Ticket</h3>
          </div>
          <div className="card-body bg-light">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Payslip">Payslip</option>
                  <option value="Billing">Billing</option>
                  <option value="Software">Software</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="priority"
                  id="priority"
                  className="form-control"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Select priority</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
           
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Assign To"
                  className="form-control"
                  value={assignedTo}
                  onChange={(e) => setAssignedto(e.target.value)}
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  placeholder="Description"
                  className="form-control"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-info">
                  Create{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
