import React, { Component } from "react";
import * as THREE from "three";
import { vertex } from "./shaders/Vertex";
import { fragment } from "./shaders/Fragment";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { vertexparticle } from "./shaders/VertextParticle";
import { fragmentparticle } from "./shaders/FragmentParticles";

class Scene extends Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setSize(this.width, this.height);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container = document.getElementById("scene");
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;
    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    this.camera.position.set(0, 0, 3);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;
    this.setupResize();
    this.addObjects();
    this.addParticles();
    this.animate();
    this.resize();
  }

  addParticles() {
    let that = this;
    this.particleMaterial = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      wireframe: true,
      vertexShader: vertexparticle,
      fragmentShader: fragmentparticle,
    });

    let N = 40000;

    var positions = new Float32Array(N * 3);

    this.particleGeometry = new THREE.BufferGeometry();

    let inc = Math.PI * (3 - Math.sqrt(5));

    let off = 2 / N;
    let rad = 1.7;

    for (let i = 0; i < N; i++) {
      let y = i * off - 1 + off / 2;
      let r = Math.sqrt(1 - y * y);
      let phi = i * inc;

      positions[3 * i] = rad * Math.cos(phi) * r;
      positions[3 * i + 1] = rad * y;
      positions[3 * i + 2] = rad * Math.sin(phi) * r;
    }

    this.particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    this.points = new THREE.Points(
      this.particleGeometry,
      this.particleMaterial
    );
    this.scene.add(this.points);
  }

  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      //wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.SphereBufferGeometry(1, 362, 362);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  setupResize = () => {
    window.addEventListener("resize", this.resize);
  };

  resize = () => {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    console.log("resize");

    this.imageAspect = 853 / 1280;

    /*   let a1;
    let a2;

    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    const dist = this.camera.position.z;
    const height = 1;
    this.camera.fov = 2* (180/Math.PI) * Math.atan(height/(2*dist));

    if (this.width / this.height > 1) {
      this.plane.scale.x = this.camera.aspect;
    } else {
      this.plane.scale.y = 1 / this.camera.aspect;
    } */

    this.camera.updateProjectionMatrix();
    console.log(this.camera);
  };

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    //this.cube.rotation.x += 0.01;
    //this.cube.rotation.y += 0.01;

    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    this.particleMaterial.uniforms.time.value = this.time;
this.points.rotation.y = this.time / 10;
    this.renderScene();
    this.frameId = requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        id="scene"
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Scene;
