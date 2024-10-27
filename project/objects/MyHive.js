import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MySquare } from "../geometries/MySquare.js";
/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Texture of the hive box
 * @param boxSize - Size of the length, height and depth of the hive box 
 * @param position - Hive position
 */
export class MyHive extends CGFobject {
    constructor(scene, texture, boxSize, position) {
		super(scene);

        this.texture = texture;
        this.boxSize = boxSize;
        this.gridScale = 0.1;
        this.gridSize = this.gridScale*this.boxSize;
        this.holeSize = this.gridSize/2;

        this.square = new MySquare(this.scene, this.boxSize);
        this.position = {x: position.x, y: position.y, z: position.z};
        this.pollens = [];

        this.initMaterials();
	}

    // Init the wood material for the hive and the black material for the holes on the top of the hive
    initMaterials() {
        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.blackMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.blackMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.blackMaterial.setShininess(10.0);

        this.woodMaterial = new CGFappearance(this.scene);
        this.woodMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.woodMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.woodMaterial.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.woodMaterial.setShininess(10.0);
        this.woodMaterial.setTexture(this.texture);
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.displayHive();

        this.scene.popMatrix();
    }

    // Assembly the hive box
    displayHive() {
        this.woodMaterial.apply();
        // Front face
        this.scene.pushMatrix();

        this.scene.translate(0, 0, this.boxSize/2);
        this.square.display();

        this.scene.popMatrix();

        // Back Face
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -this.boxSize/2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.square.display();

        this.scene.popMatrix();

        // Bottom face
        this.scene.pushMatrix();

        this.scene.translate(0, -this.boxSize/2, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.square.display();

        this.scene.popMatrix();

        // Right face
        this.scene.pushMatrix();

        this.scene.translate(this.boxSize/2, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.square.display();

        this.scene.popMatrix();

        // Left face
        this.scene.pushMatrix();

        this.scene.translate(-this.boxSize/2, 0, 0);
        this.scene.rotate(3*Math.PI / 2, 0, 1, 0);
        this.square.display();

        this.scene.popMatrix();

        // Grid on top of the hive
        var dist = 0;
        for (var i = 0; i < this.boxSize/(this.gridSize+this.holeSize); i++) {
            this.scene.pushMatrix();

            this.scene.translate(0, this.boxSize/2 + 0.01, (this.boxSize/2 - this.gridSize/2) - dist);
            this.scene.rotate(3*Math.PI / 2, 1, 0, 0);
            this.scene.scale(1, this.gridScale, 1);
            this.square.display();

            this.scene.popMatrix();

            dist += this.gridSize + this.holeSize;
        }

        // Hive Cover
        this.scene.pushMatrix();

        this.scene.translate(-(this.boxSize/2 * (1 + Math.cos(Math.PI/4))), (this.boxSize/2 * (1 - Math.cos(Math.PI/4))), 0);
        this.scene.rotate(3*Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        this.square.display();

        this.scene.popMatrix();

        // Pollens left by the bee
        var dist = 0;
        for (var i = 0; i < this.pollens.length; i++) {
            this.scene.pushMatrix();

            this.scene.translate(dist - this.pollens[i].position.x, 1.1*this.boxSize/2 - this.pollens[i].position.y, 0 - this.pollens[i].position.z);
            this.pollens[i].display();

            this.scene.popMatrix();
            dist += this.pollens[i].pollenRadius + 0.1;
        }

        // Top face
        this.scene.pushMatrix();

        this.blackMaterial.apply();
        this.scene.translate(0, this.boxSize/2, 0);
        this.scene.rotate(3*Math.PI / 2, 1, 0, 0);
        this.square.display();

        this.scene.popMatrix();
    }
}
