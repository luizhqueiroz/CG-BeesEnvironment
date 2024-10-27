import {CGFobject} from '../../lib/CGF.js';
/**
 * MySquare
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param size - Size of the square edge
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MySquare extends CGFobject {
	constructor(scene, size, coords) {
		super(scene);

		this.halfSize = size/2;

		this.initBuffers();

		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-this.halfSize, -this.halfSize, 0,	//0
			this.halfSize, -this.halfSize, 0,	//1
			-this.halfSize, this.halfSize, 0,	//2
			this.halfSize, this.halfSize, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			0, 2, 1,
			1, 2, 3
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the square
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
