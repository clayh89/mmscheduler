## React App for mmScheduler

A scheduling app developed in vanilla React. The app was initialized with create-react-aopp 

#### The user can: 
- Create appointments 
- Retrieve (list) appointments
- Update (edit) appointments
- Delete (cancel) appointments 

For each appointment, there should be a date, time, location(San Diego, Portland, Seattle, London, or Orlando), and description.

The data is not persistent as it lives in the frontend. However, it would be easy to hook up to a more permanent backend. In general, there
are a lot of kludgy-type choices made with data handling because we're doing it in a single page react app hosted on github instead of a more
robust back-end. I realize that's the point of the excercise, just wanna say. 

### Dev Log

My first move was to make pages for each CRUD operation. This seemed like it would work smoothly - each one could edit the db-type-thing I'd hack together in a parent state. In practice, I ran into obvious optimizations moving things around, and I eventually decided I'd have the main App.js state handle it all. 

I like this better - delete doesn't need a page (I'm thinking in routes but don't need it here) and edit is just a kind of specialized instance of create, from a front end perspective. 

The main challenge turned out to be passing child state to parents (which, usually means I need to re-think my component flow). I considerd memoization and refs but ultimately KISS'd it by moving the stuff that needed to pass the state to the level it needed to be at. This meant less component code (less code-reuse to show off, I guess) but a more functional app. Again, though, I'm sort of in an MVP-type headspace designing this and with more time to focus on the details, there's probably a way to break up the App.js 

This will get deployed on github, and styled a bit more! It's not terrible but it could be sleeker. 

Further improvements: 
 - a real backend 
 - time zone handling for appointments. right now it doesn't come up but it would be nice to display to/from UTC 
 - logic unit tests. tests were done by hand in browser (as front end integration was the priority) but we could validate some logic too