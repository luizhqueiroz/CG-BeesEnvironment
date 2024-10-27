import {CGFappearance, CGFobject} from '../../../lib/CGF.js';
import { MySphere } from '../../geometries/MySphere.js';
import { MyCylinder } from '../../geometries/MyCylinder.js';
/**
* MyBeeAntennae
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBeeAntennae extends CGFobject {
	constructor(scene) {
		super(scene);

        this.line = new MyCylinder(this.scene, 0.1, 1.5, 10, 10);
        this.ball = new MySphere(this.scene, 0.3, false, 15, 15);
        
        this.initMaterials();
	}

    initMaterials() {
        // Antennae
        this.AntennaeMaterial = new CGFappearance(this.scene);
        this.AntennaeMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.AntennaeMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.AntennaeMaterial.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.AntennaeMaterial.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix();

        this.AntennaeMaterial.apply();
        this.scene.translate(0, 2, 0);
        this.line.display();
        this.ball.display();

        this.scene.popMatrix();
    }
}
