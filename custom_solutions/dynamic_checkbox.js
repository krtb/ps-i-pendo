(function restrictGlobalVariables(window, document) {
  // Note: Outer scope variables used in below functions,
  // String naming should be set in the HTML Input element.
  let divWithCheckboxes = 'my_checkboxes'
  let dataAttributeString = 'data-guide-id'
  //----------------------------------------------------
  let pendoGuidesInProd = pendo.guides;
  let listOfGuideIDsOnly = [];
  let myCurrentGuideAndCheckboxesArray = [];
  
  {

    /**
      * Remove inner html children from a div HTMLColleciton object.
      * @param { String } divWithCheckboxes - The class name of the divs being passed in
      * @return { Array <objects> } onlyInnerDivHTMLElements - An array of HTML objects, from each div Class 
      */
    function transformHTMLCollectionToArray(divWithCheckboxes){
      let divObj = document.getElementsByClassName(divWithCheckboxes)
      
      let onlyInnerDivHTMLElements = [];
      /**
       * An HTMLCollection in the HTML DOM is live; it is automatically updated when the underlying document is changed. 
       * For this reason it is a good idea to make a copy (eg. using Array.from) 
       * to iterate over if adding, moving, or removing nodes.
       * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
      */
      // Note: Shallow copy in order to include nested objects.
      let aCopyOfHTMLCollectionOfObjects = divObj //Note: Will contain multiple divs, with input boxes as inner elements

      for (let key in aCopyOfHTMLCollectionOfObjects) {
        if (aCopyOfHTMLCollectionOfObjects[key]) {
          let divChildrenObjects = aCopyOfHTMLCollectionOfObjects[key].children;

          for (let key in divChildrenObjects) {            
            if (Object.hasOwnProperty.call(divChildrenObjects, key)) {
              let anHTMLElement = divChildrenObjects[key];
              onlyInnerDivHTMLElements.push(anHTMLElement)
            }
          }

        }
      }
      return onlyInnerDivHTMLElements
    }

    
    /**
      * Turns object collection into an array, 
      builds new object with required information, 
      pushes to myCurrentGuideAndCheckboxesArray[].
      * @param { Document } document - Object to parse.
      * @return { Array} myCurrentGuideAndCheckboxesArray - An array of objects built in this function.
      */
    async function updateCheckboxState(pendo){
      let divObjectsArray = transformHTMLCollectionToArray(divWithCheckboxes)

      /**
        * Split() on, '=',passed into Input Element ID string.
        * Will break if string does not include above characcter.
        * @param { String } justAGuideIdString - A string represnting the Guide ID, that has been parsed out of the Element's ID.
        * @param { Object } pendo - Explicilty passing in the Pendo object as variable, for clarity.
        * @return { Boolean } findAGuide - True/False returned, dependent on if a Guide's ID currently exists in the pendo.guides array.
        */
      function checkGuideState(justAGuideIdString, pendo) {
        let findAGuide = pendo.findGuideById(justAGuideIdString) !== null || undefined ? pendo.findGuideById(justAGuideIdString).isComplete() : false
        return findAGuide
      }

      divObjectsArray.forEach((inputCheckboxElement) =>{
        let myInputsAndLabelObject = {};
        if(inputCheckboxElement.type === "checkbox"){

          let guideIDDataAttribute = inputCheckboxElement.getAttribute(`${dataAttributeString}`) 

          myInputsAndLabelObject.elementID = inputCheckboxElement.id
          myInputsAndLabelObject.guideID = guideIDDataAttribute
          myInputsAndLabelObject.isCheckedBoolean = checkGuideState(guideIDDataAttribute, pendo)
          inputCheckboxElement.checked = myInputsAndLabelObject.isCheckedBoolean
          myInputsAndLabelObject.isDisabledBoolean = inputCheckboxElement.disabled
          myCurrentGuideAndCheckboxesArray.push(myInputsAndLabelObject)

        }

      });
      
    }

    /**
      * Get each Pendo Guide Id that present.
      * @param { Array } pendoGuidesInProd - An empty array, to push IDs to
      */
      async function filterOnGuideID(pendoGuidesInProd){
      pendoGuidesInProd.map((aGuideItem)=>{
        listOfGuideIDsOnly.push(aGuideItem.id)
      })
    }

    /**
      * Contains functions to be run on Window load.
      * @param { Pendo } - The Pendo object, contains functions and guide data to READ.
      * @param { Document } - DOM, to be manipulated
      */
    async function helperFunction(pendo) {
      filterOnGuideID(pendoGuidesInProd)
      updateCheckboxState(pendo)
    }
    
    window.onload = init;

    /**
      * Runs once Window is loaded.
      */
    function init(pendo) {
      helperFunction(pendo)
    }

    init(pendo)

  }
  
})(window, document)