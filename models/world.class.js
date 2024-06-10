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
        /* this.initAudioContext(); */
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // for fixed statusBar
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0); // for fixed statusBar

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects)

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionBoss();
            this.checkCollectionBottle();
            this.checkCollectionCoin();
            this.checkThrowObjects();
            this.checkJumpAttack();
        }, 200);
    };

    runBottleCheck() {
        setInterval(() => {
            this.checkBottleAttack();
        }, 400);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })
    }

    checkCollisionBoss() {
        this.endboss.forEach((boss) => {
            if (this.character.isColliding(boss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollectionBottle() {
        this.level.collectableObjects = this.level.collectableObjects.filter((collectableObject) => {
            if (this.character.collisionWithBottle(collectableObject)) {
                this.bottleNumber++;
                this.statusBarBottle.setBottles(this.bottleNumber);
                return false; // Remove the collected object from the array
            }
            return true; // Keep the uncollected object
        });
    }

    checkCollectionCoin() {
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.collisionWithCoin(coin)) {
                this.coinNumber++;
                this.statusBarCoin.setCoins(this.coinNumber);
                return false; // Remove the collected object from the array
            }
            return true; // Keep the uncollected object
        });
    }

    /**
    * Checks for attacks against enemies and initiates death animation.
    */
    checkJumpAttack() {
        setInterval(() => {
            this.enemies.forEach((enemy) => {
                if (this.chickenIsAttacked(enemy)) {
                    this.enemyDies(enemy);
                }
            });
        }, 100);
    };

    /**
    * Checks for attacks against endboss.
    */
    checkBottleAttack() {
        this.endboss.forEach((boss) => {
            if (this.bossIsAttacked(boss)) {
                console.log('AUA');
                boss.energy -= 20;
                this.statusBarBoss.setPercentage(boss.energy);
            }
        });
    };

    /* hitWithBottle() {
        this.endboss.energy -= 20;
        if (this.endboss.energy <= 0) {
            this.endboss.energy = 0;
            console.log('DEAD');
        }
    } */

    /* hitWithBottle() {
        this.endboss.energy -= 20;
        if (this.endboss.energy <= 0) {
            this.endboss.energy = 0;
            console.log('DEAD');
        }
    } */

    /**
 * Returns a true or false statement for attack against enemies.
 * @param {Object} enemy Enemy object from the enemies array
 * @returns  boolean statement to check collision with enemies from above during attack
 */
    chickenIsAttacked(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead();
    }

    bossIsAttacked(boss) {
        return this.throwableObjects.some((throwableObject) => throwableObject.isCollidingBoss(boss));
    }

    /**
    * Executes enemy death sequence.
    * @param {Object} enemy Enemy object from the enemies array
    */
    enemyDies(enemy) {
        enemy.energy--;
        this.character.jump();
    }

    /**
     * Checks if Character has enough bottles to throw.
     */
    checkThrowObjects() {
        if (this.keyboard.KeyD && this.bottleNumber > 0) {
            this.bottleNumber--;
            this.statusBarBottle.setBottles(this.bottleNumber);
            this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(this.bottle);
        }
    }
}