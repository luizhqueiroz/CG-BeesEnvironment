import { CGFobject } from '../../lib/CGF.js';
import { MyBeeAntennae } from '../components/bee/MyBeeAntennae.js';
import { MyBeeBody } from '../components/bee/MyBeeBody.js';
import { MyBeeHead } from '../components/bee/MyBeeHead.js';
import { MyBeePaw } from '../components/bee/MyBeePaw.js';
import { MyBeeWing } from '../components/bee/MyBeeWing.js';
/**
* MyBee
* @constructor
 * @param scene - Reference to MyScene object
 * @param position - Position of the bee
*/
export class MyBee extends CGFobject {
	constructor(scene, position) {
		super(scene);

        // Position
        this.position = {x: position.x, y: position.y, z: position.z};
        this.initialPosition = {x: position.x, y: position.y, z: position.z};
        this.startPosition = null;

        // Speed
        this.orientation = 0;
        this.speed = {value: 0, direction: "Forward"};

        // Component
        this.antennae = new MyBeeAntennae(this.scene);
        this.head = new MyBeeHead(this.scene);
        this.body = new MyBeeBody(this.scene);
        this.paw = new MyBeePaw(this.scene);
        this.wing = new MyBeeWing(this.scene);
        
        // Scene object related
        this.beePollen = null;
        this.hive = null;
        this.garden = null;
        this.flower = null;
        this.positionOnTheGround = this.scene.terrain.position.y + 0.8;

        // Animation
        this.wingRotation = 0;
        this.isAnimationStarted = false;
        this.animDurationSecs = 0;
        this.timeSpeedStarted = 0;

        // Gap for colisions
        this.gapXZ = 2;
        this.gapY = 1;
	}

    display() {
       this.scene.pushMatrix();

       this.scene.translate(this.position.x, this.position.y, this.position.z);
       this.scene.rotate(this.orientation, 0, 1, 0);
       this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
       this.displayBee();

       this.scene.popMatrix();
    }

    // Bee assembly
    displayBee() {
        // Head with eyes
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.9);
        this.scene.scale(0.3, 0.3, 0.3);
        this.head.display();

        this.scene.popMatrix();

        // Body
        this.body.display();

        // 4 Paws
        this.scene.pushMatrix();

        this.scene.translate(0, 0.4, 0.2);
        this.paw.display();
        this.scene.translate(0, 0, -0.4);
        this.paw.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.paw.display();
        this.scene.translate(0, 0, -0.4);
        this.paw.display();

        this.scene.popMatrix();

        // 2 Antennaes
        this.scene.pushMatrix();

        this.scene.translate(0, 0.2, 1);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.scale(0.1, 0.1, 0.1);
        this.antennae.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0.2, 1);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.scale(0.1, 0.1, 0.1);
        this.antennae.display();

        this.scene.popMatrix();

        // Update the wing position with the new angle of the wing rotation
        this.wing.updateWingRotation(this.wingRotation);
        
        // 2 Wing pairs
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.2);
        this.scene.rotate(Math.PI/4 , 0, 0, 1);
        this.scene.rotate(-Math.PI/4 , 0, 0, 1);
        this.scene.scale(0.5, 0.5, 0.5);
        this.wing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.2);
        this.scene.rotate(-Math.PI/4 , 0, 0, 1);
        this.scene.rotate(Math.PI/4 , 0, 0, 1);
        this.scene.scale(-0.5, 0.5, 0.5);
        this.wing.display();

        this.scene.popMatrix();

        // Check if the bee is carrying the pollen and display it
        if (this.beePollen != null) {
            this.scene.pushMatrix();
            
            this.scene.translate(0.8 - this.beePollen.position.x, -0.5 - this.beePollen.position.y, 0.2 - this.beePollen.position.z);
            this.beePollen.display();

            this.scene.popMatrix();
        }
    }

    // Animation and bee motion
    update(timeSinceAppStart) {
        // Update the angle of the wing rotation during the time
        this.wingRotation = (Math.PI/6) * Math.sin(timeSinceAppStart*Math.PI*4);
        
        // Check if it has a animation to perform (go down, go up, go to the hive)
        if (this.isAnimationStarted) {
            this.animStartTimeSecs = timeSinceAppStart;
            this.isAnimationStarted = false;
        }

        var elapsedTimeSecs = timeSinceAppStart - this.animStartTimeSecs;

        // Check if it is still on animation time and perform it
        if (elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.animDurationSecs) {
            if (this.speed.direction == "Down") {
                if (this.flower != null) {
                    this.speed.direction = "Stop";
                } else {
                    this.checkFlowers();
                    this.position.y = (this.positionOnTheGround - this.startPosition.y)*elapsedTimeSecs*elapsedTimeSecs/(this.animDurationSecs*this.animDurationSecs) + this.startPosition.y;
                }
            }
            else if (this.speed.direction == "Up") {
                this.position.y = (this.startPosition.y - this.initialPosition.y)*elapsedTimeSecs*elapsedTimeSecs/(this.animDurationSecs*this.animDurationSecs) + 2*(this.initialPosition.y - this.startPosition.y)*elapsedTimeSecs/this.animDurationSecs + this.startPosition.y;
            } 
            // Go to the hive direction
            else if (this.speed.direction == "Chasing") {
                this.position.x = this.startPosition.x + (elapsedTimeSecs/this.animDurationSecs) * (this.hive.position.x - this.startPosition.x);
                this.position.y =  ((this.hive.position.y + this.hive.boxSize/2 + this.body.bodyRadius + 0.1) - this.startPosition.y)*elapsedTimeSecs*elapsedTimeSecs/(this.animDurationSecs*this.animDurationSecs) + this.startPosition.y;     //this.startPosition.y + (elapsedTimeSecs/this.animDurationSecs) * ((this.hive.position.y + this.hive.boxSize/2 + this.body.bodyRadius + 0.1) - this.startPosition.y);
                this.position.z = this.startPosition.z + (elapsedTimeSecs/this.animDurationSecs) * (this.hive.position.z - this.startPosition.z);
            }
        // If animation is finished
        } else {
            if (this.speed.direction == "Down") {
                this.speed.direction = "Stop";
            }
            if (this.speed.direction == "Up") this.speed.direction = "Forward";
            // Leave the pollen in the hive
            if (this.speed.direction == "Chasing") {
                this.hive.pollens.push(this.beePollen);
                this.beePollen = null;
                this.speed.direction = "Stop";
            }

            // Bee oscilation up and down
            this.position.y += 0.03*Math.sin(timeSinceAppStart * Math.PI);
        }

        // Bee motion in the XZ plane
        var elapsedSpeedTime = (timeSinceAppStart - this.timeSpeedStarted);
        this.timeSpeedStarted = timeSinceAppStart;
        if (this.speed.direction !== "Stop" && this.speed.direction != "Chasing") {
            this.position.x += this.speed.value * Math.sin(this.orientation)*elapsedSpeedTime;
            this.position.z += this.speed.value * Math.cos(this.orientation)*elapsedSpeedTime;
        }
    }

    // Change bee orientation
    turn(v) {
        if (this.speed.direction == "Forward" || this.speed.direction == "Stop")
            this.orientation += v;
    }

    // Increase or decrease bee speed
    accelerate(v) {
        if (this.speed.direction == "Forward") {
            var speed = this.speed.value + v;
            if (speed < 0) this.speed.value = 0;
            else this.speed.value = speed;
        }
    }

    // Return bee to the initial state
    reset() {
        this.speed.value = 0;
        this.speed.direction = "Forward";
        this.orientation = 0;
        this.position = {x: this.initialPosition.x, y: this.initialPosition.y, z: this.initialPosition.z};
    }

    // Turn on the bee animation to do down
    goDown(garden) {
        if (this.speed.direction == "Forward") {
            this.isAnimationStarted = true;
            
            if (this.speed.value != 0)  this.animDurationSecs = 10/this.speed.value;
            else this.animDurationSecs = 2;

            this.startPosition = {x: this.position.x, y: this.position.y, z: this.position.z};
            this.speed.direction = "Down";

            this.garden = garden;
        }
    }

    // Check if there is some flower while is going down
    checkFlowers() {
        for (var i = 0; i < this.garden.flowers.length; i++) { 
            var flower = this.garden.flowers[i];
            var xDistance = Math.abs(this.position.x - flower.position.x);
            var yDistance = Math.abs(this.position.y - flower.position.y);
            var zDistance = Math.abs(this.position.z - flower.position.z);

            if (xDistance < this.gapXZ && yDistance < this.gapY && zDistance < this.gapXZ) {
                this.flower = flower;
            }
        }
    }

    // Check if there is some pollen to get and turn on the bee animation to go up
    getPollenAndGoUp() {
        if (this.speed.direction == "Stop") {
            if (this.beePollen == null) this.getPollen();
            this.isAnimationStarted = true;

            if (this.speed.value != 0)  this.animDurationSecs = 10/this.speed.value;
            else this.animDurationSecs = 2;

            this.startPosition = {x: this.position.x, y: this.position.y, z: this.position.z};
            this.speed.direction = "Up";

            this.flower = null;
        }
    }

    // Get the pollen from a flower in the garden if it could find a flower when went down
    getPollen() {
        if (this.flower != null && this.flower.pollen != null) {
            this.beePollen = this.flower.pollen;
            this.flower.pollen = null;
        }
    }

    // Turn on the bee animation to go to the hive and leave the pollen
    dropPollen(hive) {
        if (this.speed.direction == "Forward" && this.beePollen != null) {
            this.isAnimationStarted = true;
            this.animDurationSecs = 4;
            this.speed.direction = "Chasing";
            this.hive = hive;
            this.startPosition = {x: this.position.x, y: this.position.y, z: this.position.z};
            //this.allignOrientation();
        }
    }

    // Allign bee orientation during the path to the hive
    /*allignOrientation() {
        if (this.hive.position.z == 0) {
            if (this.hive.position.x > 0)
                this.orientation = Math.PI/2 - this.orientation;
            else if (this.hive.position.x < 0) 
                this.orientation = 3*Math.PI/2 - this.orientation;
            else this.orientation = 3*Math.PI/2 - this.orientation;
        }
        else this.orientation -= Math.atan(this.hive.position.x/this.hive.position.z);
    }*/
}
