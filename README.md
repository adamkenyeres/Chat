# Chat application

Real time chat application built with Node.js backend, React.js frontend and socket.io for real time communication.

## Features

* Information when users connect/disconnect.
* Change usernames.
* Message history.
* Statistics: Who is online.
* Typing is shown to other chatroom members.


## Installing
First of all make sure Node and npm are installed.

1. Clone or download the repository:

    ```
    $ git clone https://github.com/adamkenyeres/Chat.git
    $ cd Chat
    ```
2. Install the dependencies for node and react:

    ```
    $ npm install
    $ cd client
    $ npm install
    ```
3. Start the server (from root directory):

    ```
    $ npm start server
    ```
4. Start React the frontend:
    ```
    $ cd client
    $ npm start
    ```

You should be able to access the application via http://localhost:3000/.

## Running the tests

### Server

Automated tests had been written with mocha and chai.

Server related test files are located under ./test

Running the tests:
```
$ npm test
 ```

### Client

Automated tests had been written with Jest and Enzyme.

Client related test files are located next to each component.

Running the tests:
```
$ cd client
$ npm test
 ```
 ## Contributing
 
 If you are interested in contributing please create an issues and request pullrequests. 
