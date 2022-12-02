import React from "react";

// this was displayAppointment
/*
<button onClick={props.editItem()}>Edit!</button>
<button onClick={props.deleteItem()}> Delete!</button>
*/
function AppointmentInfo(props) {

    

    return (
        <div>
            <p>
            <h4>Date & Time: <small>{props.date}</small> at <small>{props.time}</small></h4>
            <h4>Location: <small>{props.place}</small></h4>
            <h5>Description: <small>{props.description}</small></h5>
            </p>
        </div>
    )
    
}

export default AppointmentInfo