(function(global) {

    var container = document.getElementById("servers"),
        header = document.getElementById("header"),
        offlineWarning = document.getElementById("offlineWarning"),
        serverErrorWarning = document.getElementById("serverErrorWarning"),
        getServerCheckTimer = null;

    function makeServerActive(element) {
        element.classList.add('active');
    }

    function getServerStatus() {
        var request = new XMLHttpRequest();
        request.open('GET', '/get-status', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var servers = JSON.parse(this.response),
                    numberOffline = 0;

                container.innerHTML = "";

                for (var i = 0; i < servers.length; i++) {
                    var server = servers[i],
                        newElement = document.createElement('div');

                    newElement.className = "server";

                    if (server['status'] === "up" && server['responseTime'] > 1000) {
                        newElement.classList.add('server-slow');
                        newElement.innerHTML = "<h1>" + server['name'] + "</h1><p>" + server['responseTime'] + " s</p>";
                    }
                    else if (server['status'] === "up") {
                        newElement.classList.add('server-up');
                        newElement.innerHTML = "<h1>" + server['name'] + "</h1><p>" + server['responseTime'] + " s</p>";
                    }
                    else {
                        newElement.classList.add('server-down');
                        newElement.innerHTML = "<h1>" + server['name'] + "</h1><p>DOWN</p>";
                        numberOffline++;
                    }

                    newElement.addEventListener('click', makeServerActive.bind(null, newElement));

                    container.appendChild(newElement);
                }

                if (numberOffline > 0) {
                    header.className = "header warning";
                    document.title = "WARNING! Server Check";
                }
                else {
                    header.className = "header";
                    document.title = "Server Check";
                }

                serverErrorWarning.className = "server-error-warning";
            }
            else {
                // We reached our target server, but it returned an error
                serverErrorWarning.className = "server-error-warning active";
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            serverErrorWarning.className = "server-error-warning active";
        };

        request.send();

        getServerCheckTimer = setTimeout(getServerStatus, 10000);
    }

    function toggleFullscreen(elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
          !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    function loadErrorPage() {
        var request = new XMLHttpRequest();
            request.open('GET', '/get-error', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var errorList = JSON.parse(this.response);

                clearTimeout(getServerCheckTimer);
                container.innerHTML = "";

                for (var i = 0; i < errorList.length; i++) {
                    var errorFileName = errorList[i].errorFileName,
                        errors = errorList[i].errors;

                    var newDiv = document.createElement('div'),
                        newHeading = document.createElement('h1');

                    newDiv.className = "error-line";
                    newHeading.textContent = errorFileName;

                    newDiv.appendChild(newHeading);

                    for (var j = 0; j < errors.length; j++) {
                        var error = errors[j];

                        var newParagraph = document.createElement('p');
                        newParagraph.innerHTML = "<p>" + error['time'] + ": (" + error['monitorName'] + ") " + error['message'] + "(" + error['responseTime'] + "s)</p>";
                        newDiv.appendChild(newParagraph);
                    }

                    container.appendChild(newDiv);
                }


            }
            else {
                // We reached our target server, but it returned an error
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };

        request.send();
    }

    document.getElementById('monitor-link').addEventListener('click', getServerStatus);

    document.getElementById('fullscreen-link').addEventListener('click', function () {
        toggleFullscreen(document.body);
    });

    document.getElementById('errors-link').addEventListener('click', function (e) {
        e.preventDefault();

        loadErrorPage();
    });

    window.addEventListener('online', function (e) {
        offlineWarning.className = "offline-warning";
    }, false);

    window.addEventListener('offline', function (e) {
        offlineWarning.className = "offline-warning offline";
    }, false);

    getServerStatus();

})(window);

