import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../geometries/MyCylinder.js';
/**
* MyStem
* @constructor
 * @param scene - Reference to MyScene object
 * @param stemRadius - Radius of the stem
 * @param stemLen - Length of the stem
*/
export class MyStem extends CGFobject {
	constructor(scene, stemRadius, stemLen) {
		super(scene);
        this.cylinder = new MyCylinder(this.scene, stemRadius, stemLen);
	}

    display() {
        this.cylinder.display();
    }
}
