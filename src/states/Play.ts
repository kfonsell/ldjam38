import { Biome } from '../biome/biome';
import { Grassland } from '../biome/grassland';
import { SeaShore } from "../biome/sea-shore";
import { RainForest } from '../biome/rain-forest';
import { RockyMountain } from '../biome/rocky-mountain';
import { SandDesert } from '../biome/sand-desert';
import { IceField } from '../biome/ice-field';
import { Tundra } from '../biome/tundra';

import BoardFX from '../fx/board';

import Shell from '../shell';
import Speaker from '../speaker';
import Monitor from '../monitor';
import Leds from '../leds';
import Dashboard from '../dashboard';
import KeyboardSound from '../sounds/keyboard';
import ComputerSound from '../sounds/computer';
import {Output} from "../terminal/output";
import { InstalledModule } from '../installed-module';
import { GatheredData } from '../gathered-data';

export default class Play extends Phaser.State {
    currentLocation: Biome;
    locations: Biome[] = [];
    installedModules: InstalledModule[] = [];
    isRoverLanded: boolean = false;
    isPlayingFinishScene: boolean = false;
    gatheredData: GatheredData[] = [];
    alienArtifactFound: boolean = false;

    private debug: boolean = false;

    // Sprites
    private background: Phaser.Group;
    public middleground: Phaser.Group;
    public foreground: Phaser.Group;

    private output: Output;
    private dashboard: Dashboard;
    private keyboardSound: KeyboardSound;
    private computerSound: ComputerSound;

    private boardFX: BoardFX;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';

        this.dashboard = new Dashboard(
            new Shell(this),
            new Speaker(this),
            new Monitor(this),
            new Leds(this)
        );
        this.output = new Output();
        this.dashboard.setOutput(this.output);

        this.computerSound = new ComputerSound(this);
        this.computerSound.playAllSequentially();

        this.keyboardSound = new KeyboardSound(this);
        this.keyboardSound.register();

        // INIT LOCATIONS
        this.locations.push(new Grassland());
        this.locations.push(new SeaShore());
        this.locations.push(new RainForest());
        this.locations.push(new RockyMountain());
        this.locations.push(new SandDesert());
        this.locations.push(new IceField());
        this.locations.push(new Tundra());

        this.background = this.game.add.group();
        var board = this.background.create(0, 0, 'board');
        board.width = board.width * 1.5;
        board.height = board.height * 1.5;

        this.middleground = this.game.add.group();

        this.boardFX = new BoardFX(this);
        this.boardFX.display();

        this.foreground = this.game.add.group();

        var board_top = this.foreground.create(0, 0, 'board_top');
        board_top.width = board_top.width * 1.5;
        board_top.height = board_top.height * 1.5;

        this.dashboard.leds.displayLeds();
    }

    public update()
    {
        this.finish();

        this.boardFX.update();
    }

    public render()
    {
        if (this.debug) {
            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );
        }
    }

    private fade() {
        this.game.camera.fade(0x000000, 6000);
        this.output.terminalElement.value = '';
        let shellPrompt = <HTMLInputElement> document.getElementById("shellPrompt");
        shellPrompt.value = "";

        let shellInput = <HTMLInputElement> document.getElementById("shellInput");
        shellInput.setAttribute('disabled', 'true');
    }

    private resetFade() {
        this.game.camera.resetFX();

        let shellPrompt = <HTMLInputElement> document.getElementById("shellPrompt");
        shellPrompt.value = "$ ";

        let timeout = 1000;
        let output = this.output;
        setTimeout(function(){ output.writeToTerminal('Subject: LD39 ASAP!'); }, timeout * 2);
        setTimeout(function(){ output.writeToTerminal('From: Bernard McLindon')}, timeout * 3);
        setTimeout(function(){ output.writeToTerminal(
            'Well received the confirmation of station health check, everything is ok. '+
            'We started the extraction, your job is done here. ' +
            'BTW, engineers messed up again, they didn\'t manage to remotely update your rover\'s firmware, ' +
            'it seems the patch is not applicable. ' +
            'Anyway, let it there, you\'ll receive a new rover on LD39, your new mission starts now' +
            '.')}, timeout * 4);
        setTimeout(function(){ output.writeToTerminal('...'); }, timeout*5);
        setTimeout(function(){ output.writeToTerminal('What are you doing? Don\'t let me alone!', false, true); }, timeout * 12);
        setTimeout(() => { output.writeToTerminal('Connection lost.'); }, timeout * 14);
        setTimeout(() => { output.writeToTerminal('Ping...'); }, timeout * 16);
        setTimeout(() => { output.writeToTerminal('Ping...'); }, timeout * 20);

        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 1, 1);
        }, timeout);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 1, 1);
        }, timeout*12);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 1, 1.5);
        }, timeout*13);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 1, 1.75);
        }, timeout*14);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 0.9, 2);
        }, timeout*15);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 0.9, 3);
        }, timeout*16);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 0.8, 4);
        }, timeout*17);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 0.7, 6);
        }, timeout*18);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 0.6, 8);
        }, timeout*19);
        setTimeout(function(){
            output.displayToMonitor('scenes/planet1', 0.1, 12);
        }, timeout*20);
    }

    private finish() {
        if (this.isPlayingFinishScene == false && this.installedModules.length == 4) {
            this.isPlayingFinishScene = true;
            this.game.camera.onFadeComplete.add(this.resetFade, this);
            this.fade();
        }
    }
}
