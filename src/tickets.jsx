import React, { useState, useContext } from "react";
import "./App.css";
import TicketBody from "./ticket-body";
import Modal from "./components/Customerpage/Modal";
import TicketContext from "./context/TicketContext";


const Tickets = ({agentsList}) => {
  
  let {tickets,searchdata} = useContext(TicketContext);
  let [ticketdata,setTicketdata] = tickets;
  let [searchString] = searchdata;
  let [modelData, setModeldata] = useState(null);
  let [displayModal, setDisplayModal] = useState(false);

  
  const search = (str)=>{
    if(ticketdata.length!==0){
      const searchFields =  ticketdata && Object.keys(ticketdata[0]);
      return (ticketdata && ticketdata.filter(
        (ticket)=> searchFields.some(
          (fields)=> {
            return ticket[fields].toLowerCase().indexOf(str) > -1 
          })
      ))
    }
  }

  const handleDelete = async (id) => {
    let url = `https://ticket-management-tool.herokuapp.com/customer/tickets/${id}`
    
    await fetch(url, {
      method: "DELETE",
    });
    let data = ticketdata.filter((ticket) => ticket._id !== id);
    setTicketdata(data);
  };

  const openModal = (id) => {
    setDisplayModal(true);
    setModeldata(ticketdata[id]);
  };

 

  return (
    <div>
      { search(searchString) && search(searchString).map((val,ind) => {
        return (
          <div key={ind}>
            <Modal              
              showModal={displayModal}
              closeModal={() => setDisplayModal(false)}
              data={modelData}
              key={val._id}
              agentsList = {agentsList}
            />
            <TicketBody
              key={ind}
              id={val._id}
              ticketData={val}
              handleDelete={handleDelete}
              openModal={() => openModal(ind)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tickets;
