import { CGFobject } from '../../lib/CGF.js';
/**
 * MyOval
 * @constructor
 * @param scene - Reference to MyScene object
 * @param raio - Radius value
 * @param nrSlices - Number of divisions around Y axis
 * @param nrStacks - Number of divisions in a semi-sphere since equador to the pole
 */
export class MyOval extends CGFobject {
    constructor(scene, raio, nrSlices, nrStacks) {
        super(scene);

        // nrSlices = 30, nrStacks = 30, raio = 1 if they are not provided
		nrSlices = typeof nrSlices !== 'undefined' ? nrSlices : 20;
		nrStacks = typeof nrStacks !== 'undefined' ? nrStacks : 20;
        raio = typeof raio !== 'undefined' ? raio : 1;

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
        var deltaTheta = 2 * Math.PI / this.nrSlices;
        var deltaPhi = Math.PI / (2*this.nrStacks);

        // Vertices and normals
        for (var i = 0; i <= 2*this.nrStacks; i++) {
            for (var j = 0; j <= this.nrSlices; j++) {
                var normal = [];

                // Scale Factor for the different hemispheres
                var scaleFactor = i < this.nrStacks ? 2 : 1.2;
                var ssa = Math.sin(phi) * Math.sin(theta);
                var sca = Math.sin(phi) * Math.cos(theta);
                var ca = Math.cos(phi);

                this.vertices.push(this.raio * ssa, this.raio * ca * scaleFactor, this.raio * sca);
                
                normal[0] = this.raio * ssa;
                normal[1] = this.raio * ca * scaleFactor;
                normal[2] = this.raio * sca;

                var size = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2]);

                normal[0] /= size;
                normal[1] /= size;
                normal[2] /= size;

                this.normals.push(...normal);
                this.texCoords.push(j / this.nrSlices, i / (this.nrStacks));
                theta += deltaTheta;
            }
            theta = 0;
            phi += deltaPhi;
        }

        // Indices
        for (var i = 0; i < 2*this.nrStacks; i++) {
            for (var j = 0; j < this.nrSlices; j++) {
                var vert1 = i * (this.nrSlices + 1) + j;
                var vert2 = vert1 + this.nrSlices + 1;

                this.indices.push(vert1, vert2, vert1 + 1, vert2, vert2 + 1, vert1 + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
