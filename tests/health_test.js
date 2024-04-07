import * as chai from 'chai';
//import * as RoverCam from '../p5/p5.RoverCam.js'
var assert = chai.assert;
// var foo = 'bar';
// var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
// assert.typeOf(foo, 'string'); // without optional message
// assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
// assert.equal(foo, 'bar', 'foo equal `bar`');
// assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
// assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

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

  it('should play hit sound when hit', () => {
    player.takeHit();
    // Assuming `hit` is an instance of the audio object
    assert.strictEqual(hit.isPlaying(), true);
  });

  it('should set player as dead and play scream sound when health becomes 0', () => {
    player.health = 10; // Set health to a non-zero value
    player.takeHit(); // Reduce health to 0
    assert.strictEqual(player.dead, true);
    // Assuming `scream` is an instance of the audio object
    assert.strictEqual(scream.isPlaying(), true);
  });

  it('should not reduce health if already dead', () => {
    player.dead = true;
    const initialHealth = player.health;
    player.takeHit();
    assert.strictEqual(player.health, initialHealth);
    // Assuming hit sound doesn't play when dead
    assert.strictEqual(hit.isPlaying(), false);
  });
});

