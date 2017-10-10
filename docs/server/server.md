# Server Structure

The server is an express.js web application server handling:

- a few full-page renders of key initial site templates
- some HTTP API calls
- a websocket message exchange protocol

# Server-side Rendered Templates

Some pages outside the main app (like login, forgot password, etc) are rendered as server side templates.

- EJS is the template language
- The EJS view fields live in the `views/dev` directory
- These are rendered as normal express views with dynamic locals and `res.render()`

# Client<->Server Protocol

Once the single-page application is loaded after user login, no further server side rendering will be done.

## Loading new data for read-only navigation

As the user clicks around the app, to load new data, a socket.io message is sent to the server named `NAVIGATE`. The server will respond with transit-encoded data payload as well as managing socket.io room subscriptions for real-time notifications.

## Submitting New Data for Write Operations

When doing create/update/delete operations, the client will send an AJAX HTTP POST request to the unified `/api` endpoint URL. The request body is JSON and structured similar to the client side action architecture where each message has a `type` string functioning as a unique identifier and a payload. The shape of the payload varies as needed for the semantics of each given action.

These messages flow through the server code as follows:

- A single express route handler in `server/src/server.js` receives them all
- requests are then dispatched to `api-middleware.js`, which handles initial validation (generic sanity check of the body shape)
- most code along this path will now `switch` based on `action.type` to run the correct code
- then `post-action.js` coordinates the main processing
  - `upgradeAction` for some standard pre-processing
  - `validatePermissions` checks application level authorization
  - `validateAction` does input validation on the payload
  - `executeAction` delegates to the matching action handler function from `action-handlers.js`
- Each action handler does the primary business logic processing and returns a value which becomes the HTTP response body
- There is also some 'broadcast' plumbing available for any actions that need real time pub/sub notifications
