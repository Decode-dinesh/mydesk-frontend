import React,{useState,useEffect} from 'react';
import PageHeader from './../../pageHeader'
import { useHistory } from "react-router-dom";
import Modal from "../Customerpage/Modal";
import TicketBody from "./../../ticket-body"

const Agents = ()=>{
    const history = useHistory();

    let [ticketData, setTicketData] = useState([]);
    let [modelData, setModeldata] = useState(null);
    let [displayModal, setDisplayModal] = useState(false);
    const [agents, setAgents] = useState([]);

    const handleLogout = ()=>{
        localStorage.clear();
        history.replace('/');
      }

    useEffect(() => {
        const getAgents = async()=>{
          let url = "https://ticket-management-tool.herokuapp.com/users"
            let response = await fetch(url);
            let fetchedData = await response.json();
            let agentsArray = fetchedData.data.filter((val)=>val.role==="agent")
            setAgents(agentsArray);
        }
        const getData = async () => {
          let url = "https://ticket-management-tool.herokuapp.com/customer/tickets"
          let response = await fetch(url);
          let apidata = await response.json();
          // if (apidata.data.length !== ticketData.length) {
            setTicketData(apidata.data);
          // }
        };
        getData();
        getAgents();
    }, []);

    const handleDelete = async (id) => {
      let url = `https://ticket-management-tool.herokuapp.com/customer/tickets/${id}`
        await fetch(url, {
          method: "DELETE",
        });
        let data = ticketData.filter((ticket) => ticket._id !== id);
        setTicketData(data);
      };
    
  const openModal = (id) => {
    setDisplayModal(true);
    setModeldata(ticketData[id]);
  };

    return (
        <>
        <PageHeader text="CRM Agents"  logout={handleLogout}/>
        <div className="row my-1">
            <div className="col-lg-2 col-0 bg-dark">

            </div>
            <div className="py-2 col-lg-8 col-12 bg-secondary">
            { ticketData.map((val, ind) => {
        return (
          <>
            <Modal              
              showModal={displayModal}
              closeModal={() => setDisplayModal(false)}
              data={modelData}
              key={val._id}
              agentsList = {agents}
            />
            <TicketBody
              key={ind}
              id={val._id}
              ticketData={val}
              handleDelete={handleDelete}
              openModal={() => openModal(ind)}
            />
          </>
        );
      })}
            </div>
            <div className="col-lg-2 col-0 bg-dark">
                
            </div>
        </div>
        </>
    )
}

export default Agents;