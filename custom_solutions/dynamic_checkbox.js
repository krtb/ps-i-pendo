(function restrictGlobalVariables(window, document, pendo) {
  /** Changes to string names should be set in the HTML Input element first. */
  let divWithInputsClassName = 'my_checkboxes';
  let htmlElementHasTypeOf = 'checkbox';
  let dataAttributeString = 'data-guide-id';

  let pendoGuidesPublicOrStaged = pendo.guides;
  /** guideInfoContainer[] is helpful to output to the console when debugging. */
  let guideInfoContainer = [];
  let listOfGuideIDsOnly = [];
  
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
      /** Shallow copy in order to include nested objects. */
      /**  Will contain multiple divs, with input boxes as inner elements. */
      let aCopyOfHTMLCollectionOfObjects = document.getElementsByClassName(divWithInputsClassName);
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
      pushes to guideInfoContainer[].
      * @param { Object } pendo - The Pendo object.
      * @param { String } divWithInputsClassName - String of div class, declared globally above.
      * @param { String } dataAttributeString - String of data attribute with guide ID, declared globally above.
      * @param { Array <objects>} guideInfoContainer - Array of new objects which surface guide data.
      */
    async function updateCheckboxState(pendo, divWithInputsClassName, dataAttributeString, guideInfoContainer){
      let arrayOfInnerDivObjects = transformHTMLCollectionToArray(divWithInputsClassName);

      arrayOfInnerDivObjects.forEach((inputCheckboxElement) =>{
        let newObjectPendoData = {};

        let guideIDDataAttribute = inputCheckboxElement.getAttribute(dataAttributeString);
        let pendoGuideById = pendo.findGuideById(guideIDDataAttribute);
        let anExistingGuide = (pendoGuideById !== null) && (pendoGuideById !== undefined)? pendoGuideById : 'Missing Guide ID';        

        if(inputCheckboxElement.type === htmlElementHasTypeOf && typeof anExistingGuide !== 'string'){

          /** HTML Attributes */
          newObjectPendoData.guideIDDataAttribute = guideIDDataAttribute;
          newObjectPendoData.isDisabledBoolean = inputCheckboxElement.disabled;
          inputCheckboxElement.checked = anExistingGuide.isComplete();
          /** pendo.guide properties and functions */
          newObjectPendoData.isCompleteBoolean = anExistingGuide.isComplete();
          newObjectPendoData.state = anExistingGuide.state;
          newObjectPendoData.launchMethod = anExistingGuide.launchMethod;
          
          guideInfoContainer.push(newObjectPendoData);

        };

      });
      
    };

    /**
      * Get each Pendo Guide Id that is present.
      * @param { Array <objects>} pendoGuidesPublicOrStaged - Array of Pendo guides that are set to Public or Staged.
      */
      async function filterOnGuideID(pendoGuidesPublicOrStaged){
      pendoGuidesPublicOrStaged.map((aGuideItem)=>{
        listOfGuideIDsOnly.push(aGuideItem.id);
      });
    };
    
    window.onload = init;

    /**
      * Runs once the Window is loaded.
      * @param { Object } pendo - The Pendo instance object.
      * @param { Array <objects>} pendoGuidesPublicOrStaged - Only guide found within pendo object.
      * @param { String } divWithInputsClassName - Global variable with expected div classname.
      * @param { String } dataAttributeString - Data Attribute expected to exist on all input elements.
      * @param { Array } guideInfoContainer - Array of objects which contain information on input element and expected guide.
      */
    async function init(
      pendo, 
      pendoGuidesPublicOrStaged, 
      divWithInputsClassName, 
      dataAttributeString, 
      guideInfoContainer
    ) {
      filterOnGuideID(pendoGuidesPublicOrStaged);
      updateCheckboxState(
        pendo, 
        divWithInputsClassName, 
        dataAttributeString, 
        guideInfoContainer
      );
      console.log(pendoGuidesPublicOrStaged, `<--- logging my test case here: pendoGuidesPublicOrStaged ---`);
    };

    init(
      pendo,
      pendoGuidesPublicOrStaged,
      divWithInputsClassName,
      dataAttributeString,
      guideInfoContainer
    );

  };
  
})(window, document, pendo);