let canvas;
let world;
let keyboard = new Keyboard();
let mute = false;

let music = new Audio('audio/salsa.mp3');
let walkingSound = new Audio('audio/walking.mp3');
let coinSound = new Audio('audio/coin.mp3');
let splashSound = new Audio('audio/splash.mp3');
let hopoffSound = new Audio('audio/hopoff.mp3');

let allAudio = [
    music,
    walkingSound,
    coinSound,
    splashSound,
    hopoffSound,
];

/**
 * Clears all intervals by stopping each active interval.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Initializes the game environment.
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    initTouch();
    checkWidth();

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
    setTimeout(() => {
        initLevel();
    playMusic();
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    world = new World(canvas, keyboard);
    }, 500);
}

/**
 * Restarts the game by initializing the level, playing music, and resetting the game world.
 */
function restartGame() {
    setTimeout(() => {
        initLevel();
    playMusic();
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    world = new World(canvas, keyboard);
    }, 500);
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
 * Toggles the sounds of the game on or off.
 */
function toggleSounds() {
    if (mute === false) {
        muteSounds();
    } else {
        unmuteSounds();
    }
}

/**
 * Mutes the sounds of the game.
 */
function muteSounds () {
    let img = document.getElementById('volume');
    mute = true;
        for (let i = 0; i < allAudio.length; i++) {
            let currentSound = allAudio[i];
            currentSound.muted = true;
        }
        img.src = './img/icons/mute.png';
}

/**
 * Unmutes the sounds of the game.
 */
function unmuteSounds() {
    let img = document.getElementById('volume');
    mute = false;
        for (let i = 0; i < allAudio.length; i++) {
            let currentSound = allAudio[i];
            currentSound.muted = false;
        }
        img.src = './img/icons/volume.png';
}