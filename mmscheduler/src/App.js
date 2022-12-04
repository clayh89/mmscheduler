//import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppointmentList from './components/AppointmentList';
import CreateAppointment from './components/CreateAppointment';

// This is the actual app. 
// Child components for various features i.e. list display, appointment creation form
// toggle w/ state to display one or the other. 
// App logic lives here entirely to simplify state updates. The functions are passed to children. 
// Class rather than function because there's a lot going on here to implement w/ hooks 

/*
const appointments = [
    {'date': '2022-10-11',
    'time': '12h20m',
    'place': 'London',
    'description': 'Physical',
    'index': 0,}
  ]

  const appointment = 
    {'date': '2022-10-11',
    'time': '12h20m',
    'place': 'London',
    'description': 'Physical',
    'index': 0,}
  
}
*/


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {appointments:
      [{'date': '2022-10-11',
      'time': '12h20m',
      'place': 'London',
      'description': 'Physical',
      'key': 0}], 
      newAppointment: 
      { date: '', time: '', place: '', description: 'Appointment Notes',
      },
      newDate: '', newTime: '', newPlace: '', newDescription: '',
      appointmentIndex: 0, 
      inputMode: false,}
}

// this deletes by id! short n sweet
deleteAppointment = (index) => {
  this.setState({
    appointments: this.state.appointments.filter(appointment => appointment.key !== index )
  });
}

// this pulls the global index and updates it by 1. 
// kinda jank but adequate for this particular (demo) application
createAppointment = (date, time, place, description) => {
  const newAppointment = {
    'date' : date,
    'time' : time,
    'place' : place,
    'description' : description,
    'key': this.state.appointmentIndex
  }
  const newIndexPosition = this.state.appointmentIndex + 1
  this.setState({
    appointments: [...this.state.appointments, newAppointment ],
    appointmentIndex: newIndexPosition
  });
}

// this does the actual changes for the edit. 
// constructs new array via filter method, removing selected obj and then adding a new one w/ the same key 
// order gets messed up but thats why we have keys instead of doing it by array location in the first place
updateAppointment = (index) => {
  //grabs selected appointment as target
  const target = this.state.appointments.filter(appointment => appointment.key == index)[0]

  const newAppointment = {
    'date' : this.state.newDate,
    'time' : this.state.newTime,
    'place' : this.state.newPlace,
    'description' : this.state.newDescription,
    'key': target.key
  }
  // filters out target and then uses spread to add newly edited one (this disrupts order of keys) (which is fine)
  const newList = [...this.state.appointments.filter(appointment => appointment.key !== index)[0], newAppointment]
  
  this.setState({
    appointments: newList
  });
}

// this is sort of a specialized toggle - swaps and gets the old info ready, but actually doing the DB op is another function
editAppointment = (index) => {
  
  const target = this.state.appointments.filter(appointment => appointment.key == index)[0]
  
  this.setState({
    newDate : target.date,
    newTime : target.time,
    newPlace : target.place, 
    newDescription : target.description,
    inputMode: true, 
  
  });
}

// lets you swap between listing the appointments and making a new one
 toggleInputMode() {
  this.setState({
   inputMode: !this.state.inputMode
  });
}

render() {
  const inputMode = this.state.inputMode; 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Appointment Viewer & Scheduler</h1>
        <p>In person hours are 8:00 AM to 9:00 PM in the clinic's local time zone. </p>
        <p>Our telehealth services are available at all other times - just select one outside the window</p>
      </header>
      <button onClick={(() => this.toggleInputMode())}>{inputMode? 'View':'New'}</button>
      {inputMode
        ? <CreateAppointment date={this.state.newDate} time={this.state.newTime} place={this.state.newPlace} description={this.state.newDescription} />
        : <AppointmentList appointments={this.state.appointments} editButton={this.editAppointment} deleteButton={this.deleteAppointment} />
      }
     
      
    </div>
  );
  }
}
//editItem={this.editAppointment} deleteItem={this.deleteAppointment}
export default App;
