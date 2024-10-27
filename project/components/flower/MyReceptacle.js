import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometries/MySphere.js';
/**
* MyReceptacle
* @constructor
 * @param scene - Reference to MyScene object
 * @param receptacleRadius - Radius of the receptacle
*/
export class MyReceptacle extends CGFobject {
	constructor(scene, receptacleRadius) {
		super(scene);
        this.sphere = new MySphere(this.scene, receptacleRadius, false);

	}

    display() {
        this.sphere.display();
    }
}
