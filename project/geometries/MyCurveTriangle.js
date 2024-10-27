import { CGFobject } from '../../lib/CGF.js';
/**
 * MyCurveTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param maxHeight - Maximum height of the triangle
 * @param width -  Width of the triangle
 */
export class MyCurveTriangle extends CGFobject {
    constructor(scene, maxHeight, width) {
        super(scene);

        maxHeight = typeof maxHeight !== 'undefined' ? maxHeight : 5;
        width = typeof width !== 'undefined' ? width : 0.2;
        this.maxHeight = maxHeight;
        this.width = width;

        // height of the triangle
        this.height = Math.ceil(this.maxHeight * (0.5 + Math.random() * 0.5));
        // curvature of the triangle
        this.curvature = (Math.random() * 30 - 15) * Math.PI/180;
        // Number of divisions of the triangle in smaller poligons
        this.subdivision = Math.ceil(maxHeight);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
		this.normals = [];
        this.indices = [];

        var heightDivision = this.height/this.subdivision;
        var widthDivision = this.width/this.subdivision;
        var k = this.subdivision;
        var offset = 0;

        // Vertices and Normals
        for (var i = 0; i <= this.subdivision; i++) {
            for (var j = 0; j <= k; j++) {
                this.vertices.push(
                    offset + j * widthDivision, i * (heightDivision) * Math.cos(this.curvature), (i*heightDivision)*Math.sin(this.curvature)
                );

                this.normals.push(
                    0, -Math.sin(this.curvature), Math.cos(this.curvature)
                );
            }
            offset += widthDivision/2; 
            k--;
        }

        // Back vertices and normals
        var n = this.vertices.length;
        for (let i = 0; i < n; i++) {
            this.vertices.push(this.vertices[i]);
        }
        for (let i = 0; i < n; i++) {
            this.normals.push(-this.normals[i]);
        }
      
        // Indices for creating front and back of the triangle
        k = this.subdivision;
        var count = this.subdivision + 1;
        for (var i = 1; i <= this.subdivision; i++) {
            for (var j = 1; j <= k; j++) {
                var vert1 = count - (k+1);
                var vert2 = count;
                var vert1Back = count - (k+1) + this.vertices.length/6;
                var vert2Back = count + this.vertices.length/6;
                if (j != k) {
                    this.indices.push(
                        vert1,
                        vert1 + 1,
                        vert2, 
                        vert2,
                        vert1 + 1,
                        vert2 + 1,
                        vert1Back,
                        vert2Back,
                        vert1Back + 1,
                        vert2Back,
                        vert2Back + 1,
                        vert1Back + 1
                    );
                } else {
                    this.indices.push(
                        vert1,
                        vert1 + 1,
                        vert2,
                        vert1Back,
                        vert2Back,
                        vert1Back + 1
                    );
                }
                count++;
            }
            k--;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
