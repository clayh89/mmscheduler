import React from "react";



function displayAppointment(props) {

    

    return (
        <div>
            <h4>Date & Time:{props.date} at {props.time}</h4>
            <h4>Location: {props.location}</h4>
            <h5>Description:</h5>
            <p>{props.description}</p>
            <button onClick={deleteItem}> Delete!</button>
        </div>
    )
    
}

export default displayAppointment