import { CGFobject } from '../../lib/CGF.js';
/**
* MyRock
* @constructor
 * @param scene - Reference to MyScene object
 * @param raio - Radius value
 * @param nrSlices - number of divisions around Y axis
 * @param nrStacks - number of divisions in a semi-sphere since equador to the pole
*/
export class MyRock extends CGFobject {
	constructor(scene, raio, nrSlices, nrStacks) {
		super(scene);

		// nrSlices = 10, nrStacks = 10, raio = 1 if they are not provided
		nrSlices = typeof nrSlices !== 'undefined' ? nrSlices : 10;
		nrStacks = typeof nrStacks !== 'undefined' ? nrStacks : 10;
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
        var deltaTheta = 2*Math.PI/this.nrSlices;
        var deltaPhi = (Math.PI/2)/(this.nrStacks);

        // Verticies, normals and text coordinates
        for (var i = 0; i <= 2*this.nrStacks; i++) {
            var sameVertices = [];
            var sameNormal = [];
            for (var j = 0; j <= this.nrSlices; j++) {
                var normal = [];

                // Randomizing to create slits
                var randomX = this.raio + (Math.random() * 0.6 - 0.3);
                var randomY = (Math.random()*0.3 + 0.5) * this.raio;
                var randomZ = this.raio + (Math.random() * 0.6 - 0.3);

                var sca = Math.sin(phi)*Math.cos(theta);
                var ssa = Math.sin(phi)*Math.sin(theta);
                var ca = Math.cos(phi);

                // Check to allign the vertices in the closure
                if (j != this.nrSlices) {
                    this.vertices.push(randomX*ssa, randomY*ca, randomZ*sca); 

                    normal[0] = randomX*ssa;
                    normal[1] = randomY*ca;
                    normal[2] = randomZ*sca;
    
                    // Calculate the normals
                    var size = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2]);
                    normal[0] /= size;
                    normal[1] /= size;
                    normal[2] /= size;
                    
                    // Repeat the vertices in the closure
                    if (j == 0) {
                        sameVertices = [randomX*ssa, randomY*ca, randomZ*sca];
                        sameNormal = [...normal];
                    }
                } else {
                    this.vertices.push(...sameVertices);
                    normal = [...sameNormal];
                }

                this.normals.push(...normal);
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

                this.indices.push(
                                vert1, vert2, vert1 + 1,
                                vert2, vert2 + 1, vert1 + 1
                            );
            }
        }
    
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}
}
