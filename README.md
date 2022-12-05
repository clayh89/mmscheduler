## React App for mmScheduler

A scheduling app developed in vanilla React. 

The user can: 
Create appointments 
Retrieve (list) appointments
Update (edit) appointments
Delete (cancel) appointments 

For each appointment, there should be a date, time, location, and description.
    Location should be a dropdown/select with the following options: San Diego, Portland, Seattle, London, and Orlando.


The data is not persistent as it lives in the frontend. However, it would be easy to hook up to a more permanent backend 

The app was initialized with create-react-aopp 

My first move was to make pages for each CRUD operation. This seemed like it would work smoothly - each one could edit the db-type-thing I'd hack together in a parent state. 

This didn't totally work, in practice - coding, I ran into obvious optimizations moving things around, and I eventually decided I'd have the main App.js state handle it all. 

I like this better - delete doesn't need a page (I'm thinking in routes but don't need it here) and edit is just a kind of specialized instance of create,  from a front end perspective. 

This does mean I need some sort of index tracking, though. 

Using a state toggle to swap between an input and a list

Tried a bunch of things - state worked much smoother w/ the form living in App.js vs a component. I could have looked into memoization and blocking re-renders but this seemed simpler for what ultimately didn't need that technical of a solution. 