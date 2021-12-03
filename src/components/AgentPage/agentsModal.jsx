import Table from "react-bootstrap/Table"

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

const AgentsModal = ({ showModal, closeModal, data }) => {
  if (!showModal) return null;
  return (
    <>
      <div style={Overlay_styles} />
      <div style={Modal_styles}>
        <div className="d-flex justify-content-between">
          <h1 className="text-info">Agents Details</h1>
          <h3>
            <i className="fa fa-close close-icon" onClick={closeModal}></i>{" "}
          </h3>
        </div>
        <div>
          <div className="card">
            <div className="card-body">
              <Table striped hover bordered responsive>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((agent,ind) => {
                  return (
                    <tr key={ind}>
                      <td>{agent.username}</td>
                      <td>{agent.email}</td>
                    </tr>
                  );
                })}
                </tbody>
              </Table>
              <ul className="list-group list-group-flush">
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentsModal;
