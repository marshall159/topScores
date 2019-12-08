## Run Server:

Ensure you have [Node.js](https://nodejs.org) version 10+ installed

Install dependencies:
```
$ npm install
```

Start server using:
```
$ npm start
```
Tests can be run using:
```
$ npm test
```

Code coverage can be run using: 
```
$ npm run coverage
```

## Design:

A Test-Driven Development approach was followed throughout which naturally helped the design to be modular, cohesive and loosely coupled

Project was split into a server responsible for registering routes, controllers to process requests and model responsible for business logic

Validation controller middleware was used to check the incoming request to submit an entry and if invalid short circuit the response to return a 400. On valid requests the validation middleware passed responsibility to check the palindrome to the next controller. This was responsible for calling the model which had sole knowledge of the logic of calculating and updating the scores


A simple CI pipeline with Travis was utilised. Two levels of testing were implemented: unit and end-to-end. Unit tests covered everything and were isolated using mocks as required. End-to-end tests were used to confirm that the service delivered the correct result from initial request to final response. 100% code coverage was achieved successfully

Mocha was used as the test runner, Chai for assertions and Sinon for test doubles. Supertest to test each endpoint and code coverage was determined using Istanbul

## Further steps:

* A database such as MongoDB for persistence layer
* A more efficient/optimised data structure and/or sorting algorithm for scores as Scores is mutated every time scores are retrieved
* Add logging middleware using Morgan
* Containerise the service using Docker to allow for environment standardisation and facilitate later deployment
* Utilise a process manager to coordinate the service and avoid downtime
* Scale out the service horizontally with multiple instances 
* Load balance across instances using a Proxy server
* Uptime monitor to determine health of server(s)
* Stress test the service to give confidence it can handle many simultaneous requests

A solid choice would be Kubernetes as a container orchestration tool which would allow us to achieve most of the above