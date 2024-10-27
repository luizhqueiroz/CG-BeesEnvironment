import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
/**
* MyGarden
* @constructor
 * @param scene - Reference to MyScene object
 * @param gardenRow - Number of flowers in the row
 * @param gardenCol - Number of flowers in the column
 * @param position - Garden position
*/
export class MyGarden extends CGFobject {
	constructor(scene, gardenRow, gardenCol, position) {
		super(scene);

        this.gardenRow = gardenRow;
        this.gardenCol = gardenCol;
        this.position = {x: position.x, y: position.y, z: position.z};
        this.flowers = [];

        this.initMaterials();
        this.initColors();
        this.initFlowers();
	}

    // Init different materials for the petal, stem and receptacle
    initMaterials() {
        // Petal
        this.petalMaterial1 = new CGFappearance(this.scene);
        this.petalMaterial1.setAmbient(1.0, 0.8, 0.86, 1.0);
        this.petalMaterial1.setDiffuse(1.0, 0.8, 0.86, 1.0);
        this.petalMaterial1.setSpecular(1.0, 0.8, 0.86, 1.0);
        this.petalMaterial1.setShininess(10.0);
        this.petalMaterial1.setTexture(new CGFtexture(this.scene, "images/petal1.jpg"));
        this.petalMaterial1.setTextureWrap('MIRROR', 'MIRROR');

        this.petalMaterial2 = new CGFappearance(this.scene);
        this.petalMaterial2.setAmbient(0.0, 0.0, 0.6, 1.0);
        this.petalMaterial2.setDiffuse(0.0, 0.0, 0.6, 1.0);
        this.petalMaterial2.setSpecular(0.0, 0.0, 0.6, 1.0);
        this.petalMaterial2.setShininess(10.0);
        this.petalMaterial2.setTexture(new CGFtexture(this.scene, "images/petal2.jpg"));
        this.petalMaterial2.setTextureWrap('MIRROR', 'MIRROR');

        this.petalMaterial3 = new CGFappearance(this.scene);
        this.petalMaterial3.setAmbient(0.6, 0.0, 0.0, 1.0);
        this.petalMaterial3.setDiffuse(0.6, 0.0, 0.0, 1.0);
        this.petalMaterial3.setSpecular(0.6, 0.0, 0.0, 1.0);
        this.petalMaterial3.setShininess(10.0);
        this.petalMaterial3.setTexture(new CGFtexture(this.scene, "images/petal3.jpg"));
        this.petalMaterial3.setTextureWrap('MIRROR', 'MIRROR');
        
        this.petalMaterial4 = new CGFappearance(this.scene);
        this.petalMaterial4.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.petalMaterial4.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.petalMaterial4.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.petalMaterial4.setShininess(10.0);
        this.petalMaterial4.setTexture(new CGFtexture(this.scene, "images/petal4.jpg"));
        this.petalMaterial4.setTextureWrap('MIRROR', 'MIRROR');

        // Stem
        this.stemMaterial1 = new CGFappearance(this.scene);
        this.stemMaterial1.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.stemMaterial1.setDiffuse(0.0, 1.0, 0.0, 1.0);
        this.stemMaterial1.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.stemMaterial1.setShininess(10.0);
        this.stemMaterial1.setTexture(new CGFtexture(this.scene, "images/stem1.jpg"));
        this.stemMaterial1.setTextureWrap('MIRROR', 'MIRROR');

        this.stemMaterial2 = new CGFappearance(this.scene);
        this.stemMaterial2.setAmbient(0.51, 0.41, 0.33, 1.0);
        this.stemMaterial2.setDiffuse(0.51, 0.41, 0.33, 1.0);
        this.stemMaterial2.setSpecular(0.51, 0.41, 0.33, 1.0);
        this.stemMaterial2.setShininess(10.0);
        this.stemMaterial2.setTexture(new CGFtexture(this.scene, "images/stem2.jpg"));
        this.stemMaterial2.setTextureWrap('MIRROR', 'MIRROR');

        // Receptacle
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.receptacleMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.receptacleMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.receptacleMaterial.setShininess(10.0);
        this.receptacleMaterial.setTexture(new CGFtexture(this.scene, "images/receptacle.jpg"));
        this.receptacleMaterial.setTextureWrap('MIRROR', 'MIRROR');
    }

    // Init the array of textures to be used in a random way to give color to the parts of the flower
    initColors() {
        this.petalTexture = [this.petalMaterial1, this.petalMaterial2, this.petalMaterial3, this.petalMaterial4];
        this.stemTexture = [this.stemMaterial1, this.stemMaterial2];
    }

    // Init all the flowers in the garden using random parameters
    initFlowers() {
        this.flowers = [];

        for (var i = 0; i < this.gardenRow; i++) {
            for (var j = 0; j < this.gardenCol; j++) {
            var outterRadius = Math.random() * 2 + 1.5;
            var petalNumber = Math.floor(Math.random() * 6 + 10);
            var receptacleRadius = Math.random() * 0.2 + 0.55;
            var stemRadius = Math.random() * 0.06 + 0.1;
            var stemLen = Math.random() * 3 + 4;
            var petalColor = this.petalTexture[Math.floor(Math.random() * 4)];
            var receptacleColor = this.receptacleMaterial;
            var stemColor = this.stemTexture[Math.floor(Math.random() * 2)];
            
            // Generate the flowers with random position along the garden
            var rowDist = 5*i + Math.random()*3 + 1;
            var colDist = 5*j + Math.random()*3 + 1;
            var flower = new MyFlower(this.scene, outterRadius, petalNumber, receptacleRadius, stemRadius, stemLen, petalColor, receptacleColor, stemColor, {x: this.position.x + rowDist, y: this.position.y + stemLen, z: this.position.z + colDist});
            this.flowers.push(flower);
            }
        }
    }

    display() {
        var nFlowers = this.gardenRow * this.gardenCol;
        for (var i = 0; i < nFlowers; i++) { 
            this.flowers[i].display();
        }
    }
}
