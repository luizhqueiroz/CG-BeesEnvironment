import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyCurveTriangle } from '../geometries/MyCurveTriangle.js';
/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 * @param grassDimenX - Dimension of the grass in X
 * @param grassDimZ - Dimension of the grass in Z
 * @param position - Position of the grass
 */
export class MyGrass extends CGFobject {
    constructor(scene, grassDimenX, grassDimZ, position) {
        super(scene);

        // grassDimenX = 50, grassDimenZ = 50 if they are not provided
        grassDimenX = typeof grassDimenX !== 'undefined' ? grassDimenX : 50;
        grassDimZ = typeof grassDimZ !== 'undefined' ? grassDimZ : 50;

        this.triangleWidth = 0.3;
        this.maxHeight = 5;
        this.colSpace = 0.5;
        this.rowSpace = 1.0;
        this.numTriangleRow = Math.floor(grassDimenX/this.rowSpace);
        this.numCol = Math.floor(grassDimZ/this.colSpace);
        this.position = {x: position.x, y: position.y, z: position.z};
        this.triangles = [];
        this.triangleTranslateX = [];
        this.triangleTranslateZ = [];
        //this.triangle = new MyTriangle(this.scene, 1, this.triangleWidth);
        //this.triangleArrangement = [];

        this.initMaterials();
        this.initTriangles();
        this.initTrianglesArrangement();
    }

    // Init grass material
    initMaterials() {
        this.materialVerde = new CGFappearance(this.scene);
        this.materialVerde.setAmbient(0.38, 0.56, 0.22, 1.0);
        this.materialVerde.setDiffuse(0.38, 0.56, 0.22, 1.0);
        this.materialVerde.setSpecular(0.38, 0.56, 0.22, 0.6);
        this.materialVerde.setEmission(0.38, 0.56, 0.22, 1.0);
        this.materialVerde.setShininess(10.0);
    }

    // Init the curved triangles in the grass with max height and width
    initTriangles() {
        for (var i = 0; i < this.numTriangleRow; i++) {
            this.triangles.push(new MyCurveTriangle(this.scene, this.maxHeight, this.triangleWidth));
        }
    }

    // Init the random position for the triangles along the grass area
    initTrianglesArrangement() {
        for (var j = 0; j < this.numCol; j++) {
            this.triangleTranslateZ.push(Math.random() * this.colSpace);
            for (var i = 0; i < this.numTriangleRow; i++) {  
                this.triangleTranslateX.push(Math.random() * this.rowSpace);
            }
        }
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.displayGrass();

        this.scene.popMatrix();
    }

    // Assembly the triangles in the grass
    displayGrass() {
        this.materialVerde.apply();

        // Assembly the triangles in row and column with different positions
        this.scene.pushMatrix();
        for (var j = 0; j < this.numCol; j++) {
            this.scene.pushMatrix();

            this.scene.translate(0, 0, this.triangleTranslateZ[j]);

            this.scene.pushMatrix();
            for (var i = 0; i < this.numTriangleRow; i++) {

                this.scene.pushMatrix();

                this.scene.translate(this.triangleTranslateX[i+j], 0, 0);
                this.triangles[i].display();

                this.scene.popMatrix();

                this.scene.translate(this.rowSpace, 0, 0);
            }
            this.scene.popMatrix();

            this.scene.popMatrix();

            this.scene.translate(0, 0, this.colSpace);
        }
        this.scene.popMatrix();
    }

    // Another way of creating the grass
    /*initTrianglesArrangement() {
        var totalTriangles = this.numTriangleRow * this.numCol;
        for (var i = 0; i < totalTriangles; i++) {
            var scaleY = this.maxTriangleHeight * (0.5 + Math.random() * 0.5);
            var curvature = (Math.random() * 45) * Math.PI/180;

            var arrangement = {scaleY: scaleY, curvature: curvature};

            this.triangleArrangement.push(arrangement);
        }
    }*/
    
    /*displayGrass() {
        this.materialVerde.apply();
        for (var i = 0; i < this.numTriangleRow; i++) {
            for (var j = 0; j < this.numCol; j++) {
                this.scene.pushMatrix();

                this.scene.translate(j * this.triangleWidth, 0, i * this.columnSpace);
                this.scene.rotate(this.triangleArrangement[i+j].curvature, 1, 0, 0);
                this.scene.scale(1, this.triangleArrangement[i+j].scaleY, 1);
                this.triangle.display();
                
                this.scene.popMatrix();
            }
        }
    }*/
}
