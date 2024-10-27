import {CGFappearance, CGFobject, CGFtexture} from '../../../lib/CGF.js';
import { MySphere } from '../../geometries/MySphere.js';
/**
* MyBeeBody
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBeeBody extends CGFobject {
	constructor(scene) {
		super(scene);

        this.bodyRadius = 1;
        this.body = new MySphere(this.scene, this.bodyRadius, false, 15, 15);
        
        this.initMaterials();
	}

    initMaterials() {
        // Body
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(0.8, 0.8, 0.0, 1.0);
        this.bodyMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.bodyMaterial.setSpecular(0.8, 0.8, 0.0, 1.0);
        this.bodyMaterial.setShininess(10.0); 
        this.bodyMaterial.setTexture(new CGFtexture(this.scene, "images/beeBody.jpg"));
    }

    display() {
        this.scene.pushMatrix();

        this.bodyMaterial.apply();
        this.scene.scale(0.45, 0.5, 0.7);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.body.display();

        this.scene.popMatrix();
    }
}
