import React from "react";

// this needs to be tied to the actual item it's deleting. context for the user's appointment list? that might be overkill though
// moving this to the display component
function DeleteAppointment() {
    
    return(
        <button onClick={deleteItem}> Delete
        </button>
    )
}

export default DeleteAppointment