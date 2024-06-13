let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('audio/salsa.mp3');
let mute = false;

/**
 * Initializes the game environment.
 */
function init() {
    canvas = document.getElementById('canvas'); // Get the canvas element
    ctx = canvas.getContext('2d'); // Get the 2D rendering context of the canvas
    initTouch(); // Initialize touch event handlers
}

/**
 * Event listener for keydown events to update keyboard state.
 * @param {KeyboardEvent} e The keydown event object
 */
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.key === ' ') {
        keyboard.SPACE = true;
    }
    if (e.key === 'd') {
        keyboard.KeyD = true;
    }
});

/**
 * Event listener for keyup events to update keyboard state.
 * @param {KeyboardEvent} e The keyup event object
 */
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.key === ' ') {
        keyboard.SPACE = false;
    }
    if (e.key === 'd') {
        keyboard.KeyD = false;
    }
});

/**
 * Initializes touch event handlers for controlling the game.
 */
function initTouch() {
    document.getElementById('arrowLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('arrowLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('arrowRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('arrowRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('arrowUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('arrowUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KeyD = true;
    });

    document.getElementById('bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KeyD = false;
    });
}

/**
 * Starts the game by initializing the level, playing music, and setting up the game world.
 */
function startGame() {
    initLevel();
    playMusic();
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    world = new World(canvas, keyboard);
    // Add any additional code to start the game
}

/**
 * Restarts the game by initializing the level, playing music, and resetting the game world.
 */
function restartGame() {
    initLevel();
    playMusic();
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    world = new World(canvas, keyboard);
}

/**
 * Plays music and sets up a loop to replay when it ends.
 */
function playMusic() {
    if (music.paused) {
        music.play().catch(error => {
            console.error('Error playing sound:', error);
        });
        music.addEventListener('ended', () => {
            music.currentTime = 0;
            music.play();
        });
    }
}

/**
 * Mutes or unmutes the game's background music.
 */
function muteSounds() {
    let img = document.getElementById('volume');
    if (mute === false) {
        mute = true;
        music.volume = 0.0;
        img.src = './img/icons/mute.png';
    } else {
        mute = false;
        music.volume = 1.0;
        img.src = './img/icons/volume.png';
    }
}