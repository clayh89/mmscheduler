import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppointmentList from './components/AppointmentList';
import CreateAppointment from './components/CreateAppointment';

// state should live here 

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
  
  function newAppointment(date, time, place, description){

    appointment = {
      'date': date,
      'time': time,
      'place': place,
      'description': description
    }
  
}
*/


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {appointment:
      [{'date': '2022-10-11',
      'time': '12h20m',
      'place': 'London',
      'description': 'Physical',
      'index': 0}], 
      newAppointment: 
      { date: '', time: '', place: '', description: 'Appointment Notes',
      },
      inputMode: false,}
}

deleteAppointment = (index) => {
  this.setState({

  });
}

createAppointment = (index) => {
  this.setState({

  });
}

updateAppointment = (index) => {
  this.setState({

  });
}

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
      {inputMode
        ? <CreateAppointment />
        : <AppointmentList appointments={this.state.appointment} deleteAppointment={this.deleteAppointment} />
      }
     
      
    </div>
  );
  }
}
//
export default App;
