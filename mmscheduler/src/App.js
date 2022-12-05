//import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppointmentList from './components/AppointmentList';
import CreateAppointment from './components/CreateAppointment';
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
      newAppointment: 
      { date: '', time: '', place: '', description: 'Appointment Notes',
      },
      newDate: '', newTime: '', newPlace: '', newDescription: '',
      appointmentIndex: 0, 
      inputMode: false,}
}

handleInputChange(event) {
  const target = event.target;
  // check for date vs text... but idk if this actually matters
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

// rather than actually submitting the form we need to update the state array 
handleSubmit(event) {
  // block submission
  event.preventDefault();
  // create new appointment (this handles indexing)
  this.createAppointment(this.newDate, this.newTime, this.newPlace, this.newDescription)
  // refreshes form
  this.setState({
    newDate: '', 
    newTime: '', 
    newPlace: '', 
    newDescription: ''
  })
  
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

// updates appointment info for appointments array @ a given key 
// this either Creates a new appointment, if the key is empty, or Updates the existing one if it
// is already present. takes the index to check which will be either the existing one's key, or 
// the globally incremented array index variable 
updateAppointment = (index) => {
  // create and update both involve basically a new object. update just shares the db position. 
  // the newVAL state should be set by the thing that calls this, we just assume it's correct. 
  const newAppointment = {
    'date' : this.state.newDate,
    'time' : this.state.newTime,
    'place' : this.state.newPlace,
    'description' : this.state.newDescription,
    'key': ''
  }

  // getting funky here. this needs to create or update an existing one 
  // so we need logic to find out what we're doing
  const target = this.state.appointments.filter(appointment => appointment.key == index) 
  // calling this ^ with an out of bounds key # (i.e. k > # of created appointments) will give you 0 hits. 
  // so 0 length array. otherwise the key should be unique and we expect 1 result
  
  // newAppointment already is set up, this assigns the key - 
  // if target.length is 0, then !0 will evaluate to true. otherwise, we assume we had a hit with the above
  if (!target.length) {
    newAppointment.key = index
    newIndex = index + 1 
    this.setState({
      appointmentIndex : newIndex
    })
  } else {
    newAppointment.key = target[0].key
  }
  // filters out target and then uses spread to add newly edited one (this disrupts order of keys) (which is fine)
  const newList = [...this.state.appointments.filter(appointment => appointment.key !== index), newAppointment]
  
  this.setState({
    appointments: newList
  });
    //grabs selected appointment as target - needs the [0] as filter returns an array
    //const target = this.state.appointments.filter(appointment => appointment.key == index)[0] 
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

// this deletes by id! short n sweet. gets called by the grand-child component
deleteAppointment = (index) => {
  this.setState({
    appointments: this.state.appointments.filter(appointment => appointment.key !== index )
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

        ? <NewEditAppointment date={this.state.newDate} time={this.state.newDate} place={this.state.newDate} description={this.state.newDate} formInput={this.handleInputChange} handleSubmit={'function'} />
        //? <CreateAppointment date={this.state.newDate} time={this.state.newTime} place={this.state.newPlace} description={this.state.newDescription} />
        : <AppointmentList appointments={this.state.appointments} editButton={this.editAppointment} deleteButton={this.deleteAppointment} />
      }
     
      
    </div>
  );
  }
}
//editItem={this.editAppointment} deleteItem={this.deleteAppointment}
export default App;
