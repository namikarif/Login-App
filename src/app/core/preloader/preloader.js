(function (global) {
  var preloader = document.querySelector('.preloader-hidden');
  var naLoading = document.querySelector('.na-loading-hidden');
  var dashboardLink = !!location.pathname.match(/dashboard\/\w*/);
  var body = document.querySelector('body');
  body.style.overflow = 'hidden';
  if ((location.pathname === '/report-designer' || location.pathname === '/report-viewer') || dashboardLink) {
    naLoading.className = 'na-loading';
    var counterLoading = 0, timeoutLoading;
    timeoutLoading = setTimeout(startCounterLoading, 10);

    global.appBootstrap = function () {
      setTimeout(endCounterLoading, 1000);
    };

    function startCounterLoading() {
      var remaining = 100 - counterLoading;
      counterLoading = counterLoading + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));
      timeoutLoading = setTimeout(startCounterLoading, 10);
      if (counterLoading > 70) {
        endCounterLoading();
      }
    }

    function endCounterLoading() {
      clearTimeout(timeoutLoading);
      setTimeout(function () {
        removeLoading();
        body.style.overflow = '';
      }, 300);
    }

    function removeLoading() {
      naLoading.addEventListener('transitionend', function () {
        naLoading.className = 'na-loading-hidden';
      });
      naLoading.className += ' na-loading-hidden-add na-loading-hidden-add-active';
    }
  } else {
    var counter = 0, timeout;
    preloader.className = 'preloader';
    var progressBar = document.querySelector('.preloader-progress-bar');

    timeout = setTimeout(startCounter, 10);

    global.appBootstrap = function () {
      setTimeout(endCounter, 1000);
    };

    function startCounter() {
      var remaining = 100 - counter;
      counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));
      progressBar.style.width = Math.round(counter) + '%';
      timeout = setTimeout(startCounter, 10);
      if (counter > 70) {
        endCounter();
      }
    }

    function endCounter() {
      clearTimeout(timeout);
      progressBar.style.width = '100%';
      setTimeout(function () {
        removePreloader();
        body.style.overflow = '';
      }, 300);
    }

    function removePreloader() {
      preloader.addEventListener('transitionend', function () {
        preloader.className = 'preloader-hidden';
      });
      preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
    }
  }
})(window);
