#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

varying vec3 vVertexPosition;
varying vec3 vVertexNormal;

void main() {
    // Transformed Vertex position
    vec4 vertex = uMVMatrix * vec4(vVertexPosition, 1.0);
    
    // Randomizing using the positions x, y and z of the vertices and the time effect to create an ondulation on the grass
    vec3 offset = vec3(0.05*timeFactor*(aVertexPosition.y*aVertexPosition.y) + 0.0025*timeFactor*vertex.x*aVertexPosition.y, 0.0, 0.04*timeFactor*(aVertexPosition.y*aVertexPosition.y) + 0.0035*timeFactor*vertex.z*aVertexPosition.y);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    vVertexPosition = aVertexPosition;
    vVertexNormal = aVertexNormal;
}