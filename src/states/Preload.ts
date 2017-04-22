
import KeyboardSound from '../sounds/keyboard';
import Speaker from '../speaker';
import Monitor from '../monitor';

export default class Preload extends Phaser.State {

    public preload ()
    {
        this.load.image('cinematic1', 'assets/images/cinematic1.png');
        this.load.image('cinematic2', 'assets/images/cinematic2.png');
        this.load.image('board', 'assets/images/board.png');
        this.load.image('board_top', 'assets/images/board_top.png');

        this.load.bitmapFont('carrier-command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

        // Load keyboard sounds assets
        for (var i = 1; i <= KeyboardSound.numberEnter; i++) {
            var j = ("00" + i).substr(-2, 2);
            this.load.audio('keyboard/enter_' + j + '.wav', KeyboardSound.enterPath + j + '.wav')
        }

        for (var i = 1; i <= KeyboardSound.numberKey; i++) {
            var j = ("00" + i).substr(-2, 2);
            this.load.audio('keyboard/key_' + j + '.wav', KeyboardSound.keyPath + j + '.wav')
        }

        for (var i = 1; i <= KeyboardSound.numberSpace; i++) {
            var j = ("00" + i).substr(-2, 2);
            this.load.audio('keyboard/space_' + j + '.wav', KeyboardSound.spacePath + j + '.wav')
        }

        // Load speaker sounds assets
        Speaker.loadAssets(this);
        Monitor.loadAssets(this);
    }

    public create ()
    {
        // this.game.state.start('Menu');
        this.game.state.start('Play');
    }
}
