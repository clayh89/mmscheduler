import React from "react";
import { useState } from "react";

//deprecated

//functional version of appointment form
//template implementation: <NewEditAppointment date={''} time={''} place={''} description={''} handleSubmit={'function'} />
// I kinda like this - this is something I often want in React projects (a list of what props the functional component wants)

function NewEditAppointment(props) {

    const [date, setDate] = useState(props.date);
    const [time, setTime] = useState(props.time);
    const [place, setPlace] = useState(props.place);
    const [description, setDescription] = useState(props.description);

    return (     
        <div>
            <form onSubmit={props.handleSubmit}>        
                <label>
                    Date:
                    <input id='date' name='newDate' type="date" onChange={e => setDate(e.target.value)} value={date} min="2023-01-01" max="2099-12-31" required/>        
                </label>
                <label>
                    Time:
                    <input id='time' name='newTime' type="time" onChange={e => setTime(e.target.value)} value={time} step='15' min='9:00' max='5:00' required/>        
                </label>
                <label>
                    Location:
                    <select id='place' name='newPlace' onChange={e => setPlace(e.target.value)} value={place} required>            
                      <option value="London">London</option>
                      <option value="Orlando">Orlando</option>
                      <option value="Portland">Portland</option>
                      <option value="Seattle">Seattle</option>
                      <option value="San Diego">San Diego</option>
                    </select>      
                </label>
                <label>
                    Description:
                    <textarea id='description' name='newDescription' onChange={e => setDescription(e.target.value)} value={description} />        
                </label>
                <input id='submit' type="submit" value="Submit" />
            </form>
        </div>
    )
}

//

export default NewEditAppointment