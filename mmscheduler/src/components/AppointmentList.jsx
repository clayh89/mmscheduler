import React from "react";
import AppointmentInfo from "./appointmentInfo";

// move this to App.js? 
// change name from listAppointsments to AppointmentList

function AppointmentList(props) {
    
    return( 
        props.appointments.map((appointment) => 
            <AppointmentInfo date={appointment.date} time={appointment.date} location={appointment.date} description={appointment.date} />
        )
    )
}

export default AppointmentList