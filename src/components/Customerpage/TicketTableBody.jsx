import React from "react";

const TicketTableBody = (props) => {
  return (
    <>
      <tr >
        <td className="show" onClick={props.openModal}>{props.details}</td>
        <td>{props.category}</td>
        <td>{props.priority}</td>
        <td>{props.status}</td>
        <td>{props.assignedTo}</td>
        <td>
          <i className="fa fa-close" id={props.id} onClick={()=>props.handleDelete(props.id) }></i>
        </td>
      </tr>
    </>
  );
};

export default TicketTableBody;
