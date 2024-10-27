import { CGFscene, CGFcamera, CGFaxis, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyBee } from "./objects/MyBee.js";
import { MyHive } from "./objects/MyHive.js";
import { MyGrass } from "./objects/MyGrass.js";
import { MyTerrain } from "./objects/MyTerrain.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Textures
    this.enableTextures(true);

    this.earthTexture = new CGFtexture(this, "images/earth.jpg");
    this.grassTexture = new CGFtexture(this, "images/grass.jpg");
    this.rockTexture = new CGFtexture(this, "images/rock.jpg");
    this.woodTexture = new CGFtexture(this, "images/wood.jpg");
    this.pollenTexture = new CGFtexture(this, "images/pollen.jpg");
    this.panoramaTexture = new CGFtexture(this, "images/panorama.jpg");

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this, {x: 0, y: -100, z: 0}, this.grassTexture);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.garden = new MyGarden(this, 5, 5, {x: 15, y: -100, z: 20});
    this.rockSet = new MyRockSet(this, this.rockTexture, 20, {x: -20, y: -100, z: -20});
    this.bee = new MyBee(this, {x: 0, y: -85, z: 0});
    this.hivePollen = null;
    this.hive = new MyHive(this, this.woodTexture, 5, {x: this.rockSet.position.x + 1, y: this.rockSet.topPosition, z: this.rockSet.position.z + 1});
    this.grass = new MyGrass(this, 50, 50, {x: 3, y: -100, z: 10});

    // Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.gardenValues = {'Row' : 5, 'Col' : 5};
    this.displayTerrain = false;
    this.displayPanorama = false;
    this.displayRockSet = false;
    this.displayGarden = false;
    this.displayHive = false;
    this.displayBee = false;
    this.displayGrass = false;
    this.focusBee = true;

    // Animation
    this.setUpdatePeriod(50);
    
    // Current time in milisecs
    this.appStartTime=Date.now();

    // Shader initialization
    this.shader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");

    this.shader.setUniformsValues({ timeFactor: 0 });

    // Shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.2,
      0.1,
      1000,
      vec3.fromValues(-50, -85, 0),
      vec3.fromValues(0, -85, 0)
    );
  }

  // Update the garden changing the amount of the flowers
  updateGardenMatrix() {
    this.garden = new MyGarden(this, this.gardenValues['Row'], this.gardenValues['Col'], this.garden.position);
  }

  // Updates with time t
  update(t) {
    var timeSinceAppStart = (t-this.appStartTime)/1000.0;

    this.bee.update(timeSinceAppStart);
    this.checkKeys();

    this.shader.setUniformsValues({timeFactor: Math.sin(2 * Math.PI * (timeSinceAppStart/2.0))});

    // Put the camera on the bee
    if (this.focusBee) this.camera.setTarget(vec3.fromValues(this.bee.position.x, this.bee.position.y, this.bee.position.z));
  }

  // Keyboard control
  checkKeys() {
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      this.bee.accelerate(this.speedFactor*1);
    }

    if (this.gui.isKeyPressed("KeyS")) {
      this.bee.accelerate(-this.speedFactor*0.8);
    }

    if (this.gui.isKeyPressed("KeyA")) {
      this.bee.turn(this.speedFactor*Math.PI/36);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      this.bee.turn(-this.speedFactor*Math.PI/36);
    }

    if (this.gui.isKeyPressed("KeyR")) {
      this.bee.reset();
    }

    if (this.gui.isKeyPressed("KeyF")) {
      this.bee.goDown(this.garden);
    }

    if (this.gui.isKeyPressed("KeyP")) {
      this.bee.getPollenAndGoUp();
    }

    if (this.gui.isKeyPressed("KeyO")) {
      this.bee.dropPollen(this.hive);
    }
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    if (this.displayPanorama) this.panorama.display();
    if (this.displayRockSet) this.rockSet.display();
    if (this.displayGarden) this.garden.display();
    if (this.displayHive) this.hive.display();
    if (this.displayBee) this.bee.display();
    if (this.displayGrass) {
      this.setActiveShader(this.shader);
      this.grass.display();
      this.setActiveShader(this.defaultShader);
    }
    if (this.displayTerrain) this.terrain.display();

    // ---- END Primitive drawing section
  }
}
