import {CGFappearance, CGFobject} from '../../../lib/CGF.js';
import { MyCylinder } from '../../geometries/MyCylinder.js';
import { MySphere } from '../../geometries/MySphere.js';
/**
* MyBeePaw
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBeePaw extends CGFobject {
	constructor(scene) {
		super(scene);

        this.firstPaw = new MyCylinder(this.scene, 0.025, 1, 10, 10);
        this.secondPaw = new MyCylinder(this.scene, 0.01, 0.3, 10, 10);
        this.junction = new MySphere(this.scene, 0.05, false, 15, 15);
        
        this.initMaterials();
	}

    initMaterials() {
        // Paw
        this.pawMaterial = new CGFappearance(this.scene);
        this.pawMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.pawMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.pawMaterial.setSpecular(1.0, 1.0, 1.0, 0.0);
        this.pawMaterial.setShininess(10.0);
    }

    display() {
        this.pawMaterial.apply();
        // FirstPaw
        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.firstPaw.display();

        this.scene.popMatrix();

        // SecondPaw
        this.scene.pushMatrix();

        this.scene.translate(Math.sin(Math.PI/4), -Math.cos(Math.PI/4), 0);
        this.secondPaw.display();

        this.scene.popMatrix();

        // Junction
        this.scene.pushMatrix();

        this.scene.translate(Math.sin(Math.PI/4), -Math.cos(Math.PI/4), 0);
        this.junction.display();

        this.scene.popMatrix();
    }
}
