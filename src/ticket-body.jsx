import "./App.css";

const TicketBody = ({ id, ticketData, handleDelete, openModal }) => {
  return (
    <>
      <div className="card mt-2">
        <div className="row">
          <div className="card-body col-7">
            <div className=" col-2 d-flex flex-row ">
              <span className="badge badge-warning mr-2">{ticketData.status}</span>
              <span className="badge badge-info">{ticketData.category}</span>
            </div>
            <div className="p-2 my-1 border" onClick={openModal}>
              <p className="card-text">{ticketData.details}</p>
            </div>
          </div>
          <div className="col-4">
            <ul className="list">
              <li>
                <b> Priority :</b> {ticketData.priority}
              </li>
              <li>
                <b> Assigned To :</b> {ticketData.assignedTo}
              </li>
              <li>
                <b> Created By :</b> {ticketData.createdBy} 
              </li>
            </ul>
          </div>
          <div className="col-1">
            <h4><i className="fa fa-trash text-danger trash" onClick={()=>handleDelete(id)}></i></h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketBody;
