import React from "react";

// table row component. probably could live in the list one but this is more modular. does wanna be used with map 
// (i.e. used on a data array to generate the content of a table w/ the map method)
// The buttons call functions from App.js. This might work better w/ parent component, but... code reuse? 
// <AppointmentInfo appointment={{}} deleteButton={'function'} editButton={'function'} />

function AppointmentInfo(props) {

    return (
        <tr>
            <td>{props.appointment.date}</td>
            <td>{props.appointment.time}</td>
            <td>{props.appointment.place}</td>
            <td>{props.appointment.description}</td>
            <td><button onClick={() => props.editButton(props.appointment.key)}>Edit</button></td>
            <td><button onClick={() => props.deleteButton(props.appointment.key)}>Delete</button></td>
        </tr>
    )
    
}

export default AppointmentInfo