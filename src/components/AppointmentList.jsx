import React from "react";
import AppointmentInfo from "./appointmentInfo";
import './appointments.css';
// builds an appointment table
// takes appointments object, maps it out w/ passed buttons from the parent (here, App.js)
// <AppointmentList appointments={{}} editButton={''} deleteButton={''}
function AppointmentList(props) {
    

    return( 

        <div className="Table-holder">
    
            <table className="Appointment-list">
                <> {props.appointments.length > 0 ?
                <tr>
                <th> </th>
           
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Notes</th>
                  
                  <th> </th>
                </tr>
                :  <tr>

                </tr> 
                // slightly hacky conditional here - hides table when no appointments
                } 
                </>

                <>{props.appointments.map((appointment) => 
                    <AppointmentInfo appointment={appointment} editButton={props.editButton} deleteButton={props.deleteButton} />
                )}</>
            
                    
            </table> 
        
        </div>
    )
}

export default AppointmentList