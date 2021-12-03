import React, { useState } from "react";

const Modal_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  zIndex: 1000,
  padding: "10px",
  width: "500px",
};

const Overlay_styles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};

const Modal = ({ showModal, closeModal, data, agentsList }) => {
  //console.log(data, showModal, closeModal)
  const isDisabled = localStorage.getItem("userRole") === "customer";

  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState("");
  const [assignedTo, setAssignedto] = useState("");

  const updateData = async (e) => {
    e.preventDefault();
    try {
      let newdata = {
        details,
        category,
        priority,
        status,
        assignedTo,
      };
      let url = `https://ticket-management-tool.herokuapp.com/customer/tickets/${data._id}`;
      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(newdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Data Updated Successfully!!");
      } else {
        console.log("Error in updating the data!!");
      }
      closeModal();
    } catch (error) {
      console.log("Fetch update api error :", error);
    }
  };

  // const handleChange = (e)=>{

  // }

  if (!showModal) return null;
  return (
    <>
      <div style={Overlay_styles} />
      <div style={Modal_styles}>
        <div className="d-flex justify-content-between">
          <h1 className="text-info">Ticket Details</h1>
          <h3>
            <i className="fa fa-close close-icon" onClick={closeModal}></i>{" "}
          </h3>
        </div>

        <form onSubmit={updateData} method="put">
          <div className="form-group">
            <b>
              <label htmlFor="">Priority</label>
            </b>
            <input
              type="text"
              className="form-control"
              defaultValue={data.priority}
              disabled={isDisabled}
              onChange={(e) => setPriority(e.target.value)}
            />
          </div>

          {/* only admin or agent can update the status of the ticket */}
          {!isDisabled ? (
            <div className="form-group">
              <b>
                <label htmlFor="">Status</label>
              </b>
              <input
                type="text"
                className="form-control"
                defaultValue={data.status}
                disabled={isDisabled}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          ) : null}
          <div className="form-group">
            <b>
              <label htmlFor="">Category</label>
            </b>
            <input
              type="text"
              className="form-control"
              defaultValue={data.category}
              disabled={isDisabled}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <b>
              <label htmlFor="">Assign To</label>
            </b>
            <select
              className="form-control"
              disabled={isDisabled}
              onChange={(e) => setAssignedto(e.target.value)}
            >
              {agentsList.map((agent) => {
                return <option>{agent.username}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <b>
              <label htmlFor="">Details</label>
            </b>
            <textarea
              className="form-control"
              rows="3"
              defaultValue={data.details}
              disabled={isDisabled}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-success"
              disabled={isDisabled}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
