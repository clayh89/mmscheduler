import logo from './logo.svg';
import './App.css';
import AppointmentList from './components/AppointmentList';
import CreateAppointment from './components/CreateAppointment';
import AppointmentInfo from './components/appointmentInfo';

// state should live here 

/*




 state = {
    appointments: {},
    appointmentIndex: 0,
  }

  newAppointment = (appointment) => {
    appointment.index = state.appointmentIndex;
    this.appointments.push(appointment)
  }

      <div>
        <AppointmentList></AppointmentList>
        <CreateAppointment updateState={this.newAppointment}></CreateAppointment>
      </div>
*/




function App() {

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
  



  return (
    <div className="App">
      <header className="App-header">
        <h1>Appointment Viewer & Scheduler</h1>
        <p>In person hours are 8:00 AM to 9:00 PM in the clinic's local time zone. </p>
          <p>Our telehealth services are available at all other times - just select one outside the window</p>
        
      </header>

      <div>
        <AppointmentInfo appointment={appointment}/>
      </div>
    </div>
  );
}

export default App;
