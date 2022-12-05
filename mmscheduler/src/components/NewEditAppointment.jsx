import React from "react";

//functional version of appointment form
//template implementation: <NewEditAppointment date={''} time={''} place={''} description={''} handleSubmit={'function'} />
// I kinda like this - this is something I often want in React projects (a list of what props the functional component wants)

function NewEditAppointment() {

    return (     
        <div>
            <form onSubmit={props.handleSubmit}>        
                <label>
                    Date:
                    <input id='date' name='newDate' type="date" value={props.date} onChange={props.formInput} min="2023-01-01" max="2099-12-31" required/>        
                </label>
                <label>
                    Time:
                    <input id='time' name='newTime' type="time" value={props.time} onChange={props.formInput} step='15' min='9:00' max='5:00' required/>        
                </label>
                <label>
                    Location:
                    <select id='place' name='newPlace' value={props.place} onChange={props.formInput} required>            
                      <option value="London">London</option>
                      <option value="Orlando">Orlando</option>
                      <option value="Portland">Portland</option>
                      <option value="Seattle">Seattle</option>
                      <option value="San Diego">San Diego</option>
                    </select>      
                </label>
                <label>
                    Description:
                    <textarea id='description' name='newDescription' value={props.description} onChange={props.formInput} />        
                </label>
                <input id='submit' type="submit" value="Submit" />
            </form>
        </div>
    )
}

//

export default NewEditAppointment