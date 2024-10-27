import {CGFappearance, CGFobject, CGFtexture} from '../../../lib/CGF.js';
import { MySphere } from '../../geometries/MySphere.js';
/**
* MyBeeHead
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBeeHead extends CGFobject {
	constructor(scene) {
		super(scene);

        this.head = new MySphere(this.scene, 1, false, 15, 15);
        this.eye = new MySphere(this.scene, 0.3, false, 15, 15);

        this.initMaterials();
	}

    initMaterials() {
        // Head
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.headMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.headMaterial.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.headMaterial.setShininess(10.0); 
        this.headMaterial.setTexture(new CGFtexture(this.scene, "images/beeHead.jpg"));

        // Eye
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.eyeMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.eyeMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.eyeMaterial.setShininess(10.0);
    }

    display() {
        // Head
        this.headMaterial.apply();
        this.head.display();

        // One Eye
        this.eyeMaterial.apply();
        this.scene.pushMatrix();

        this.scene.translate(Math.sin(Math.PI/3)*Math.sin(Math.PI/6), Math.cos(Math.PI/3), Math.sin(Math.PI/3)*Math.cos(Math.PI/6));
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.scale(0.8, 1.5, 0.5);
        this.eye.display();

        this.scene.popMatrix();

        // Another eye
        this.scene.pushMatrix();

        this.scene.translate(Math.sin(Math.PI/3)*Math.sin(-Math.PI/6), Math.cos(Math.PI/3), Math.sin(Math.PI/3)*Math.cos(-Math.PI/6));
        this.scene.rotate(-Math.PI/6, 1, 0, 0);
        this.scene.scale(0.8, 1.5, 0.5);
        this.eye.display();

        this.scene.popMatrix();
    }
}
