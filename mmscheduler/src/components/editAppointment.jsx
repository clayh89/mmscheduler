import React from "react";

//functional version of appointment form
//template implementation: <NewEditAppointment date={''} formDate={'function'} time={''} formTime={'function'} place={''} formPlace={'function'} description={''} formDescription={'function'} handleSubmit={'function'} />
// I kinda like this - this is something I often want in React projects (a list of what props the functional component wants)

function NewEditAppointment() {

    return (     
        <div>
            <form onSubmit={props.handleSubmit}>        
                <label>
                    Date:
                    <input type="date" value={props.date} onChange={props.formDate} min="2023-01-01" max="2099-12-31"/>        
                </label>
                <label>
                    Time:
                    <input type="time" value={props.time} onChange={props.formTime} />        
                </label>
                <label>
                    Location:
                    <select value={props.place} onChange={props.formPlace}>            
                      <option value="London">London</option>
                      <option value="Orlando">Orlando</option>
                      <option value="Portland">Portland</option>
                      <option value="Seattle">Seattle</option>
                      <option value="San Diego">San Diego</option>
                    </select>      
                </label>
                <label>
                    Description:
                    <textarea value={props.description} onChange={props.formDescriptioj} />        
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

//

export default NewEditAppointment