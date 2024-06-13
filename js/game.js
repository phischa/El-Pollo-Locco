let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('audio/salsa.mp3');
let mute = false;


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    initTouch();
}

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
 * function checks touch events for controlling the game.
 */
function initTouch() {
    document.getElementById('arrowLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('arrowLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('arrowRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('arrowRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('arrowUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })

    document.getElementById('arrowUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })

    document.getElementById('bottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KeyD = true;
    })

    document.getElementById('bottle').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KeyD = false;
    })
}

function startGame() {
    initLevel();
    playMusic();
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    world = new World(canvas, keyboard);
    // Add code to start the game
}

function restartGame() {
    initLevel();
    playMusic();
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    world = new World(canvas, keyboard);
}

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
