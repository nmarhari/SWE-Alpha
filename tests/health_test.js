import * as chai from 'chai';
import * as RoverCam from '../p5/p5.RoverCam.js';
// import * as hitSound from '../assets/hit.wav';
var assert = chai.assert;
// var foo = 'bar';
// var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
// assert.typeOf(foo, 'string'); // without optional message
// assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
// assert.equal(foo, 'bar', 'foo equal `bar`');
// assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
// assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');


// Mock Player class with a takeHit() method
class Player {
    constructor() {
        this.health = 100; // Initial health
        this.dead = false;
    }

    takeHit() {
        this.health -= 10;
        if (this.health <= 0) {
            this.dead = true;
        }
    }
}

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    it('should reduce health by 10 when hit', () => {
        const initialHealth = player.health;
        player.takeHit();
        assert.strictEqual(player.health, initialHealth - 10);
    });

    it('should set player as dead when health becomes 0', () => {
        player.health = 10; // Set health to a non-zero value
        player.takeHit(); // Reduce health to 0
        assert.strictEqual(player.dead, true);
    });

    it('should not reduce health if already dead', () => {
        player.dead = true;
        const initialHealth = player.health;
        player.takeHit();
        assert.strictEqual(player.health, initialHealth);
    });
});

