let canvas;
let world;
let keyboard = new Keyboard();
let music = new Audio('audio/salsa.mp3');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');

    console.log('my character is', world.character);
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
    
    function startGame() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        playMusic();
        // Add code to start the game
    }
    
    function endGame() {
        document.getElementById('end-screen').style.display = 'flex';
        document.getElementById('canvas').style.display = 'none';
        // Add code to stop the game
    }
    
    function restartGame() {
        document.getElementById('end-screen').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        // Add code to restart the game
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

    function pauseMusic() {
        music.pause();
    }
