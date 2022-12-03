import React from "react";
import AppointmentInfo from "./AppointmentInfo";

// move this to App.js? 
// change name from listAppointsments to AppointmentList
// editItem={props.editItem()} deleteItem={props.deleteItem()}
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
                <AppointmentInfo appointment={appointment} />
            )}</>
        
        </table>
    )
}

export default AppointmentList