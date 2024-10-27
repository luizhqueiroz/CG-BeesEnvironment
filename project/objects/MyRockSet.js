import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
* MyRockSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Rocks's texture
 * @param numRocks - Number of rocks
 * @param position - Position of the rock set
*/
export class MyRockSet extends CGFobject {
    constructor(scene, texture, numRocks, position) {
		super(scene);

        // numRocks = 20 if it is not provided
        numRocks = typeof numRocks !== 'undefined' ? numRocks : 20;

        this.rockRadius = 5;
        this.rock = new MyRock(this.scene, this.rockRadius);
        this.texture = texture;
        this.numRocks = numRocks;
        this.position = {x: position.x, y: position.y, z: position.z};
        this.topPosition = position.y;

        this.initMaterials();
        this.initRocksArrangement();
    }

    // init the rock material
    initMaterials() {
        this.rockMaterial = new CGFappearance(this.scene);
        this.rockMaterial.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.rockMaterial.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.rockMaterial.setSpecular(0.6, 0.6, 0.6, 1.0);
        this.rockMaterial.setShininess(10.0);
        this.rockMaterial.setTexture(this.texture);
    }

    // Init the random arrangement of the rocks to create the set
    initRocksArrangement() {
        this.rocksArrangement = [];

        var numRocks = this.numRocks;
        var layer = 0;
        var rocksInCurrentLayer = Math.ceil(numRocks/2);
        var theta = 0;
        var deltaTheta = 2*Math.PI/numRocks;
        for (var i = 0; i < this.numRocks; i++) {
            // Generating random positions for rocks in each layer of the set
            var layerRadius = 2.5*Math.sqrt(numRocks);
            var positionX = (Math.random() * layerRadius + 0.5) * Math.sin(theta);
            var positionZ = (Math.random() * layerRadius + 0.5) * Math.cos(theta);
            var positionY = layer * 1.5;
            theta += deltaTheta;
       
            // Update the parameters for the next layer
            if (i != 0 && i % rocksInCurrentLayer == 0) {
                layer++;
                numRocks = numRocks - rocksInCurrentLayer;
                rocksInCurrentLayer = Math.ceil(numRocks/2);
                theta = 0;
                deltaTheta = 2*Math.PI/numRocks;
            }
            
            // Random values to scale the rock
            var scale = {
                x: Math.random() * 0.7 + 0.6,
                y: Math.random() * 0.5 + 0.5, 
                z: Math.random() * 0.7 + 0.6  
            };
       
            // Random values to the position of the rock
            var position = {
                x: positionX, 
                y: positionY, 
                z: positionZ
            };
            
            // Random rotation for the rock
            var rotation = Math.random() * Math.PI;

            this.rocksArrangement.push({scale, position, rotation});

            // Calculate the top position to put the hive
            this.topPosition = Math.max(this.topPosition, this.position.y + position.y + scale.y*this.rockRadius);
        }
    }

    // Display the rocktset in a given position
    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.displayRockSet();

        this.scene.popMatrix();
    }

    // Assembly the rock set applying random values to each rock (position, rotation and scale)
    displayRockSet() {
        this.rockMaterial.apply();

        for (var arrangement of this.rocksArrangement) {
            this.scene.pushMatrix();
            
            this.scene.translate(arrangement.position.x, arrangement.position.y, arrangement.position.z);
            this.scene.rotate(arrangement.rotation, 0, 1, 0);
            this.scene.scale(arrangement.scale.x, arrangement.scale.y, arrangement.scale.z);
            this.rock.display();
            
            this.scene.popMatrix();
        }
    }
}
