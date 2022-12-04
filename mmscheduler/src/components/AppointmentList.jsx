import React from "react";
import AppointmentInfo from "./AppointmentInfo";

// builds an appointment table
// takes appointments object, maps it out w/ passed buttons from the parent (here, App.js)
// <AppointmentList appointments={{}} editButton={''} deleteButton={''}
function AppointmentList(props) {
    

    return( 
        <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Description & Notes</th>
          <th>+</th>
          <th>+</th>
        </tr>

            <>{props.appointments.map((appointment) => 
                <AppointmentInfo appointment={appointment} editButton={props.editButton} deleteButton={props.deleteButton} />
            )}</>
        
        </table>
    )
}

export default AppointmentList