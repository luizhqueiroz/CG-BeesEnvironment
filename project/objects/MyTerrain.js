import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyPlane } from '../geometries/MyPlane.js';
/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 * @param position - Position of the terrain
 * @param texture - Texture to apply
 */
export class MyTerrain extends CGFobject {
    constructor(scene, position, texture) {
        super(scene);

        this.plane = new MyPlane(this.scene, 30);
        this.position = {x: position.x, y: position.y, z: position.z};
        this.texture = texture;

        this.initMaterials();
    }

    // Init terrain material
    initMaterials() {
        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.terrainMaterial.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.terrainMaterial.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.terrainMaterial.setShininess(10.0);
        this.terrainMaterial.setTexture(this.texture);
    }

    // Display the terrain in the given position and increasing its size
    display() {
        this.scene.pushMatrix();

        this.terrainMaterial.apply();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(400, 400, 400);
        this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
        this.plane.display();

        this.scene.popMatrix();
    }
}
