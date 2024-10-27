import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        // Display folder
        var f0 = this.gui.addFolder('Display');
        f0.add(this.scene, 'displayAxis').name('Display Axis');
        f0.add(this.scene, 'displayPanorama').name('Display Panorama');
        f0.add(this.scene, 'displayTerrain').name('Display Terrain');
        f0.add(this.scene, 'displayRockSet').name('Display RockSet');
        f0.add(this.scene, 'displayGarden').name('Display Garden');
        f0.add(this.scene, 'displayHive').name('Display Hive');
        f0.add(this.scene, 'displayBee').name('Display Bee');
        f0.add(this.scene, 'displayGrass').name('Display Grass');

        //Slider element in GUI
        // Factors folder
        var f1 = this.gui.addFolder('Factors');
        f1.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        f1.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        //Garden Folder
        var f2 = this.gui.addFolder('Garden');
        f2.add(this.scene.gardenValues, 'Row', 5, 10, 1).name('Garden Row').onChange(this.scene.updateGardenMatrix.bind(this.scene));
        f2.add(this.scene.gardenValues, 'Col', 5, 10, 1).name('Garden Column').onChange(this.scene.updateGardenMatrix.bind(this.scene));

        // Focus on the bee
        this.gui.add(this.scene, 'focusBee').name('Focus on bee');
        
        this.initKeys();
        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}
