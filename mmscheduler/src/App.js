//import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppointmentList from './components/AppointmentList';
import CreateAppointment from './components/createAppointment';
import NewEditAppointment from './components/NewEditAppointment';

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
      newDate: '', newTime: '', newPlace: '', newDescription: '', newKey: '',
      appointmentIndex: 1, 
      inputMode: false,
    }
}


// form input handler 
// gets relevant info from the event that called it 
// which gets managed here 
handleInputChange(event) {
  const target = event.target;
  // check for date vs text... but idk if this actually matters since it gets dumped as text
  /*
  if (target.type === 'date') {
    {something}
  }
  else {
    const value = target.value;
  }
  */
  // since both time and date inputs dump strings, this shoudl Just Work
  const value = target.value;
  const name = target.name;
  this.setState({
    [name]: value    
  });
}
// form submission handler
// rather than actually submitting the form we need to update the state array 
handleSubmit = (event) => {
  // block submission
  event.preventDefault();
  // create/update function - newID is typically 1 more than there are appointments, but it gets set to an existing one
  // to overwrite
  this.updateAppointment(this.state.newKey)
  // refreshes form state vals
  this.setState({
    newDate: '', 
    newTime: '', 
    newPlace: '', 
    newDescription: '',
    newID: this.state.appointmentIndex
  })
}

// updates appointment info for appointments array @ a given key 
// if there's no appointment at the index (tracked @ app level), then an appointment is created
// otherwise, the old version is removed and replaced with the updated version 
updateAppointment(index){
  // create the new/updated appointment object
  // index will typically be AppointmentIndex but it might be an existing one
  const newAppointment = {
    'date' : this.state.newDate,
    'time' : this.state.newTime,
    'place' : this.state.newPlace,
    'description' : this.state.newDescription,
    'key': index
  }
  // remove any matching ID appointments from the list (no hits for new appointment, 1 hit for updated)
  // then adds the newly created one at the end. replacing or just creating if it's new
  const newList = [...this.state.appointments.filter(appointment => appointment.key !== index), newAppointment]
  //updates state 
  this.setState({
    appointments: newList
  });
  // conditionally increments the index - based on the assigned value because if it's lower it won't trigger, if it's higher it updates to it,
  // and if its the same (new item), it increments
  if (this.state.newID >= this.state.appointmentIndex) {
    const newIndex  = this.state.newID + 1 
    this.setState({
      appointmentIndex : newIndex
    })
  }
}

// this is sort of a specialized toggle - swaps and gets the old info ready, but actually doing the DB op is another function
editAppointment = (index) => {
  
  const target = this.state.appointments.filter(appointment => appointment.key === index)[0]
  
  this.setState({
    newDate : target.date,
    newTime : target.time,
    newPlace : target.place, 
    newDescription : target.description,
    newID : target.ID,
    inputMode: true, 
  
  });
}

// this deletes by id! short n sweet. gets called by the grand-child component
deleteAppointment = (index) => {
  this.setState({
    appointments: this.state.appointments.filter(appointment => appointment.ID !== index )
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

        ? <NewEditAppointment date={this.state.newDate} time={this.state.newTime} place={this.state.newPlace} description={this.state.newDescription} key={this.state.newID} handleSubmit={this.handleSubmit} />
        //? <CreateAppointment date={this.state.newDate} time={this.state.newTime} place={this.state.newPlace} description={this.state.newDescription} />
        : <AppointmentList appointments={this.state.appointments} editButton={this.editAppointment} deleteButton={this.deleteAppointment} />
      }
     
      
    </div>
  );
  }
}

export default App;
