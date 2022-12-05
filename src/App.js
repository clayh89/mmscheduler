import React from 'react';
import './App.css';
import AppointmentList from './components/AppointmentList';
// This is the actual app. 
// Child components for display features (where data is flowing down) but the form was happier living here
// Implements Create and Update based on whether there's an existing appointment w/ that key/ID 
// Simple display - just lists apps (when this is toggled). Delete per item from display view  
// This ended up as a class when I probably could have used hooks - my rationale was that I needed to do more lifecycle updates 
// (this did not bear out), and then later that there would be a lot of state declarations, which I didn't love. 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments: [{'date': '2022-10-11', 'time': '12h20m', 'place': 'London', 'description': 'Physical', 'key': 0}], 
      newDate: '', newTime: '', newPlace: '', newDescription: '', newKey: '',
      appointmentIndex: 1, 
      inputMode: false,
    }
  }

  // form input handler 
  // gets relevant info from the event that called it 
  // which gets managed here 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value    
    });
  }

  // form submission handler - does array operations instead of sending the actual form
  handleSubmit = (event) => {
    event.preventDefault();
    // create/update function - newKey is typically 1 more than there are appointments, but it gets set to an existing one
    // to overwrite, then calls function
    this.updateAppointment(this.state.newKey)
    // refreshes form state vals
    this.setState({
      newDate: '', 
      newTime: '', 
      newPlace: '', 
      newDescription: '',
      newKey: this.state.appointmentIndex,
      inputMode : false
    })
  }

  // updates appointment info for appointments array @ a given key 
  // if there's no appointment at the index (tracked @ app level), then an appointment is created
  // otherwise, the old version is removed and replaced with the updated version 
  updateAppointment = (index) => {
    // create the new/updated appointment object
    // index will typically be AppointmentIndex but it might be an existing one
    const newAppointment = {
      'date' : this.state.newDate,
      'time' : this.state.newTime,
      'place' : this.state.newPlace,
      'description' : this.state.newDescription,
      'key': index
    }
    // remove any matching key appointments from the list (no hits for new appointment, 1 hit for updated)
    // then adds the newly created one at the end. replacing or just creating if it's new
    const newList = [...this.state.appointments.filter(appointment => appointment.key !== index), newAppointment]
    
    // conditionally increments the index - based on the assigned value because if it's lower it won't trigger, if it's higher it updates to it,
    // and if its the same (new item), it increments
    if (this.state.newKey >= this.state.appointmentIndex) {
      const newIndex  = this.state.newKey + 1 
      this.setState({
        appointmentIndex : newIndex,
        appointments: newList
      })
    }
    else (
       // originally this was a conditional setState for the index after the list update. I think this is an optimization if both get called
      // more often than just the 1? but React might be smarter than I'm trying to be here (and it works fine the other way)
      this.setState({
        appointments: newList
      })
    )
  }

  // this gets the form and key info set up to do an edit. 
  editAppointment = (index) => {

    const target = this.state.appointments.filter(appointment => appointment.key === index)[0]

    this.setState({
      newDate : target.date,
      newTime : target.time,
      newPlace : target.place, 
      newDescription : target.description,
      newKey : target.key,
      inputMode: true, 
    
    });
  }

  // this deletes by key! short n sweet. gets called by the grand-child component
  deleteAppointment = (index) => {
    this.setState({
      appointments: this.state.appointments.filter(appointment => appointment.key !== index )
    });
  }

  // lets you swap between listing the appointments and making a new one
   toggleInputMode = () => {
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
          // conditional left over from when the form was a child component 
          // this works better but pardon the ternery 
          ? (<div>
            <form onSubmit={this.handleSubmit}>        
                <label>
                    Date:
                    <input id='date' name='newDate' type="date" onChange={this.handleInputChange} value={this.state.newDate} min="2023-01-01" max="2099-12-31" required/>        
                </label>
                <label>
                    Time:
                    <input id='time' name='newTime' type="time" onChange={this.handleInputChange} value={this.state.newTime} step='15' min='9:00' max='5:00' required/>        
                </label>
                <label>
                    Location:
                    <select id='place' name='newPlace' onChange={this.handleInputChange} value={this.state.newPlace} required>            
                      <option value="London">London</option>
                      <option value="Orlando">Orlando</option>
                      <option value="Portland">Portland</option>
                      <option value="Seattle">Seattle</option>
                      <option value="San Diego">San Diego</option>
                    </select>      
                </label>
                <label>
                    Description:
                    <textarea id='description' name='newDescription' onChange={this.handleInputChange} value={this.state.newDescription} />        
                </label>
                <input id='submit' type="submit" value="Submit" />
            </form>
          </div>)

          : <AppointmentList appointments={this.state.appointments} editButton={this.editAppointment} deleteButton={this.deleteAppointment} />
        }


      </div>
    );
  }
}

export default App;
