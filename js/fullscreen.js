let isFullscreen = false;

/**
 * Toggles fullscreen mode for the main container element.
 */
function fullscreen() {
    if (isFullscreen === false) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

/**
 * Requests fullscreen mode for the main container element.
 */
function enterFullscreen() {
    const element = document.getElementById('main-container');
    isFullscreen = true;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    isFullscreen = false;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

