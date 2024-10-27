import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - Triangle height
 * @param width - Triangle width
 */
export class MyTriangle extends CGFobject {
	constructor(scene, height, width) {
		super(scene);

		// height = 3, width = 0.5 if they are not provided
		height = typeof height !== 'undefined' ? height : 3;
		width = typeof width !== 'undefined' ? width : 0.5;

		this.height = height;
		this.width = width;

		this.initBuffers();
	}
	
	initBuffers() {
		// Vertices front and back
		this.vertices = [
			-this.width, 0, 0,	// 0
			0, this.height, 0,	// 1
			this.width, 0, 0,	// 2
			-this.width, 0, 0,	// 0
			0, this.height, 0,	// 1
			this.width, 0, 0	// 2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			3, 4, 5
		];

		// Normals front and back
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		// Texture coordinates
		this.texCoords = [
			0, 0,
			1, 0.5,
			0, 1,
			0, 0,
			1, 0.5,
			0, 1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
