import React from "react";

// table row component. probably could live in the list one but this is more modular. does wanna be used with map 
// (i.e. used on a data array to generate the content of a table w/ the map method)
// The buttons call functions from App.js. This might work better w/ parent component, but... code reuse? 
// <AppointmentInfo appointment={{}} deleteButton={'function'} editButton={'function'} />

import './appointments.css';

function AppointmentInfo(props) {

    return (
        <tr>
            <td><button onClick={() => props.editButton(props.appointment.key)} className="button editButton">Edit</button></td>
            <td class = "date-T">{props.appointment.date}</td>
            <td class = "time-T">{props.appointment.time}</td>
            <td class = "place-T">{props.appointment.place}</td>
            <td class = "description-T">{props.appointment.description}</td>
            
            <td><button onClick={() => props.deleteButton(props.appointment.key)} className="button deleteButton">Delete</button></td>
        </tr>
    )
    
}

export default AppointmentInfo