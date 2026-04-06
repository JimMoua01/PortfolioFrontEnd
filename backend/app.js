//////// App Server Module ////////

// Important variables for server interaction
import express from 'express';
import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();
const portNumber = process.env.PORT || 3000;
const directoryName = import.meta.dirname;
const frontEndDirectoryName = path.join(directoryName, '..', 'frontend');
const publicDirectoryName = path.join(frontEndDirectoryName, 'public');

// An array to hold project data on the server side.
let projectList = [];
const projectDataPath = path.join(directoryName, 'data/projectData.json');
const rawData = fs.readFileSync(projectDataPath);
projectList = JSON.parse(rawData);
console.log(projectList);

let contactList = [];

// Establishing a rate limit for the main web page.
const pagelimiter = rateLimit({ 
    windowMs: 2 * 60 * 1000, // 1 minutes
    max: 15, // Limit each IP to 15 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true // Return rate limit info in the `RateLimit-*` headers
});

app.use(cors());

// Serves the static files from the public folder
// app.use(express.static('public'));
app.use(express.static(path.join(directoryName)));
app.use(express.static(path.join(publicDirectoryName)));
app.use(express.static(path.join(frontEndDirectoryName)));
// app.use(express.static('dist'));

// Using statements for important express components
app.use(express.json({limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true}));

// The default route is the home page.
app.get('/', pagelimiter, (request, response) => {
    try {
        console.log("Default route was accessed.");
        response.send("Portfolio Project API")
    } catch (e) {
        console.error("Error in defining default route: ", e);
    }
});

// A get route for the contact information
app.get('/contactData', (request, response) => {
    try {
        console.log("Contact data has been accessed");
        response.json(contactList);
    } catch (e) {
        console.error("Error in recieving contact data from server: ", e);
        response.status(500).send("Error in retreiving contact info", e);
    }
});

// A post route for form submissions.
app.post('/contactData', (request, response) => {
    try {
        const newContact = request.body;

        const newId = contactList.length + 1;

        newContact.id = newId;

        contactList.push(newContact);
        console.log(`Form Submission:`);
        console.log(newContact);
        response.json(contactList);
    } catch (e) {
        console.error("Error in sending submission to server: ", e);
        response.status(500).send('Error in receiving form submission');
    }
});

// Creates a route to the project data that will be primarly used by the
// fetch fuction on the client-side.
app.get('/projectData', (request, response) => {
    try {
        console.log("Project data has been accessed");
        response.json(projectList);
    } catch (e) {
        console.error("Error in defining route for data fetching: ", e);
    }
});

// A post route for adding new project data to the server.
app.post('/projectData', (request, response) => {
    try {
        const newProject = request.body;

        const newId = projectList.length + 1;

        newProject.id = newId;

        projectList.push(newProject);
        console.log("New Project has been added to the project data.");
        console.log(request.body);
        response.json(projectList);
    } catch (e) {
        console.error("Error in defining route for data fetching: ", e);
        res.status(500).send('Error recieving project data');
    }
});

// Middleware to handle undefined routes
app.use((req, res, next) => {
    try {
        res.status(404).send('404 Error: Page not found');
    } catch (e) {
        console.error("Error in creating 404 error for undefined routes: ", e);
    }
});

// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Error: Internal Server Error');
});

// Starts the server.
app.listen(portNumber, () => {
    console.log(`Welcome! The Portfolio project server is running on port ${portNumber}`);
});