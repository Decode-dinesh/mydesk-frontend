import React,{useContext} from 'react';
import './App.css';
import {useHistory} from 'react-router-dom';
import TicketContext from "./context/TicketContext";

const Heading = () =>{
    let history = useHistory();
    const {searchdata} = useContext(TicketContext);
    const [searchString,setSearchString] = searchdata;

    const style = {
        padding : "10px",
        fontSize : "26px"
    }

    const addTicket = ()=>{
       history.push('/createTicket');
    }

    return (
        <div className="d-flex justify-content-between bg-light">
            <div className="py-3 d-flex justify-content-between">
                <i className="fa fa-list" style={style}></i>
                <h5 className="p-2">All Tickets</h5>
            </div>
            <div className="py-3 d-flex justify-content-between align-items-center">
                <button className="btn btn-info btn-sm my-1" onClick={addTicket}>
                    New <i className="fa fa-plus h6"></i>
                </button>
                <input type="text" placeholder="Search" onChange={(e)=>setSearchString(e.target.value)}  
                    className="form-control w-50"/>
                <i className="fa fa-bell" style={style}></i>
                <i className="fa fa-gift" style={style}></i>
            </div>
      </div>
    )
}

export default Heading;