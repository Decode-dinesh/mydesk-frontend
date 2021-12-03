import {useState, useEffect} from "react";
import "./App.css";
import Tickets from "./tickets";
import Menu from './menu';
import Heading from './heading';
import PageHeader from './pageHeader';
import TicketContext from "./context/TicketContext";
import { useHistory } from "react-router-dom";


const Layout = () => {

  const history = useHistory();
  const [agents, setAgents] = useState([]);
  const [ticketData,setTicketData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleLogout = ()=>{
    localStorage.clear();
    history.replace('/');
  }

  const contextData = {
    tickets : [ticketData,setTicketData],
    searchdata : [searchString,setSearchString]
  }

   useEffect(()=>{
     const ac = new AbortController();
    const getAgents = async()=>{
      let url = "https://ticket-management-tool.herokuapp.com/users/"
      
        let response = await fetch(url,{signal:ac.signal});
        let fetchedData = await response.json();
        let agentsArray = fetchedData.data.filter((val)=>val.role==="agent")
        setAgents(agentsArray);
    }
    const getData = async () => {
      let url = "https://ticket-management-tool.herokuapp.com/customer/tickets"
    
      let response = await fetch(url,{signal:ac.signal});
      let apidata = await response.json();
      // if (apidata.data.length !== ticketData.length) {
        setTicketData(apidata.data);
      // }
    };
    getData();
    getAgents();
    return ()=>ac.abort();
  },[])

  return (
    <div className="containter">
      <PageHeader text="Ticket Management Tool" logout={handleLogout}  />
      <div> 
        <div className="row">
          <div className="col-1 bg-secondary">
            <Menu agents={agents}/>
          </div>
            <div className="col-11">
              <TicketContext.Provider value={contextData}>
                  <Heading />
                <div className="row mx-2">
                    <div className="py-2 col-12 bg-dark">
                        <Tickets 
                          agentsList={agents} 
                        />
                    </div>
                </div>
              </TicketContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
