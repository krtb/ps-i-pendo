var axios = require('axios');
var _ = require('lodash');

// Global Variables
var timer = milliseconds => new Promise(response => setTimeout(response, milliseconds))

// Quirks with using module.exports, when modules circularly depend on each other.
// It is recommended against replacing the object.
// For multiple exports at once, using object literal definition, implement the below
// The exports object is created for your module before your module runs, 
// and if there are circular dependencies, other modules may have access to that default object before your module can fill it in. 
// If you replace it, they may have the old, original object, and not (eventually) see your exports. 
// If you add to it, then even though the object didn't have your exports initially, eventually it will have it, even if the other module got access to the object before those exports existed.
// https://nodejs.org/api/modules.html#modules_cycles

Object.assign(module.exports, 
  { 
    /**
      * Delay requests made to an API Endpoint in order avoid throttling by server.
      * @param {array} itemsToSendArray - Array of items to perform CRUD actions on.
      * @param {string} axiosURL - URL where request should be sent.
      * @param {object} axiosData - Data object required by specificied endpoint.
      * @param {object} axiosConfig - Axiox configuration options object.
      * @param {object} req - Express middleware method.
      * @param {object} res - Express middleware method.
      * @param {object} next - Express middleware method.
      */
    throttledPostRequest: async (itemsToSendArray, axiosURL, axiosData, axiosConfig, req, res, next) => {
      let timeToDelayInSeconds = 1000;
      let itemsToSendArray = itemsToSendArray;
      let axiosURL = '';
      let axiosData = {
        'query': query,
        'variables': itemsToSendArray[i]
      };
      let axiosConfig = {
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `${process.env.MONDAY_APIV2_TOKEN_KURT}` 
        },
      };

      let startingRequestsMessage = `*** Starting Requests ***`;
      let timeOutCaughtErrorMessage = `There was an error in throttledPostRequest() `;
      let successItemCreatedMessage = `...Success, Item Created`
      let comepltedRequestMessage = `*** Completed Requests ***`;


      console.log(startingRequestsMessage);
      for (var i = 0; i <= itemsToSendArray.length - 1; i++) {

        console.log(`Working on item ${i} of ${itemsToSendArray.length - 1}...`)
    
        axios.post(axiosURL, axiosData, axiosConfig)

        .then((response)=>{

          if(response.data){
            let responseFromItemSent = response.data
            console.log(responseFromItemSent, successItemCreatedMessage);
          }

          next();
        })

        .catch((error)=> {

          if( error.response ){
            console.log(error.response.data);
            console.log(timeOutCaughtErrorMessage + error);
          };

        })

        /** Timeout set to pause requests, when timeout completes loop through next item. */
        await timer(timeToDelayInSeconds);
      }
      console.log(comepltedRequestMessage);
        
      return;
    }
  }
);