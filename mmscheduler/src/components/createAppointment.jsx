import React from "react";

// deprecated.. 

//right now this does state for each input but I could probably just do a submit handler instead... 
// so pull handle change, make handle submit pull from form and not component state
// <CreateAppointment date={this.state.newDate} time={this.state.newTime} place={this.state.newPlace} description={this.state.newDescription} />
class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: this.props.date, time: this.props.time, place: this.props.place, description: this.props.description}
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateNewAppointmentState({'date':this.state.date, 'time':this.state.time, 'place': this.state.place, 'description': this.state.description})
        // add to parent appointment array
        
      }

    // I... don't think this is quite right
      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value; 
        this.setState({
          [name]: value    });
      }

    render() {
        return (     
            <div>
                <form onSubmit={this.handleSubmit}>        
                    <label>
                        Date:
                        <input type="date" onChange={this.handleInputChange} min="2023-01-01" max="2099-12-31"/>        
                    </label>
                    <label>
                        Time:
                        <input type="time" value={this.state.time} onChange={this.handleInputChange} />        
                    </label>
                    <label>
                        Location:
                        <select onChange={this.handleInputChange}>            
                          <option value="London">London</option>
                          <option value="Orlando">Orlando</option>
                          <option value="Portland">Portland</option>
                          <option value="Seattle">Seattle</option>
                          <option value="San Diego">San Diego</option>
                        </select>      
                    </label>
                    <label>
                        Description:
                        <textarea onChange={this.handleInputChange} />        
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
        
}

export default CreateAppointment