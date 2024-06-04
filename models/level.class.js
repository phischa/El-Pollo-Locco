class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;
    coins;
    level_end_x = 2050;

    constructor(enemies, clouds, backgroundObjects, collectableObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
        this.coins = coins;
    }
}