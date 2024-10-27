import { CGFobject } from '../../../lib/CGF.js';
import { MyTriangle } from '../../geometries/MyTriangle.js';
/**
* MyPetal
* @constructor
 * @param scene - Reference to MyScene object
 * @param outterRadius - Radius of the circunfere that surrounds the petals
 * @param curvature - Angle of the curvature of the petal
*/
export class MyPetal extends CGFobject {
	constructor(scene, outterRadius, curvature) {
		super(scene);

        curvature = typeof curvature !== 'undefined' ? curvature : Math.PI/6;

        this.outterRadius = outterRadius
        this.curvature = curvature;
        this.triangleUp = new MyTriangle(this.scene, this.outterRadius/2);
        this.triangleBottom = new MyTriangle(this.scene, this.outterRadius/2);
	}

    display() {
        // Two triangles coincident in their base
        this.scene.pushMatrix();

        this.scene.translate(0, -this.outterRadius/2, 0);
        
        this.triangleUp.display();

        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(this.curvature, 1, 0, 0);
        this.triangleBottom.display();

        this.scene.popMatrix();
    }
}
