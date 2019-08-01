This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App details
Start both server and client with `npm start` in the top level.

MERN stack example based on create-react-app

### Axios
Axios is a promise-based HTTP client used to post to MongoDB. Make XMLHttpRequests from the browser. Removes necessity of .json() in fetch methods.
**What is with the underscore when finding data to update?**
```
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    idToUpdate = parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id; // what is with this underscore??
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };
```

### Fetch
Fetch is a JavaScript native command to fetch data from a url. Known as a replacement for XMLHttpRequests.

```
fetch(url) // Call the fetch function passing the url of the API as a parameter
.then(function(data) {
    // Your code for handling the data you get from the API
    data.json()
})
.catch(function() {
    // This is where you run code if the server returns any errors
});
```

### Cors
The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin. It helps isolate potentially malicious documents, reducing possible attack vectors. Two URLs have the same origin if the protocol, port (if specified), and host are the same for both. You may see this referenced as the "scheme/host/port tuple", or just "tuple". 

Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.

```
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
```

Enabling cors permits routes to cross scheme/host/port when fetching resources. It adds the following to HTTP headers: `Access-Control-Allow-Origin: *`. You can restrict cors by host as well.

### Express
Express provides HTTP utility methods. Quickens HTTP API development. This includes the Express Router.
* Routing refers to how an application’s endpoints (URIs) respond to client requests. 
* Permits logging and other middleware on HTTP get/post/put etc

#### Express Router
This lets you add end points to push/pull data from the server in a modular form. Let's you break out functionality into separate modules.

```
const router = express.Router();

router.get('/testAPI', (req, res) => {
    res.send("API is working properly");
});
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
