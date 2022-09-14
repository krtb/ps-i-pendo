if (!pendo.designerEnabled) {
  (function restrictGlobalVariables(window, document) {
  
    function helperFunction() {
      //var head = document.head || document.getElementsByTagName("head")[0], 
      console.log('<--- helper function loaded')

      // Check to load script once
      if (typeof Forethought !== 'function') {
        var forethoughtscript = document.createElement("script");
  
        forethoughtscript.setAttribute(
          "src",
          "https://solve-widget.forethought.ai/embed.js"
        );
        forethoughtscript.setAttribute("type", "application/javascript");
        forethoughtscript.setAttribute(
          "data-api-key",
          "key_id",
        );
    
        forethoughtscript.setAttribute('hidden', 'true');
        document.head.appendChild(forethoughtscript)
      }

    }

    var checkForForethought = setInterval(function () {
      console.log('<--- check in set interval');

      if (typeof Forethought === 'function') {

        openForethoughtCloseRC();
      }
    }, 500);

  
    function openForethoughtCloseRC() {
      console.log('<--- OPEN FORETHOUGHT CLOSE RC FUNCTION')
      Forethought('widget', 'open');
      Forethought('widget', 'show');
    }
    
    {
      window.addEventListener('message', e => {
        const { event } = e.data;
            
        if(event === 'forethoughtWidgetClosed'){
          console.log('===> WIDGET CLOSED')
  
          //document.getElementById('pendo-resource-center-container').style.display = 'block';
        }
        
        if (event === 'forethoughtWidgetOpened'){
          console.log('---> OPENED WIDGET')
          clearInterval(checkForForethought);
          //document.getElementById('pendo-resource-center-container').style.display = 'none';
        }
      })
  
      window.onload = init;
    
      // the code to be called when the dom has loaded
      function init() {
        helperFunction()
      }
  
      init()
    }
    
  })(window, document)
  }