import React from "react";

// this was displayAppointment
/*
<button onClick={props.editItem()}>Edit!</button>
<button onClick={props.deleteItem()}> Delete!</button>

<div>
            <p>
            <h4>Date & Time: <small>{props.appointment.date}</small> at <small>{props.appointment.time}</small></h4>
            <h4>Location: <small>{props.appointment.place}</small></h4>
            <h5>Description: <small>{props.appointment.description}</small></h5>
            </p>
</div>
*/
function AppointmentInfo(props) {

    

    return (
        <tr>
            <td>{props.appointment.date}</td>
            <td>{props.appointment.time}</td>
            <td>{props.appointment.location}</td>
            <td>{props.appointment.description}</td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
        </tr>
    )
    
}

export default AppointmentInfo