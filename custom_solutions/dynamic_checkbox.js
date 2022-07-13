(function restrictGlobalVariables(window, document) {
  // Note: Outer scope variables used in below functions, do not change name.
  let findByThisString = 'my_checkboxes'
  let arrayOfAllCurrentGuides = pendo.guides;
  let listOfGuideIDsOnly = [];
  let myCurrentGuideAndCheckboxesArray = [];
  
  {

    /**
      * Remove inner html children from a div HTMLColleciton object.
      * @param { String } findByThisString - The class name of the divs being passed in
      * @return { Array <objects> } onlyInnerDivHTMLElements - An array of HTML objects, from each div Class 
      */
    function transformHTMLCollectionToArray(findByThisString){
      let divObj = document.getElementsByClassName(findByThisString)
      
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
    async function inputBoxLabelsInhtmlCollectionElementObjects(pendo){
      let divObjectsArray = transformHTMLCollectionToArray(findByThisString)
      
      /**
        * Split() on, '=',passed into Input Element ID string.
        * Will break if string does not include above characcter.
        * @param { String } stringElement - Input Element ID
        * @return { String } onlyGuideId - The Guide Id
        */
      function splitOutGuideId(idStringOfInputElement){

        //Note: validate that the caracter we're looking for, "=", exists in string.
        let regex = /=/i;
        let stringContainsCharacterBoolean = regex.test(idStringOfInputElement);

        if(stringContainsCharacterBoolean){
          //TODO: To remove this in favor of custom html attribute.
          let onlyGuideId = idStringOfInputElement.split('=')[1]
          return onlyGuideId
        }

      }

      /**
        * Split() on, '=',passed into Input Element ID string.
        * Will break if string does not include above characcter.
        * @param { String } justAGuideIdString - A string represnting the Guide ID, that has been parsed out of the Element's ID.
        * @param { Object } pendo - Explicilty passing in the Pendo object as variable, for clarity.
        * @return { Boolean } findAGuide - True/False returned, dependent on if a Guide's ID currently exists in the pendo.guides array.
        */
      function updateCurrentInputElementStateToMatchGuideState(justAGuideIdString, pendo) {
        let findAGuide = pendo.findGuideById(justAGuideIdString) !== null || undefined ? pendo.findGuideById(justAGuideIdString).isComplete() : false;
        return findAGuide;
      };
      // TODO: pendo.dom === dom('#_pendo-tour-two_')[0].dataset.guideId) // don't have to split the string
      divObjectsArray.forEach((key) =>{
        let myInputsAndLabelObject = {};
        let eachValue = key;
        
        if(eachValue.type === "checkbox"){
          let idStringOfInputElement = eachValue.id;
          let justAGuideIdString = splitOutGuideId(idStringOfInputElement);

          myInputsAndLabelObject.elementID = idStringOfInputElement;
          myInputsAndLabelObject.guideState = eachValue.state;
          myInputsAndLabelObject.lastUpdatedAt = eachValue.lastUpdatedAt;
          myInputsAndLabelObject.publishedAt = eachValue.publishedAt;
          myInputsAndLabelObject.guideID = justAGuideIdString;

          myInputsAndLabelObject.isCheckedBoolean = updateCurrentInputElementStateToMatchGuideState(justAGuideIdString, pendo);
          
          eachValue.checked = myInputsAndLabelObject.isCheckedBoolean;
          eachValue.disabled = true;
          myInputsAndLabelObject.isDisabledBoolean = eachValue.disabled;
          myCurrentGuideAndCheckboxesArray.push(myInputsAndLabelObject);

        };

      });
      
    };

    /**
      * Get each Pendo Guide Id that present.
      * @param { Array } arrayOfAllCurrentGuides - An empty array, to push IDs to
      */
      async function findCurrentGuidesOnly(arrayOfAllCurrentGuides){
      arrayOfAllCurrentGuides.map((aGuideItem)=>{
        listOfGuideIDsOnly.push(aGuideItem.id)
      })
    }

    /**
      * Contains functions to be run on Window load.
      * @param { Pendo } - The Pendo object, contains functions and guide data to READ.
      * @param { Document } - DOM, to be manipulated
      */
    async function helperFunction(pendo) {
      findCurrentGuidesOnly(arrayOfAllCurrentGuides)
      inputBoxLabelsInhtmlCollectionElementObjects(pendo)
    
      console.log(myCurrentGuideAndCheckboxesArray, `<--- logging my test case here: myCurrentGuideAndCheckboxesArray ---`);
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