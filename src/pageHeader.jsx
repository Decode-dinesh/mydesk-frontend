import React from "react";

const PageHeader = (props) => {
  return (
    <>
      <div className="heading text-center bg bg-dark text-white d-flex justify-content-between">
        <div className="p-2 text-warning">
          <h1>{props.text}</h1>
        </div>
        <div className="d-flex align-items-center">
          <div className="mx-3">
            <h4 className="text-light">{localStorage.getItem("user")} <i className="fa fa-user-circle" style={{fontSize:32+'px'}}></i> </h4>
          </div>
          <button className="btn btn-danger" onClick={props.logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
