class Level {
    enemies;
    /* endboss; */
    clouds;
    backgroundObjects;
    collectableObjects;
    coins;
    level_end_x = 2050;

    constructor(enemies, /* endboss, */ clouds, backgroundObjects, collectableObjects, coins) {
        this.enemies = enemies;
       /*  this.endboss = endboss; */
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.coins = coins;
    }
}