import {useState} from "react";
import "./App.css";
import AgentsModal from './components/AgentPage/agentsModal';

const Menu = ({agents})=>{
  
  let [displayModal, setDisplayModal] = useState(false);
  
  const openModal = ()=>{
    setDisplayModal(true);
  }
  
return (
    <div className="menu">
      <AgentsModal 
          showModal={displayModal} 
          closeModal={()=>setDisplayModal(false)} 
          data={agents}
        /> 
      <ul className="p-md-3 ml-md-3">
      <li>
        <h3><i className="fa fa-ticket mt-2 icon active"></i></h3>
      </li>
      <li>
        <h3><i className="fa fa-user mt-2 icon" onClick={openModal}></i></h3>
      </li>
      <li>
        <h3><i className="fa fa-phone mt-2 icon disabled"></i></h3>
      </li>
    </ul>
  </div>
  
  )
}

export default Menu;