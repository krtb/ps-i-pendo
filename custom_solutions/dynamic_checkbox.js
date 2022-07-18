(function restrictGlobalVariables(window, document, pendo) {
  // Note: Outer scope variables used in below functions,
  // Changes to string names should be set in the HTML Input element first.
  let divWithInputsClassName = 'my_checkboxes';
  let htmlElementHasTypeOf = 'checkbox';
  let dataAttributeString = 'data-guide-id';

  let pendoGuidesInProd = pendo.guides;
  let listOfGuideIDsOnly = [];
  let myCurrentGuideAndCheckboxesArray = [];
  
  {

    /**
      * Remove inner html children from a div HTMLColleciton object.
      * @param { String } divWithInputsClassName - The class name of the divs being passed in
      * @return { Array <objects> } onlyInnerDivHTMLElements - An array of HTML objects, from each div Class 
      */
    function transformHTMLCollectionToArray(divWithInputsClassName){      
      let onlyInnerDivHTMLElements = [];
      /**
       * An HTMLCollection in the HTML DOM is live; it is automatically updated when the underlying document is changed. 
       * For this reason it is a good idea to make a copy (eg. using Array.from) 
       * to iterate over if adding, moving, or removing nodes.
       * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
      */
      // Note: Shallow copy in order to include nested objects.
      let aCopyOfHTMLCollectionOfObjects = document.getElementsByClassName(divWithInputsClassName); //Note: Will contain multiple divs, with input boxes as inner elements

      for (let key in aCopyOfHTMLCollectionOfObjects) {
        if (aCopyOfHTMLCollectionOfObjects[key]) {
          let divChildrenObjects = aCopyOfHTMLCollectionOfObjects[key].children;

          for (let key in divChildrenObjects) {            
            if (Object.hasOwnProperty.call(divChildrenObjects, key)) {
              let anHTMLElement = divChildrenObjects[key];
              onlyInnerDivHTMLElements.push(anHTMLElement);
            }
          }

        }
      }
      return onlyInnerDivHTMLElements;
    };

    
    /**
      * Turns object collection into an array, 
      builds new object with required information, 
      pushes to myCurrentGuideAndCheckboxesArray[].
      * @param { Object } pendo - The Pendo object.
      * @param { String } divWithInputsClassName - String of div class, declar ed globally above.
      * @param { String } dataAttributeString - String of data attribute with guide ID, declared globally above.
      * @param { Array} myCurrentGuideAndCheckboxesArray - Array of new objects which surface guide data.
      */
    async function updateCheckboxState(pendo, divWithInputsClassName, dataAttributeString, myCurrentGuideAndCheckboxesArray){
      let arrayOfInnerDivObjects = transformHTMLCollectionToArray(divWithInputsClassName);

      arrayOfInnerDivObjects.forEach((inputCheckboxElement) =>{
        let newObjectPendoData = {};

        let guideIDDataAttribute = inputCheckboxElement.getAttribute(`${dataAttributeString}`);
        let pendoGuideById = pendo.findGuideById(guideIDDataAttribute);
        let anExistingGuide = (pendoGuideById !== null) && (pendoGuideById !== undefined)? pendoGuideById : 'Missing Guide ID';        

        if(inputCheckboxElement.type === `${htmlElementHasTypeOf}` && typeof anExistingGuide !== 'string'){

          // Note: HTML Attributes
          newObjectPendoData.guideIDDataAttribute = guideIDDataAttribute;
          newObjectPendoData.isDisabledBoolean = inputCheckboxElement.disabled;
          inputCheckboxElement.checked = anExistingGuide.isComplete();
          // Note: pendo.guide properties and functions
          newObjectPendoData.isCompleteBoolean = anExistingGuide.isComplete();
          newObjectPendoData.state = anExistingGuide.state;
          newObjectPendoData.launchMethod = anExistingGuide.launchMethod;
          
          myCurrentGuideAndCheckboxesArray.push(newObjectPendoData);

        };

      });
      
    };

    /**
      * Get each Pendo Guide Id that present.
      * @param { Array } pendoGuidesInProd - Array of Pendo guides that are set to Public
      */
      async function filterOnGuideID(pendoGuidesInProd){
      pendoGuidesInProd.map((aGuideItem)=>{
        listOfGuideIDsOnly.push(aGuideItem.id);
      });
    };

    /**
      * Contains functions to be run on Window load.
      * @param { Object } pendo - Contains Pendo functions and guide. 
      * Note: READ only. Cannot WRITE to Pendo object.
      */
    async function helperFunction(pendo) {
      filterOnGuideID(pendoGuidesInProd);
      updateCheckboxState(
        pendo, 
        divWithInputsClassName, 
        dataAttributeString, 
        myCurrentGuideAndCheckboxesArray
      );
    };
    
    window.onload = init;

    /**
      * Runs once Window is loaded.
      */
    function init(pendo) {
      helperFunction(pendo);
    };

    init(pendo);

  };
  
})(window, document, pendo);