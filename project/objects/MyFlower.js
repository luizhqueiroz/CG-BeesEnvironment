import { CGFobject } from '../../lib/CGF.js';
import { MyPetal } from "../components/flower/MyPetal.js";
import { MyReceptacle } from "../components/flower/MyReceptacle.js";
import { MyStem } from "../components/flower/MyStem.js";
import { MyPollen } from './MyPollen.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param outterRadius - Radius of the circumference that surrounds the petals
 * @param PetalNumber - Number of petals
 * @param receptacleRadius - Receptacle radius
 * @param stemRadius - Stem radius
 * @param sizeStem - Stem Size 
 * @param petalColor - Petal material to apply
 * @param receptacleColor - Receptacle material to apply
 * @param stemColor - Stem material to apply
 * @param position - Flower position
 */
export class MyFlower extends CGFobject {
    constructor(scene, outterRadius, PetalNumber, receptacleRadius, stemRadius, sizeStem, petalColor, receptacleColor, stemColor, position) {
		super(scene);

        this.PetalNumber = PetalNumber
        this.receptacleRadius = receptacleRadius;
        this.petalColor = petalColor;
        this.receptacleColor = receptacleColor;
        this.stemColor = stemColor;
        this.position = {x: position.x, y: position.y, z: position.z};

        this.initAngles();

        // Component
        this.petal = new MyPetal(this.scene, outterRadius - this.receptacleRadius/2, this.petalCurvature);
        this.stem = new MyStem(this.scene, stemRadius, sizeStem);
        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius);

        // Pollen
        this.pollen = new MyPollen(this.scene, this.receptacleRadius/4, {x: 0, y: 0, z: 1.1*this.receptacleRadius}, this.scene.pollenTexture);
	}

    // Init random angles for the junction of the petals to receptacle of the flower and for the petal own curvature
    initAngles() {
        this.unionDegrees = [];
        for (var i = 0; i < this.PetalNumber; i++) {
            this.unionDegrees[i] = (Math.random() * 60 - 30) * Math.PI/180;
        }

        this.petalCurvature = (Math.random() * 60 + 15) * Math.PI/180;
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.displayFlower();

        this.scene.popMatrix();

        
    }

    // Asslemby of the flower
    displayFlower() {
        this.petalColor.apply();

        this.scene.pushMatrix();
        // Petal around the receptacle
        this.scene.rotate(-Math.PI/4, 1, 0, 0);
        for (var i = 0; i < this.PetalNumber; i++) {
            this.scene.pushMatrix();

            var degree = i*Math.PI/12 % 2*Math.PI;
            this.scene.rotate(degree, 0, 0, 1);
            this.scene.translate(0, - this.receptacleRadius/2, 0);
            this.scene.rotate(this.unionDegrees[i], 1, 0, 0);
            this.petal.display();

            this.scene.popMatrix();
        }

        // Receptacle
        this.receptacleColor.apply();
        this.receptacle.display();

        // Pollen if the bee didn't get
        if (this.pollen != null) this.pollen.display();

        this.scene.popMatrix();

        // Stem
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -this.receptacleRadius/2);
        this.stemColor.apply();
        this.stem.display();

        this.scene.popMatrix()
    }
}
