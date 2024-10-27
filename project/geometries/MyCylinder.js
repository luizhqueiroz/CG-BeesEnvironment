import { CGFobject } from "../../lib/CGF.js";
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the cylinder
 * @param len - Length of the cylinder
 * @param slices - Number of divisions around Y axis
 * @param stacks - Number of divisions along the height
 */
export class MyCylinder extends CGFobject {
    constructor(scene, radius, len, slices, stacks) {
		super(scene);

        radius = typeof radius !== 'undefined' ? radius : 0.2;
        len = typeof len !== 'undefined' ? len : 5;
        slices = typeof slices !== 'undefined' ? slices : 30;
		stacks = typeof stacks !== 'undefined' ? stacks : 30;
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.len = len;

		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alphaAng = 2 * Math.PI / this.slices;
        var stackHeight = this.len / this.stacks;

        // Vertices and normals
        for (var i = 0; i <= this.stacks; i++) {
            var y = i * stackHeight - this.len;

            for (var j = 0; j <= this.slices; j++) {
                var ang = j * alphaAng;
                var x = Math.cos(ang) * this.radius;
                var z = Math.sin(ang) * this.radius;

                this.vertices.push(x, y, z);
                this.normals.push(x, 0, z);

                // Calculate the coordinates of the texture
                var u = j / this.slices;
                var v = i / this.stacks;
                this.texCoords.push(u, v);

                // Indices
                if (i < this.stacks && j < this.slices) {
                    var current = i * (this.slices + 1) + j;
                    var next = current + this.slices + 1;

                    this.indices.push(current, next, current + 1);
                    this.indices.push(next, next + 1, current + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
