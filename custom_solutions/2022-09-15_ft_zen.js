(function (window, document) {
  function helperFunction() {
    console.log('<--- helper function loaded')
    var forethoughtscript = document.createElement("script");
    forethoughtscript.setAttribute(
      "src",
      "https://solve-widget.forethought.ai/embed.js"
    );
    forethoughtscript.setAttribute("type", "application/javascript");
    forethoughtscript.setAttribute(
      "data-api-key",
      "Ca44d95b-0ce9-4dec-aeb0-1c4ede8929ea",
    );
    forethoughtscript.setAttribute('hidden', 'true');
    document.head.appendChild(forethoughtscript)

    var checkForForethought = setInterval(function () {
      console.log('<--- check in set interval');
      if (typeof Forethought === 'function' && pendo.dom('iframe#forethought-chat').length < 0) {
        openForethoughtCloseRC();
        clearInterval(checkForForethought);
      }
    }, 500);
  }

  function openForethoughtCloseRC() {
    console.log('<--- OPEN FORETHOUGHT CLOSE RC FUNCTION')
    Forethought('widget', 'open');
    setTimeout(function () {
      Forethought('widget', 'show');
    }, 500);
  }

  // Called when the dom has loaded
  function init() {
    if (typeof Forethought !== 'function') {
      helperFunction()
    } else {
      openForethoughtCloseRC();
    }
  }

  if (!pendo.designer) {
    init();
    window.addEventListener('message', e => {
      const { event } = e.data;
      if (event === 'forethoughtWidgetClosed') {
        console.log('===> WIDGET CLOSED')
        //document.getElementById('pendo-resource-center-container').style.display = 'block';
      }
      if (event === 'forethoughtWidgetOpened') {
        console.log('---> OPENED WIDGET')
        //document.getElementById('pendo-resource-center-container').style.display = 'none';
      }
    })
  }
})(window, document)