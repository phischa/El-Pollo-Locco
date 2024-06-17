class World {

    canvas;
    ctx;
    keyboard;
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss;
    clouds = level1.clouds;
    backgroundObject = level1.backgroundObjects;
    collectableObjects = level1.collectableObjects;
    coins = level1.coins;

    bottleNumber = 0;
    coinNumber = 0;

    camera_x = -100;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarBoss = new StatusBarBoss();
    throwableObjects = [];
    chickenIsDead = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runBottleCheck();
    }

    /**
     * Sets the current world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Clears the canvas and draws all game elements.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0);
        this.drawMoveables();
    }

    /**
     * Draws movable game elements.
     */
    drawMoveables() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the rendering map.
     * @param {Array} objects Array of objects to add to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the rendering map.
     * @param {Object} mo Object to add to the map
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for the given object.
     * @param {Object} mo Object whose image will be flipped
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original image after flipping.
     * @param {Object} mo Object whose image will be restored
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Sets intervals for collision detection and game logic.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionBoss();
            this.checkCollectionBottle();
            this.checkCollectionCoin();
            this.checkThrowObjects();
            this.checkJumpAttack();
        }, 200);
    }

    /**
     * Sets interval to check for bottle attacks.
     */
    runBottleCheck() {
        setInterval(() => {
            this.checkBottleAttack();
        }, 325);
    }

    /**
     * Checks collisions between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks collision between character and endboss.
     */
    checkCollisionBoss() {
        this.level.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for collection of bottle objects by the character.
     */
    checkCollectionBottle() {
        this.level.collectableObjects = this.level.collectableObjects.filter((collectableObject) => {
            if (this.character.collisionWithBottle(collectableObject)) {
                this.bottleNumber++;
                this.statusBarBottle.setBottles(this.bottleNumber);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks for collection of coins by the character.
     */
    checkCollectionCoin() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.collisionWithCoin(coin)) {
                this.coinNumber++;
                this.statusBarCoin.setCoins(this.coinNumber);
                music.play();
                return false;
            }
            return true;
        });
    }

    /**
     * Sets up interval for checking jump attacks against enemies.
     */
    checkJumpAttack() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.chickenIsAttacked(enemy)) {
                    this.enemyDies(enemy);
                }
            });
        }, 100);
    }

    /**
     * Checks if the character is attacking an enemy from above.
     * @param {Object} enemy Enemy object from the enemies array
     * @returns {boolean} True if the character is attacking the enemy from above, false otherwise
     */
    chickenIsAttacked(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead();
    }

    /**
     * Checks if the character can throw objects (bottles).
     */
    checkThrowObjects() {
        if (this.keyboard.KeyD && this.bottleNumber > 0) {
            this.bottleNumber--;
            this.statusBarBottle.setBottles(this.bottleNumber);
            this.character.isThrowing = true;
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(this.bottle);
            setTimeout(() => {
                this.character.isThrowing = false;
            }, 200);
        }
    }

    /**
     * Checks if any throwable objects (bottles) collide with the endboss.
     */
    checkBottleAttack() {
        this.level.endboss.forEach((boss) => {
            this.throwableObjects.forEach((throwableObject) => {
                if (throwableObject.isCollidingBoss(boss)) {
                    throwableObject.splash = true;
                    throwableObject.playSplash();
                    boss.energy -= 20;
                    boss.bossHurt = true;
                    this.statusBarBoss.setPercentage(boss.energy);
                    setTimeout(() => {
                        boss.bossHurt = false;
                    }, 1000);
                }
            });
        });
    }

    /**
     * Checks if any throwable objects (bottles) are colliding with the endboss.
     * @param {Object} boss Endboss object
     * @returns {boolean} True if any bottle is colliding with the boss, false otherwise
     */
    bossIsAttacked(boss) {
        return this.throwableObjects.some((throwableObject) => throwableObject.isCollidingBoss(boss));
    }

    /**
     * Initiates death sequence for an enemy.
     * @param {Object} enemy Enemy object to be killed
     */
    enemyDies(enemy) {
        enemy.energy--;
        this.character.jump();
    }
}
