class World {

    character = new Character();
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss
    clouds = level1.clouds;
    backgroundObject = level1.backgroundObject;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    statusBar = new StatusBar();
    throwableObjects = [];
    chickenIsDead = false;
    /* icon = new Icon(); */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
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
        this.ctx.translate(this.camera_x, 0); // for fixed statusBar

        this.addToMap(this.character);

        /* this.ctx.translate(-this.camera_x, 0); // for fixed statusBar
        this.addToMap(this.icon);
        this.ctx.translate(this.camera_x, 0); // for fixed statusBar */

        this.addObjectsToMap(this.level.enemies);
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
            this.checkThrowObjects();
            this.checkJumpAttack();
        }, 200);
    };

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            };
        })
    }

    /**
    * Checks for attacks against enemies and initiates death animation.
    */
    checkJumpAttack() {
        this.enemies.forEach((enemy) => {
            if (this.chickenIsAttacked(enemy)) {
                this.enemyDies(enemy);
            }
        });
    };

        /**
     * Returns a true or false statement for attack against enemies.
     * @param {Object} enemy Enemy object from the enemies array
     * @returns  boolean statement to check collision with enemies from above during attack
     */
        chickenIsAttacked(enemy) {
            return this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead()
        }
    
        /**
        * Executes enemy death sequence
        * @param {Object} enemy Enemy object from the enemies array
        */
        enemyDies(enemy) {
            enemy.energy--;
            this.character.jump();
        }

        
    checkThrowObjects() {
        if (this.keyboard.KeyD) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }
}