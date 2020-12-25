(this["webpackJsonpfull-distortion"]=this["webpackJsonpfull-distortion"]||[]).push([[0],{16:function(e,n,t){},17:function(e,n,t){},18:function(e,n,t){"use strict";t.r(n);var i=t(1),r=t(3),o=t.n(r),s=t(8),a=t.n(s),c=(t(16),t(17),t(4)),v=t(9),m=t(2),l=t(6),h=t(5),u=t(0),d=t(10),x=function(e){Object(l.a)(t,e);var n=Object(h.a)(t);function t(e){var i;return Object(c.a)(this,t),(i=n.call(this,e)).setupResize=function(){window.addEventListener("resize",i.resize)},i.resize=function(){i.width=i.container.offsetWidth,i.height=i.container.offsetHeight,i.renderer.setSize(i.width,i.height),i.camera.aspect=i.width/i.height,console.log("resize"),i.imageAspect=853/1280,i.camera.updateProjectionMatrix(),console.log(i.camera)},i.start=i.start.bind(Object(m.a)(i)),i.stop=i.stop.bind(Object(m.a)(i)),i.animate=i.animate.bind(Object(m.a)(i)),i}return Object(v.a)(t,[{key:"componentDidMount",value:function(){this.scene=new u.j,this.renderer=new u.r({antialias:!0}),this.renderer.setClearColor(0,1),this.renderer.setSize(this.width,this.height),this.renderer.physicallyCorrectLights=!0,this.renderer.outputEncoding=u.s,this.container=document.getElementById("scene"),this.width=this.mount.clientWidth,this.height=this.mount.clientHeight,this.mount.appendChild(this.renderer.domElement),this.camera=new u.g(75,this.width/this.height,.1,1e3),this.camera.position.set(0,0,3),this.controls=new d.a(this.camera,this.renderer.domElement),this.time=0,this.setupResize(),this.addObjects(),this.addParticles(),this.animate(),this.resize()}},{key:"addParticles",value:function(){this.particleMaterial=new u.k({extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},side:u.c,uniforms:{time:{type:"f",value:0},resolution:{type:"v4",value:new u.q},uvRate1:{value:new u.o(1,1)}},wireframe:!0,vertexShader:"\n\nuniform float time;\n\n\nvarying vec2 vUv;\nvarying vec2 vUv1;\nvarying vec4 vPosition;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform vec2 pixels;\nuniform vec2 uvRate1;\n\n\nvoid main()\t{\n  \n    vUv = uv;\n\n    vec3 p = position;\n\n    p.y += 0.1 * (sin(p.y*5. + time) * 0.5 + 0.5);\n    p.z += 0.05 * (sin(p.y*10. + time) * 0.5 + 0.5);\n\n    vec4 mvPosition = modelViewMatrix * vec4(p, 1.);\n    gl_PointSize = 1. * (1. / -mvPosition.z);\n    gl_Position = projectionMatrix * mvPosition;\n\n}\n",fragmentShader:"\n\nuniform float time;\nuniform float progress;\nuniform sampler2D texture1;\n\n\n\nvoid main()\t{\n   \n    gl_FragColor = vec4(0.826,0.999,0.999,0.4);\n\n}\n"});var e=4e4,n=new Float32Array(3*e);this.particleGeometry=new u.b;for(var t=Math.PI*(3-Math.sqrt(5)),i=2/e,r=0;r<e;r++){var o=r*i-1+i/2,s=Math.sqrt(1-o*o),a=r*t;n[3*r]=1.7*Math.cos(a)*s,n[3*r+1]=1.7*o,n[3*r+2]=1.7*Math.sin(a)*s}this.particleGeometry.setAttribute("position",new u.a(n,3)),this.points=new u.h(this.particleGeometry,this.particleMaterial),this.scene.add(this.points)}},{key:"addObjects",value:function(){this.material=new u.k({extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},side:u.c,uniforms:{time:{type:"f",value:0},resolution:{type:"v4",value:new u.q},uvRate1:{value:new u.o(1,1)}},vertexShader:"\n\nuniform float time;\nvarying vec2 vUv;\nvarying vec2 vUv1;\nvarying vec4 vPosition;\n\nvarying vec3 vColor;\nvarying vec3 vNormal;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform vec2 pixels;\nuniform vec2 uvRate1;\n\n//\tSimplex 3D Noise \n//\tby Ian McEwan, Ashima Arts\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C \n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n// Permutations\n  i = mod(i, 289.0 ); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients\n// ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvec3 hsv2rgb(vec3 c) {\n    vec4 K = vec4(1.0,2.0/3.0,1.0/3.0,3.0);\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n\n    return c.z * mix(K.xxx, clamp(p-K.xxx, 0.0, 1.0), c.y);\n}\n\n\nvoid main()\t{\n\n    float noise = snoise(position*10. + time/20.);\n\n    vec3 newposition = position*(noise + 0.5);\n\n\n    vColor  = hsv2rgb(vec3( noise * 0.1 + 0.03,0.8,0.8));\n    vNormal = normal;\n\n\n  \n    //vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);\n\n}\n",fragmentShader:"\n\nuniform float time;\nuniform float progress;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform vec4 resolution;\nvarying vec2 vUv;\nvarying vec4 vPosition;\n\nvarying vec3 vColor;\nvarying vec3 vNormal;\n\n\nvoid main()\t{\n  \n    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n    vec3 light = vec3(0.);\nvec3 skyColor = vec3(1.000,1.000, 0.547);\nvec3 groundColor = vec3(0.562,0.275, 0.111);\n    vec3 lightDirection = normalize(vec3(0.,-1.,-1.));\n\n    light += dot(lightDirection, vNormal );\n\n    light = mix(skyColor, groundColor, dot(lightDirection,vNormal));\n\n\n    gl_FragColor = vec4(vColor,1.);\n    gl_FragColor = vec4(light * vColor,1.);\n\n}\n"}),this.geometry=new u.l(1,362,362),this.plane=new u.f(this.geometry,this.material),this.scene.add(this.plane)}},{key:"componentWillUnmount",value:function(){this.stop(),this.mount.removeChild(this.renderer.domElement)}},{key:"start",value:function(){this.frameId||(this.frameId=requestAnimationFrame(this.animate))}},{key:"stop",value:function(){cancelAnimationFrame(this.frameId)}},{key:"animate",value:function(){this.time+=.05,this.material.uniforms.time.value=this.time,this.particleMaterial.uniforms.time.value=this.time,this.points.rotation.y=this.time/10,this.renderScene(),this.frameId=requestAnimationFrame(this.animate)}},{key:"renderScene",value:function(){this.renderer.render(this.scene,this.camera)}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{id:"scene",ref:function(n){e.mount=n}})}}]),t}(r.Component);var p=function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("div",{className:"frame",children:[Object(i.jsx)("h1",{className:"frame__title",children:"Front-End Experimentaion"}),Object(i.jsx)("div",{className:"frame__links"}),Object(i.jsxs)("div",{className:"frame__nav",children:[Object(i.jsx)("a",{className:"frame__link",href:"https://isengupt.github.io/raycast-glow/",children:"Previous"}),Object(i.jsx)("a",{className:"frame__link",href:"#",children:"Resume"}),Object(i.jsx)("a",{className:"frame__link",href:"https://github.com/isengupt/noise-morph/",children:"GitHub"})]})]}),Object(i.jsx)(x,{})]})},f=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,19)).then((function(n){var t=n.getCLS,i=n.getFID,r=n.getFCP,o=n.getLCP,s=n.getTTFB;t(e),i(e),r(e),o(e),s(e)}))};a.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(p,{})}),document.getElementById("root")),f()}},[[18,1,2]]]);
//# sourceMappingURL=main.467655de.chunk.js.map