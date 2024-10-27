import {CGFappearance, CGFobject} from '../../../lib/CGF.js';
import { MyTriangle } from '../../geometries/MyTriangle.js';
/**
* MyBeeWing
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBeeWing extends CGFobject {
	constructor(scene) {
		super(scene);

        this.wing = new MyTriangle(this.scene, 3);
        this.wingRotation = 0;
        
        this.initMaterials();
	}

    initMaterials() {
        // Wing
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(1.0, 1.0, 1.0, 0.1);
        this.wingMaterial.setDiffuse(1.0, 1.0, 1.0, 0.1);
        this.wingMaterial.setSpecular(1.0, 1.0, 1.0, 0.5);
        this.wingMaterial.setEmission(1.0, 1.0, 1.0, 0.3);
    }

    display() {
        // Wing Transparency
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene. gl.enable(this.scene.gl.BLEND);
        this.wingMaterial.apply();

        // Big wing
        this.scene.pushMatrix();

        this.scene.rotate(7*Math.PI/6, 0, 0, 1);
        this.scene.rotate(this.wingRotation, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, -3, 0);
        this.wing.display();

        this.scene.popMatrix();

        // Small wing
        this.scene.pushMatrix();

        this.scene.rotate(4*Math.PI/3, 0, 0, 1);
        this.scene.rotate(this.wingRotation, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.7, 0.7, 0.7);
        this.scene.translate(0, -3, 0);
        this.wing.display();

        this.scene.popMatrix();

        this.scene.gl.disable(this.scene.gl.BLEND);
    }

    // Update the angle of the wing rotation around the point where it join the body
    updateWingRotation(wingRotation) {
        this.wingRotation = wingRotation;
    }
}
