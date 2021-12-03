//import { useState } from "react";

const Jumbotron = ({ ticketData }) => {  

    const activeTickets = ticketData.filter((ticket)=>ticket.status!=="Resolved");
    
    return (
      <div className="jumbotron text-center bg-secondary">
        <div className="row text-center d-flex justify-content-around">
          <div className="col-3">
            <div className="card">
              <div className="card-header bg-info text-light text-center">
                <h4> Total</h4>
              </div>
              <div className="card-body text-center">
                <h2 className="card-text">{ticketData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header bg-dark text-light text-center">
                <h4> Active</h4>
              </div>
              <div className="card-body text-center">
                <h2 className="card-text">{activeTickets.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header bg-success text-center">
                <h4>Solved</h4>
              </div>
              <div className="card-body text-center">
                <h2 className="card-text">{Math.abs(activeTickets.length - ticketData.length)}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Jumbotron;
  