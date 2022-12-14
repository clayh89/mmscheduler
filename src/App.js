// Henry Clay December 2022 
// mmScheduler app 
// a basic demo of a CRUD scheduler app in vanilla React (no libraries!)

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
      appointments: [], 
      newDate: '', newTime: '', newPlace: '', newDescription: '', newKey: '',
      appointmentIndex: 1, 
      inputMode: false,
    }
  }

  ///////////////////////////////////////////////////////
  // form handler functions
  ///////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////
  // CRUD functions
  ///////////////////////////////////////////////////////

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

  // this deletes by key! short n sweet. gets called via a button on the grand-child component
  deleteAppointment = (index) => {
    this.setState({
      appointments: this.state.appointments.filter(appointment => appointment.key !== index )
    });
  }

  ///////////////////////////////////////////////////////
  // Mode toggle functions (also handle buffer logic)
  ///////////////////////////////////////////////////////

  // this gets the form and key info set up to do an edit.
  //  gets called via a button on the grand-child component
  // not actually the thing that does the operation, just sets up the form 
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

  // lets you swap between listing the appointments and making a new one
  // this was a very basic toggle for testing before I realized it was kinda essential 
  // so now it clears the input buffer state so that you don't get stuck ediitng
  // original version:  
  /* 
  this.setState({
        inputMode: !this.state.inputMode
      })
  */
  // but if we're doing flow controls anyway that's one less evaluation 
   toggleInputMode = () => {
    if (this.state.inputMode) {
      this.setState({
        newDate: '', newTime: '', newPlace: '', newDescription: '', newKey: '', inputMode: false
      })
    } else (
      this.setState({
        inputMode: !this.state.inputMode
      })
    )
  }

  render() {
    const inputMode = this.state.inputMode; 
    return (
      <div className="App">
        <header className="App-header">
          <h1>Appointment Viewer & Scheduler</h1>
          <p>In person hours are 8:00 AM to 9:00 PM. </p>
          <p>We're currently scheduling through the end of 2023. </p>
          <p>All times are in the time zone of the respective clinic. </p>
          
        </header>
        
        <>  
          {inputMode ? ( // conditional for toggle-divs
            <div className = 'Toggle-container'>
              <div className = 'Toggle-1' onClick={(() => this.toggleInputMode())}><h3 className='off'>View Appointments</h3></div>
              <div className = 'Toggle-2'><h3 className='selected'>New/Edit Appointment</h3></div> 
            </div> )
            : (
              <div className = 'Toggle-container'>
              <div className = 'Toggle-1' ><h3 className='off'>View Appointments</h3></div>
              <div className = 'Toggle-2' onClick={(() => this.toggleInputMode())}><h3 className='selected'>New Appointment</h3></div> 
            </div> 
            )}
        </>
    
        {inputMode
          // ternary is kinda weird for this much code - this was originally a two-liner but it works a lot better with the form in this 
          // component. so, pardon the weirdness. 
          ? (
            
            <div className = 'Form-Holder'>
            <form onSubmit={this.handleSubmit}>        
                <label>
                    Date: 
                    <input id='date' name='newDate' type="date" onChange={this.handleInputChange} value={this.state.newDate} min="2022-12-07" max="2023-12-31" required/>        
                </label>
                <br />
                <label>
                    Time: 
                    <input id='time' name='newTime' type="time" onChange={this.handleInputChange} value={this.state.newTime} step='900' min='08:00' max='21:00' required/>        
                </label>
                <br />
                <label>
                    Location: 
                    <select id='place' name='newPlace' onChange={this.handleInputChange} value={this.state.newPlace} required>            
                      <option value="" disabled></option>
                      <option value="London">London</option>
                      <option value="Orlando">Orlando</option>
                      <option value="Portland">Portland</option>
                      <option value="Seattle">Seattle</option>
                      <option value="San Diego">San Diego</option>
                    </select>      
                </label>
                <br />
                <label>
                    Notes {'(optional)'} :
                    <textarea id='description' name='newDescription' onChange={this.handleInputChange} value={this.state.newDescription} />        
                </label>
                <br />
                <input id='submit' type="submit" value="Submit" className='input-button' />
            </form>
          </div>)

          : <AppointmentList appointments={this.state.appointments} editButton={this.editAppointment} deleteButton={this.deleteAppointment} />
        }

        
      </div>
    );
  }
}

export default App;
