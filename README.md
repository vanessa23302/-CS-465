# CS 465 Full Stack Development Project Reflection

## Architecture

Throughout this project I worked with multiple types of frontend development approaches. Early in the course, Express served HTML pages that were rendered from the server. This method delivered complete pages each time a user navigated to a different section. JavaScript was then used to add interactivity and dynamic behavior to the application. Later, the project transitioned into a single page application using Angular. The SPA allowed content to update dynamically without reloading the entire page, which improved performance and user experience. Angular also allowed reusable components, which made the application easier to maintain and expand.

The backend used a NoSQL MongoDB database because it works naturally with JavaScript based applications. MongoDB stores data in flexible JSON like documents instead of rigid tables, which made it easier to manage trip data and modify the structure as the application evolved. This flexibility supported rapid development and aligned well with the full stack JavaScript environment.

## Functionality

JSON is different from JavaScript because JavaScript is a programming language while JSON is a lightweight data format used for transferring information. In this project, JSON acted as the connection between the frontend and backend. The Angular client sent requests to the Express API, and the server responded with JSON data that the interface could display to users.

During development, several areas of the application were refactored to improve functionality and efficiency. API routes and controller logic were cleaned up to reduce duplication, and reusable UI components such as the trip card helped standardize how data was displayed. Reusable components improved maintainability, reduced repeated code, and made updates easier across the entire application.

## Testing

Testing played an important role in verifying that the application worked correctly. Different HTTP methods such as GET, POST, PUT, and DELETE were used to retrieve, create, update, and remove data through API endpoints. Postman was used to manually test these endpoints and confirm that data was being processed correctly.

After security was added, testing became more complex because secured endpoints required authentication. JWT authentication required an authorization header containing a valid token before access was granted. Testing helped confirm that unauthorized users received proper error responses while authorized users could successfully access protected routes. This demonstrated how security layers impact API testing in real world applications.

## Reflection

This course helped me better understand the complete full stack development lifecycle from planning and design to implementation, testing, and security. Building a working application that connects a frontend interface, backend server, and database helped me see how each layer depends on the others. Implementing authentication and securing endpoints gave me experience with industry practices that are important for modern web applications.

Through this project I developed stronger skills in JavaScript, Angular, Node.js, Express, MongoDB, API development, debugging, and version control using GitHub. The Module Eight reading discussed how full stack developers are highly valued because they understand both client side and server side development. Completing this project helped me build those broad skills and increased my confidence in applying them professionally. This experience has helped move me closer to my career goals by giving me practical development experience that I can include in my professional portfolio.
