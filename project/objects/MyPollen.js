import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyOval } from '../geometries/MyOval.js';
/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 * @param pollenRadius - Pollen radius
 * @param position - Pollen position
 * @param texture - Texture to apply
 */
export class MyPollen extends CGFobject {
    constructor(scene, pollenRadius, position, texture) {
        super(scene);

        // pollenRadius = 0.5 if it is not provided
        pollenRadius = typeof pollenRadius !== 'undefined' ? pollenRadius : 0.5;

        this.pollenRadius = pollenRadius;
        this.oval = new MyOval(this.scene, this.pollenRadius);
        this.position = {x: position.x, y: position.y, z: position.z};
        this.texture = texture;

        this.initMaterials();
        this.initAngles();
    }

    // Init the orange material for the pollen
    initMaterials() {
        this.materialLaranja = new CGFappearance(this.scene);
        this.materialLaranja.setAmbient(1.0, 0.46, 0.08, 1.0);
        this.materialLaranja.setDiffuse(1.0, 0.46, 0.08, 1.0);
        this.materialLaranja.setSpecular(1.0, 0.46, 0.08, 1.0);
        this.materialLaranja.setShininess(10.0);
        this.materialLaranja.setTexture(this.texture);
        this.materialLaranja.setTextureWrap('REPEAT', 'REPEAT');
    }

    // Init the random angles for the pollen rotation
    initAngles() {
        this.pollenRotation = [
            (Math.random() * 60 + 60) * Math.PI/180,
            ((Math.random() * 90 - 45)) * Math.PI/180
        ];
    }

    // Display the pollen
    display() {
        this.scene.pushMatrix();

        this.materialLaranja.apply();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.pollenRotation[1], 0, 1, 0);
        this.scene.rotate(this.pollenRotation[0], 1, 0, 0);
        this.oval.display();

        this.scene.popMatrix();
    }
}
