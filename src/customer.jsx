import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "./pageHeader";
import TicketTableBody from "./components/Customerpage/TicketTableBody";
import Jumbotron from "./components/Customerpage/Jumbotron";
import Modal from "./components/Customerpage/Modal";

const Customer = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.replace("/");
  };

  let [displayModal, setDisplayModal] = useState(false);
  let [ticketData, setTicketData] = useState([]);
  let [modelData, setModeldata] = useState("");
  const [agents, setAgents] = useState([]);

  const handleNewTicket = () => {
    history.push("/createTicket");
  };

  const handleDelete = async (id) => {
    let url = "https://ticket-management-tool.herokuapp.com/customer/tickets/${id}";
    
    await fetch(url, {
      method: "DELETE",
    });
    let data = ticketData.filter((ticket) => ticket._id !== id);
    // console.log("ticket data:::", data);
    setTicketData(data);
  };

  const openModal = (id) => {
    setDisplayModal(true);
    setModeldata(ticketData[id]);
  };

  useEffect(() => {
    const getAgents = async () => {
      let url = "https://ticket-management-tool.herokuapp.com/users/";
      let response = await fetch(url);
      let fetchedData = await response.json();
      let agentsArray = fetchedData.data.filter((val) => val.role === "agent");
      setAgents(agentsArray);
    };
    const getData = async () => {
      let url = "https://ticket-management-tool.herokuapp.com/customer/tickets";
      let response = await fetch(url);
      let apidata = await response.json();
      if (
        apidata.data.length !== ticketData.length ||
        JSON.stringify(apidata.data) !== JSON.stringify(ticketData)
      ) {
        setTicketData(apidata.data);
      }
      // console.log("[customer.js] Use effect call:")
    };
    getData();
    getAgents();
  }, [ticketData]);

  //console.log("[customer.js]  :::", ticketData);
  return (
    <>
      <div>
        <PageHeader text="Customer Page" logout={handleLogout} />
        <Jumbotron ticketData={ticketData} />
        <Modal
          showModal={displayModal}
          closeModal={() => setDisplayModal(false)}
          data={modelData}
          agentsList={agents}
        />
        <div className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-10">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assigned to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData.map((ticket, ind) => {
                      return (
                        <>
                          <TicketTableBody
                            key={ticket._id}
                            id={ticket._id}
                            details={ticket.details}
                            category={ticket.category}
                            priority={ticket.priority}
                            status={ticket.status}
                            assignedTo={ticket.assignedTo}
                            handleDelete={handleDelete}
                            openModal={() => openModal(ind)}
                          />
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-2">
                <button onClick={handleNewTicket} className="btn btn-success">
                  New Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
