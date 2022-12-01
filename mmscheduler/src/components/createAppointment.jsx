import React from "react";

class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: '', time: '', location: '', description: 'Appointment Notes'}
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // add to parent appointment array
        event.preventDefault();
      }

      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: value    });
      }

    render() {
        return (     
            <div>
                <form onSubmit={this.handleSubmit}>        
                    <label>
                        Date:
                        <input type="date" value={this.state.date} onChange={this.handleInputChange} min="2023-01-01" max="2099-12-31"/>        
                    </label>
                    <label>
                        Time:
                        <input type="time" value={this.state.time} onChange={this.handleInputChange} />        
                    </label>
                    <label>
                        Location:
                        <select value={this.state.value} onChange={this.handleInputChange}>            
                          <option value="London">London</option>
                          <option value="Orlando">Orlando</option>
                          <option value="Portland">Portland</option>
                          <option value="Seattle">Seattle</option>
                          <option value="San Diego">San Diego</option>
                        </select>      
                    </label>
                    <label>
                        Description:
                        <textarea value={this.state.value} onChange={this.handleInputChange} />        
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
        
}