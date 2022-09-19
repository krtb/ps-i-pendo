(function restrictGlobalVariables(window, document, dom) {
  /** Check if Pendo Visual Designer is open */
  if (!pendo.designer) {
    /** Close Resource Center after timeout, triggered on Module open and load. */
    step.eventRouter.eventable.trigger('pendoEvent', {
      action: 'returnToResourceCenterHome'
    });
    setTimeout(function () {
      pendo.onGuideAdvanced();
    }, 250);
    /** Function defined at bottom of file */
    injectOrOpenForethought();
    /** 
     * Listen for Forethought API Events, originating in 'solve-widget.forethought.ai/embed.js'
     * {WARNING} If Forethought API event names change, this code will break.
     * {WARNING} Network Latency issues may arise due to Forethought CDN, as script is injected.
     * - To avoid the possibility of latency issues, Pendo recommends customers install custom chat API scripts in their application code.
     * - Currently, the Forethought Chat API is loaded by the function, injectChatApiScript()
     */
    window.addEventListener('message', e => {
      const { event } = e.data;
      if (event === 'forethoughtWidgetClosed') {
        /** Use pendo.enableLogging() to enabled log statements in console. */
        pendo.log('---> CLOSED Forethought Chat')
        dom('iframe#forethought-chat')[0].setAttribute("hidden", true);
      }
      if (event === 'forethoughtWidgetOpened') {
        /** Use pendo.enableLogging() to enabled log statements in console. */
        pendo.log('---> OPENED Forethought Chat')
        dom('iframe#forethought-chat')[0].setAttribute("hidden", true);
      }
      if (event === 'forethoughtWidgetLoaded') {
        /** Use pendo.enableLogging() to enabled log statements in console. */
        pendo.log('---> LOADED Forethought Chat');
        dom('iframe#forethought-chat')[0].setAttribute("hidden", true);
        /** Hide title which appears above chat box */
        dom('#forethought-chat')[0].title = ""
        /** Open Forethought by calling API Methods in required order*/
        openForethoughtChat();
      }
    })
    /**
     * Creates a Script Tag Element in DOM, set's required attributes, and appends Node
     */
    function injectChatApiScript() {
      /** Use pendo.enableLogging() to enabled log statements in console. */
      pendo.log('---> INJECTED Chat API Script Tag')

      var forethoughtscript = document.createElement("script");
      forethoughtscript.setAttribute(
        "src",
        "https://solve-widget.forethought.ai/embed.js"
      );
      forethoughtscript.setAttribute("type", "application/javascript");
      forethoughtscript.setAttribute(
        "data-api-key",
        "key",
      );
      document.head.appendChild(forethoughtscript)
    }
    /**
     * Opens Forethought Chat via API method. After half a second, calls Forethought API to be displayed.
     */
    function openForethoughtChat() {
      /** Use pendo.enableLogging() to enabled log statements in console. */
      pendo.log('---> OPENED Forethought with API Methods')
      /** {Warning} Forethought advises order of methods to be Open, then Show. */
      Forethought('widget', 'open');
      setTimeout(function () {
        Forethought('widget', 'show');
      }, 500);
    }
    /**
     * Check if Forethought Chat script has been instantiated on page. 
     * Forethought Expected as a Function type.
     * IF not running first load Forethought Script Tag, 
     * ELSE hide Forethought Chat Badge
     * AND open Forethought Chat View
     */
    function injectOrOpenForethought() {
      pendo.log('---> CHECK for Forethought OR OPEN Forethought')
      if (typeof Forethought !== 'function') {
        /** Add Forethought Script Tag with API Key */
        injectChatApiScript()
      } else {
        /** Hide Forethought Chat badge */
        dom('iframe#forethought-chat')[0].setAttribute("hidden", true);
        /** Open Forethought by calling API Methods in required order*/
        openForethoughtChat();
      }
    }
  }
})(window, document, pendo.dom)