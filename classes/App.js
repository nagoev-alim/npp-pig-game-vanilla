import { getRandomNumber } from '../modules/getRandomNumber.js';
import { icons } from 'feather-icons';

export default class App {
  constructor(root) {
    this.root = root;
    this.skeleton(this.root);

    //===============================================
    // 👋 Query Selectors
    //===============================================
    this.DOM = {
      playerF: document.querySelector('[data-player-0]'),
      playerS: document.querySelector('[data-player-1]'),
      scoreF: document.querySelector('[data-score-0]'),
      scoreS: document.querySelector('[data-score-1]'),
      currentF: document.querySelector('[data-current-0]'),
      currentS: document.querySelector('[data-current-1]'),
      diceImg: document.querySelector('[data-dice]'),
      btnGame: document.querySelector('[data-game]'),
      btnRoll: document.querySelector('[data-roll]'),
      btnHold: document.querySelector('[data-hold]'),
      btnInfo: document.querySelectorAll('[data-info]'),
    };

    this.PROPS = {
      scores: null,
      currentScore: null,
      activePlayer: null,
      playing: null,
      endScore: 100,
    };

    //===============================================
    // 👋 Events Listeners
    //===============================================
    this.initGame();
    this.DOM.btnGame.addEventListener('click', this.initGame);
    this.DOM.btnRoll.addEventListener('click', this.onRoll);
    this.DOM.btnHold.addEventListener('click', this.onHold);
    this.DOM.btnInfo.forEach(btn => btn.addEventListener('click', this.onInfo));
  }

  //===============================================
  // 👋 Methods
  //===============================================
  /**
   * @function skeleton - Render starter skeleton
   */
  skeleton = (root) => {
    root.innerHTML = `
      <div class='column column--player' data-player-0=''>
        <h3>Player 1</h3>
        <p class='h2' data-score-0=''>1</p>
        <div class='current'>
          <p class='current__label'>Current</p>
          <p class='h5' data-current-0=''>20</p>
        </div>
      </div>
      <div class='column column--buttons'>
        <img src='./assets/images/dice-5.png' alt='Playing dice' class='dice' data-dice='' />
        <div class='buttons'>
          <button data-game=''>New game</button>
          <button data-roll=''>Roll dice</button>
          <button data-hold=''>Hold</button>
          <button data-info='' class='info'>${icons.info.toSvg({ color: '#6b48ff' })}</button>
        </div>
      </div>
     <div class='column column--player' data-player-1=''>
        <h3>Player 2</h3>
        <p class='h2' data-score-1=''>2</p>
        <div class='current'>
          <p class='current__label'>Current</p>
          <p class='h5' data-current-1=''>40</p>
        </div>
      </div>
      <div class='overlay'>
        <h4>Game Rules</h4>
        <p>On a turn, a player rolls the die repeatedly. The goal is to accumulate as many points as possible, adding up the numbers rolled on the die. However, if a player rolls a 1, the player's turn is over and any points they have accumulated during this turn are forfeited. Rolling a 1 doesn't wipe out your entire score from previous turns, just the total earned during that particular roll.</p>
        <p>A player can also choose to hold (stop rolling the die) if they do not want to take a chance of rolling a 1 and losing all of their points from this turn. If the player chooses to hold, all of the points rolled during that turn are added to his or her score.</p>
        <p>When a player reaches a total of 100 or more points, the game ends and that player is the winner.</p>
        <button data-info=''>${icons['corner-down-left'].toSvg({ color: '#6b48ff' })}</button>
      </div>
    `;
  };

  /**
   * @function initGame - Game initialization
   */
  initGame = () => {
    // Set default values
    this.PROPS.scores = [0, 0];
    this.PROPS.currentScore = 0;
    this.PROPS.activePlayer = 0;
    this.PROPS.playing = true;

    this.DOM.scoreF.textContent =
      this.DOM.scoreS.textContent =
        this.DOM.currentF.textContent =
          this.DOM.currentS.textContent = '0';

    // Set default class names
    this.DOM.diceImg.classList.add('hide');
    this.DOM.playerF.classList.add('active');
    this.DOM.playerS.classList.remove('active');
    document.querySelectorAll('.winner')
      .forEach(el => el.classList.remove('winner'));
  };

  /**
   * @function onRoll - Roll game
   */
  onRoll = () => {
    if (this.PROPS.playing) {
      console.log(this.PROPS.activePlayer);
      const dice = getRandomNumber(1, 6);

      this.DOM.diceImg.classList.remove('hide');
      this.DOM.diceImg.src = `./assets/images/dice-${dice}.png`;

      if (dice !== 1) {
        this.PROPS.currentScore += dice;
        document.querySelector(`[data-current-${this.PROPS.activePlayer}]`).textContent = this.PROPS.currentScore;
      } else {
        this.switchPlayer();
      }
    }
  };

  /**
   * @function switchPlayer - Switch players
   */
  switchPlayer = () => {
    document.querySelector(`[data-current-${this.PROPS.activePlayer}]`).textContent = 0;
    this.PROPS.currentScore = 0;
    this.PROPS.activePlayer = this.PROPS.activePlayer === 0 ? 1 : 0;
    this.DOM.playerF.classList.toggle('active');
    this.DOM.playerS.classList.toggle('active');
  };

  /**
   * @function onHold - Hold current result
   */
  onHold = () => {
    if (this.PROPS.playing) {
      console.log(this.PROPS.currentScore);
      console.log(this.PROPS.scores[this.PROPS.activePlayer]);
      this.PROPS.scores[this.PROPS.activePlayer] += this.PROPS.currentScore;

      document.querySelector(`[data-score-${this.PROPS.activePlayer}]`).textContent = this.PROPS.scores[this.PROPS.activePlayer];

      if (this.PROPS.scores[this.PROPS.activePlayer] >= this.PROPS.endScore) {
        this.PROPS.playing = false;
        this.DOM.diceImg.classList.add('hide');

        const activePlayer = document.querySelector(`[data-player-${this.PROPS.activePlayer}]`);
        activePlayer.classList.add('winner');
        activePlayer.classList.remove('active');
      } else {
        this.switchPlayer();
      }
    }
  };

  /**
   * @function onInfo - Show/Hide rules
   */
  onInfo = () => {
    document.querySelector('.overlay').classList.toggle('visible');
  };
}


