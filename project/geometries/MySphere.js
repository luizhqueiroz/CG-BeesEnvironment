import {CGFobject} from '../../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param raio - Radius value
 * @param isVisibleInside - If the sphere is visible from inside or outside
 * @param nrSlices - Number of divisions around Y axis
 * @param nrStacks - Number of divisions in a semi-sphere since equador to the pole
*/
export class MySphere extends CGFobject {
	constructor(scene, raio, isVisibleInside, nrSlices, nrStacks) {
		super(scene);

		// nrSlices = 30, nrStacks = 30, raio = 1 if they are not provided
		nrSlices = typeof nrSlices !== 'undefined' ? nrSlices : 30;
		nrStacks = typeof nrStacks !== 'undefined' ? nrStacks : 30;
        raio = typeof raio !== 'undefined' ? raio : 1;
        isVisibleInside = typeof isVisibleInside !== 'undefined' ? isVisibleInside : false;

        this.isVisibleInside = isVisibleInside;
        this.raio = raio;
		this.nrSlices = nrSlices;
		this.nrStacks = nrStacks;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
        this.indices = [];

        var theta = 0;
        var phi = 0;
        var deltaTheta = 2*Math.PI/this.nrSlices;
        var deltaPhi = (Math.PI/2)/(this.nrStacks);

        // Vertices and normals
        for (var i = 0; i <= 2*this.nrStacks; i++) {
            for (var j = 0; j <= this.nrSlices; j++) {
                var sca = Math.sin(phi)*Math.cos(theta);
                var ssa = Math.sin(phi)*Math.sin(theta);
                var ca = Math.cos(phi);

                this.vertices.push(this.raio*ssa, this.raio*ca, this.raio*sca);

                // Check the visibility to generate the normals
                if (this.isVisibleInside) this.normals.push(-ssa, -ca, -sca);
                else this.normals.push(ssa, ca, sca);
                this.texCoords.push(j/this.nrSlices, i/(2*this.nrStacks));
                theta += deltaTheta;
            }
            theta = 0;
            phi += deltaPhi;
        }

        // Indices
        for (var i = 0; i < 2*this.nrStacks; i++) {
            for (var j = 0; j < this.nrSlices; j++) {
                var vert1 =  i * (this.nrSlices + 1) + j;
                var vert2 = vert1 + this.nrSlices + 1;

                // Check the visibility to generate the indices
                if (this.isVisibleInside) {
                    this.indices.push(
                        vert1 + 1, vert2, vert1,
                        vert2 + 1, vert1 + 1, vert2
                    );
                } else {
                    this.indices.push(
                                    vert1, vert2, vert1 + 1,
                                    vert2, vert2 + 1, vert1 + 1
                                );
                    }
            }
        }
    
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}
}
