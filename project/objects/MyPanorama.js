import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../geometries/MySphere.js';
/**
* MyPanorama
* @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture to apply
*/
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.texture = texture;
        this.sphere = new MySphere(scene, 1, true);

        this.initMaterials();
	}

    // Init the paranoma material
    initMaterials() {
        this.panoramaMaterial = new CGFappearance(this.scene);
        this.panoramaMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.panoramaMaterial.setTexture(this.texture);
    }

    display() {
        // Panorama centered on camera position
        const cameraPosition = this.scene.camera.position;

        this.scene.pushMatrix();

        this.panoramaMaterial.apply();
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        this.scene.scale(200, 200, 200);
        this.sphere.display();

        this.scene.popMatrix();
    }
}
