## Architecture Overview

The app is a web-based application deployed on the heroku PaaS. The web interface is responsive and adapts to mobile devices. The app is designed to be tolerant of network outages and be offline capable.

## Key Tech Components

* Heroku platform as a service for the app server (runs on Amazon EC2)
* MySQL primary data store hosted via Amazon RDS
* RedisCloud for pub/sub messaging and backing socket.io
* node.js app server
  * express web framework
  * socket.io for pub/sub
  * knex.js and bookshelf for SQL modeling
* react, redux, immutable are the core front end libraries
* transit data exchange format between browser and server
* mailgun for outgoing email
* sentry for error capturing and tracking
* uploadcare for file/image upload and storage

## Code and Core Tooling

* ECMAScript 2016, 6, and 5 all used liberally
* JSX for react
* babel transpiler and webpack bundler

## Browser/Server Communication Model

Interactions are sent as a message passing protocol with transit as the data format. A "command pattern" design pattern is used with each data write encapsulated into an action or command object. These are identified by a unijue "type" name and contain arbitrary and command-specific payload data (typically just the data being changed).

## Near-Time Data Synchronization

Active browsers use socket.io to maintain a live connection to the server, and subscribe to socket.io rooms/channels relevant to the current user and screens that have been shown. When relevant data is updated on the server, changes are broadcast to all interested clients via socket.io events, processed against the local browser's data set, and rerender the UI to display the latest changes in near time.

## MySQL Relation Data Model Overview

MySQL is used as the main application data store. Some portions of the schema are in explicit tables and columns (job, account, company, etc), while the core job data set used for efficiency modeling uses an abstract Entity Attribute Value schema as defined by the `v4_*` tables.

Data types in MySQL are quite liberal, especially for job data where "invalid" user-entered strings need to be stored as typed by the user.
