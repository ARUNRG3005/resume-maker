import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/Ballpit.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=abb89de4"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$();
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=abb89de4"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import {
  Vector3 as a,
  MeshPhysicalMaterial as c,
  InstancedMesh as d,
  Clock as e,
  AmbientLight as f,
  SphereGeometry as g,
  ShaderChunk as h,
  Scene as i,
  Color as l,
  Object3D as m,
  SRGBColorSpace as n,
  MathUtils as o,
  PMREMGenerator as p,
  Vector2 as r,
  WebGLRenderer as s,
  PerspectiveCamera as t,
  PointLight as u,
  ACESFilmicToneMapping as v,
  Plane as w,
  Raycaster as y
} from "/node_modules/.vite/deps/three.js?v=abb89de4";
import { RoomEnvironment as z } from "/node_modules/.vite/deps/three_examples_jsm_environments_RoomEnvironment__js.js?v=abb89de4";
class x {
  #e;
  canvas;
  camera;
  cameraMinAspect;
  cameraMaxAspect;
  cameraFov;
  maxPixelRatio;
  minPixelRatio;
  scene;
  renderer;
  #t;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render = this.#i;
  onBeforeRender = () => {
  };
  onAfterRender = () => {
  };
  onAfterResize = () => {
  };
  #s = false;
  #n = false;
  isDisposed = false;
  #o;
  #r;
  #a;
  #c = new e();
  #h = { elapsed: 0, delta: 0 };
  #l;
  constructor(e2) {
    this.#e = { ...e2 };
    this.#m();
    this.#d();
    this.#p();
    this.resize();
    this.#g();
  }
  #m() {
    this.camera = new t();
    this.cameraFov = this.camera.fov;
  }
  #d() {
    this.scene = new i();
  }
  #p() {
    if (this.#e.canvas) {
      this.canvas = this.#e.canvas;
    } else if (this.#e.id) {
      this.canvas = document.getElementById(this.#e.id);
    } else {
      console.error("Three: Missing canvas or id parameter");
    }
    this.canvas.style.display = "block";
    const e2 = {
      canvas: this.canvas,
      powerPreference: "high-performance",
      ...this.#e.rendererOptions ?? {}
    };
    this.renderer = new s(e2);
    this.renderer.outputColorSpace = n;
  }
  #g() {
    if (!(this.#e.size instanceof Object)) {
      window.addEventListener("resize", this.#f.bind(this));
      if (this.#e.size === "parent" && this.canvas.parentNode) {
        this.#r = new ResizeObserver(this.#f.bind(this));
        this.#r.observe(this.canvas.parentNode);
      }
    }
    this.#o = new IntersectionObserver(this.#u.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: 0
    });
    this.#o.observe(this.canvas);
    document.addEventListener("visibilitychange", this.#v.bind(this));
  }
  #y() {
    window.removeEventListener("resize", this.#f.bind(this));
    this.#r?.disconnect();
    this.#o?.disconnect();
    document.removeEventListener("visibilitychange", this.#v.bind(this));
  }
  #u(e2) {
    this.#s = e2[0].isIntersecting;
    this.#s ? this.#w() : this.#z();
  }
  #v() {
    if (this.#s) {
      document.hidden ? this.#z() : this.#w();
    }
  }
  #f() {
    if (this.#a) clearTimeout(this.#a);
    this.#a = setTimeout(this.resize.bind(this), 100);
  }
  resize() {
    let e2, t2;
    if (this.#e.size instanceof Object) {
      e2 = this.#e.size.width;
      t2 = this.#e.size.height;
    } else if (this.#e.size === "parent" && this.canvas.parentNode) {
      e2 = this.canvas.parentNode.offsetWidth;
      t2 = this.canvas.parentNode.offsetHeight;
    } else {
      e2 = window.innerWidth;
      t2 = window.innerHeight;
    }
    this.size.width = e2;
    this.size.height = t2;
    this.size.ratio = e2 / t2;
    this.#x();
    this.#b();
    this.onAfterResize(this.size);
  }
  #x() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#A(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.#A(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }
  #A(e2) {
    const t2 = Math.tan(o.degToRad(this.cameraFov / 2)) / (this.camera.aspect / e2);
    this.camera.fov = 2 * o.radToDeg(Math.atan(t2));
  }
  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const e2 = this.camera.fov * Math.PI / 180;
      this.size.wHeight = 2 * Math.tan(e2 / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    } else if (this.camera.isOrthographicCamera) {
      this.size.wHeight = this.camera.top - this.camera.bottom;
      this.size.wWidth = this.camera.right - this.camera.left;
    }
  }
  #b() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.#t?.setSize(this.size.width, this.size.height);
    let e2 = window.devicePixelRatio;
    if (this.maxPixelRatio && e2 > this.maxPixelRatio) {
      e2 = this.maxPixelRatio;
    } else if (this.minPixelRatio && e2 < this.minPixelRatio) {
      e2 = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(e2);
    this.size.pixelRatio = e2;
  }
  get postprocessing() {
    return this.#t;
  }
  set postprocessing(e2) {
    this.#t = e2;
    this.render = e2.render.bind(e2);
  }
  #w() {
    if (this.#n) return;
    const animate = () => {
      this.#l = requestAnimationFrame(animate);
      this.#h.delta = this.#c.getDelta();
      this.#h.elapsed += this.#h.delta;
      this.onBeforeRender(this.#h);
      this.render();
      this.onAfterRender(this.#h);
    };
    this.#n = true;
    this.#c.start();
    animate();
  }
  #z() {
    if (this.#n) {
      cancelAnimationFrame(this.#l);
      this.#n = false;
      this.#c.stop();
    }
  }
  #i() {
    this.renderer.render(this.scene, this.camera);
  }
  clear() {
    this.scene.traverse((e2) => {
      if (e2.isMesh && typeof e2.material === "object" && e2.material !== null) {
        Object.keys(e2.material).forEach((t2) => {
          const i2 = e2.material[t2];
          if (i2 !== null && typeof i2 === "object" && typeof i2.dispose === "function") {
            i2.dispose();
          }
        });
        e2.material.dispose();
        e2.geometry.dispose();
      }
    });
    this.scene.clear();
  }
  dispose() {
    this.#y();
    this.#z();
    this.clear();
    this.#t?.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}
const b = /* @__PURE__ */ new Map(), A = new r();
let R = false;
function S(e2) {
  const t2 = {
    position: new r(),
    nPosition: new r(),
    hover: false,
    touching: false,
    onEnter() {
    },
    onMove() {
    },
    onClick() {
    },
    onLeave() {
    },
    ...e2
  };
  (function(e3, t3) {
    if (!b.has(e3)) {
      b.set(e3, t3);
      if (!R) {
        document.body.addEventListener("pointermove", M);
        document.body.addEventListener("pointerleave", L);
        document.body.addEventListener("click", C);
        document.body.addEventListener("touchstart", TouchStart, { passive: false });
        document.body.addEventListener("touchmove", TouchMove, { passive: false });
        document.body.addEventListener("touchend", TouchEnd, { passive: false });
        document.body.addEventListener("touchcancel", TouchEnd, { passive: false });
        R = true;
      }
    }
  })(e2.domElement, t2);
  t2.dispose = () => {
    const t3 = e2.domElement;
    b.delete(t3);
    if (b.size === 0) {
      document.body.removeEventListener("pointermove", M);
      document.body.removeEventListener("pointerleave", L);
      document.body.removeEventListener("click", C);
      document.body.removeEventListener("touchstart", TouchStart);
      document.body.removeEventListener("touchmove", TouchMove);
      document.body.removeEventListener("touchend", TouchEnd);
      document.body.removeEventListener("touchcancel", TouchEnd);
      R = false;
    }
  };
  return t2;
}
_c = S;
function M(e2) {
  A.x = e2.clientX;
  A.y = e2.clientY;
  processInteraction();
}
_c2 = M;
function processInteraction() {
  for (const [elem, t2] of b) {
    const i2 = elem.getBoundingClientRect();
    if (D(i2)) {
      P(t2, i2);
      if (!t2.hover) {
        t2.hover = true;
        t2.onEnter(t2);
      }
      t2.onMove(t2);
    } else if (t2.hover && !t2.touching) {
      t2.hover = false;
      t2.onLeave(t2);
    }
  }
}
function C(e2) {
  A.x = e2.clientX;
  A.y = e2.clientY;
  for (const [elem, t2] of b) {
    const i2 = elem.getBoundingClientRect();
    P(t2, i2);
    if (D(i2)) t2.onClick(t2);
  }
}
_c3 = C;
function L() {
  for (const t2 of b.values()) {
    if (t2.hover) {
      t2.hover = false;
      t2.onLeave(t2);
    }
  }
}
_c4 = L;
function TouchStart(e2) {
  if (e2.touches.length > 0) {
    e2.preventDefault();
    A.x = e2.touches[0].clientX;
    A.y = e2.touches[0].clientY;
    for (const [elem, t2] of b) {
      const rect = elem.getBoundingClientRect();
      if (D(rect)) {
        t2.touching = true;
        P(t2, rect);
        if (!t2.hover) {
          t2.hover = true;
          t2.onEnter(t2);
        }
        t2.onMove(t2);
      }
    }
  }
}
_c5 = TouchStart;
function TouchMove(e2) {
  if (e2.touches.length > 0) {
    e2.preventDefault();
    A.x = e2.touches[0].clientX;
    A.y = e2.touches[0].clientY;
    for (const [elem, t2] of b) {
      const rect = elem.getBoundingClientRect();
      P(t2, rect);
      if (D(rect)) {
        if (!t2.hover) {
          t2.hover = true;
          t2.touching = true;
          t2.onEnter(t2);
        }
        t2.onMove(t2);
      } else if (t2.hover && t2.touching) {
        t2.onMove(t2);
      }
    }
  }
}
_c6 = TouchMove;
function TouchEnd() {
  for (const [, t2] of b) {
    if (t2.touching) {
      t2.touching = false;
      if (t2.hover) {
        t2.hover = false;
        t2.onLeave(t2);
      }
    }
  }
}
_c7 = TouchEnd;
function P(e2, t2) {
  const { position: i2, nPosition: s2 } = e2;
  i2.x = A.x - t2.left;
  i2.y = A.y - t2.top;
  s2.x = i2.x / t2.width * 2 - 1;
  s2.y = -i2.y / t2.height * 2 + 1;
}
_c8 = P;
function D(e2) {
  const { x: t2, y: i2 } = A;
  const { left: s2, top: n2, o: w2, r: h2 } = e2;
  const { left: s_left, top: n_top, width: o_width, height: r_height } = e2;
  return t2 >= s_left && t2 <= s_left + o_width && i2 >= n_top && i2 <= n_top + r_height;
}
_c9 = D;
const { randFloat: k, randFloatSpread: E } = o;
const F = new a();
const I = new a();
const O = new a();
const V = new a();
const B = new a();
const N = new a();
const _ = new a();
const j = new a();
const H = new a();
const T = new a();
class W {
  constructor(e2) {
    this.config = e2;
    this.positionData = new Float32Array(3 * e2.count).fill(0);
    this.velocityData = new Float32Array(3 * e2.count).fill(0);
    this.sizeData = new Float32Array(e2.count).fill(1);
    this.center = new a();
    this.#R();
    this.setSizes();
  }
  #R() {
    const { config: e2, positionData: t2 } = this;
    this.center.toArray(t2, 0);
    for (let i2 = 1; i2 < e2.count; i2++) {
      const s2 = 3 * i2;
      t2[s2] = E(2 * e2.maxX);
      t2[s2 + 1] = E(2 * e2.maxY);
      t2[s2 + 2] = E(2 * e2.maxZ);
    }
  }
  setSizes() {
    const { config: e2, sizeData: t2 } = this;
    t2[0] = e2.size0;
    for (let i2 = 1; i2 < e2.count; i2++) {
      t2[i2] = k(e2.minSize, e2.maxSize);
    }
  }
  update(e2) {
    const { config: t2, center: i2, positionData: s2, sizeData: n2, velocityData: o2 } = this;
    let r2 = 0;
    if (t2.controlSphere0) {
      r2 = 1;
      F.fromArray(s2, 0);
      F.lerp(i2, 0.1).toArray(s2, 0);
      V.set(0, 0, 0).toArray(o2, 0);
    }
    for (let idx = r2; idx < t2.count; idx++) {
      const base = 3 * idx;
      I.fromArray(s2, base);
      B.fromArray(o2, base);
      B.y -= e2.delta * t2.gravity * n2[idx];
      B.multiplyScalar(t2.friction);
      B.clampLength(0, t2.maxVelocity);
      I.add(B);
      I.toArray(s2, base);
      B.toArray(o2, base);
    }
    for (let idx = r2; idx < t2.count; idx++) {
      const base = 3 * idx;
      I.fromArray(s2, base);
      B.fromArray(o2, base);
      const radius = n2[idx];
      for (let jdx = idx + 1; jdx < t2.count; jdx++) {
        const otherBase = 3 * jdx;
        O.fromArray(s2, otherBase);
        N.fromArray(o2, otherBase);
        const otherRadius = n2[jdx];
        _.copy(O).sub(I);
        const dist = _.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          j.copy(_).normalize().multiplyScalar(0.5 * overlap);
          H.copy(j).multiplyScalar(Math.max(B.length(), 1));
          T.copy(j).multiplyScalar(Math.max(N.length(), 1));
          I.sub(j);
          B.sub(H);
          I.toArray(s2, base);
          B.toArray(o2, base);
          O.add(j);
          N.add(T);
          O.toArray(s2, otherBase);
          N.toArray(o2, otherBase);
        }
      }
      if (t2.controlSphere0) {
        _.copy(F).sub(I);
        const dist = _.length();
        const sumRadius0 = radius + n2[0];
        if (dist < sumRadius0) {
          const diff = sumRadius0 - dist;
          j.copy(_.normalize()).multiplyScalar(diff);
          H.copy(j).multiplyScalar(Math.max(B.length(), 2));
          I.sub(j);
          B.sub(H);
        }
      }
      if (Math.abs(I.x) + radius > t2.maxX) {
        I.x = Math.sign(I.x) * (t2.maxX - radius);
        B.x = -B.x * t2.wallBounce;
      }
      if (t2.gravity === 0) {
        if (Math.abs(I.y) + radius > t2.maxY) {
          I.y = Math.sign(I.y) * (t2.maxY - radius);
          B.y = -B.y * t2.wallBounce;
        }
      } else if (I.y - radius < -t2.maxY) {
        I.y = -t2.maxY + radius;
        B.y = -B.y * t2.wallBounce;
      }
      const maxBoundary = Math.max(t2.maxZ, t2.maxSize);
      if (Math.abs(I.z) + radius > maxBoundary) {
        I.z = Math.sign(I.z) * (t2.maxZ - radius);
        B.z = -B.z * t2.wallBounce;
      }
      I.toArray(s2, base);
      B.toArray(o2, base);
    }
  }
}
class Y extends c {
  constructor(e2) {
    super(e2);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 }
    };
    this.defines.USE_UV = "";
    this.onBeforeCompile = (e3) => {
      Object.assign(e3.uniforms, this.uniforms);
      e3.fragmentShader = "\n        uniform float thicknessPower;\n        uniform float thicknessScale;\n        uniform float thicknessDistortion;\n        uniform float thicknessAmbient;\n        uniform float thicknessAttenuation;\n      " + e3.fragmentShader;
      e3.fragmentShader = e3.fragmentShader.replace(
        "void main() {",
        "\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\n          #ifdef USE_COLOR\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\n          #else\n            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;\n          #endif\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\n        }\n\n        void main() {\n      "
      );
      const t2 = h.lights_fragment_begin.replaceAll(
        "RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",
        "\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\n        "
      );
      e3.fragmentShader = e3.fragmentShader.replace("#include <lights_fragment_begin>", t2);
      if (this.onBeforeCompile2) this.onBeforeCompile2(e3);
    };
  }
}
const X = {
  count: 200,
  colors: [0, 0, 0],
  ambientColor: 16777215,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true
};
const U = new m();
class Z extends d {
  constructor(e2, t2 = {}) {
    const i2 = { ...X, ...t2 };
    const s2 = new z();
    const n2 = new p(e2, 0.04).fromScene(s2).texture;
    const o2 = new g();
    const r2 = new Y({ envMap: n2, ...i2.materialParams });
    r2.envMapRotation.x = -Math.PI / 2;
    super(o2, r2, i2.count);
    this.config = i2;
    this.physics = new W(i2);
    this.#S();
    this.setColors(i2.colors);
  }
  #S() {
    this.ambientLight = new f(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new u(this.config.colors[0], this.config.lightIntensity);
    this.add(this.light);
  }
  setColors(e2) {
    if (Array.isArray(e2) && e2.length > 1) {
      const t2 = (function(e3) {
        let t3, i2;
        function setColors(e4) {
          t3 = e4;
          i2 = [];
          t3.forEach((col) => {
            i2.push(new l(col));
          });
        }
        setColors(e3);
        return {
          setColors,
          getColorAt: function(ratio, out = new l()) {
            const scaled = Math.max(0, Math.min(1, ratio)) * (t3.length - 1);
            const idx = Math.floor(scaled);
            const start = i2[idx];
            if (idx >= t3.length - 1) return start.clone();
            const alpha = scaled - idx;
            const end = i2[idx + 1];
            out.r = start.r + alpha * (end.r - start.r);
            out.g = start.g + alpha * (end.g - start.g);
            out.b = start.b + alpha * (end.b - start.b);
            return out;
          }
        };
      })(e2);
      for (let idx = 0; idx < this.count; idx++) {
        this.setColorAt(idx, t2.getColorAt(idx / this.count));
        if (idx === 0) {
          this.light.color.copy(t2.getColorAt(idx / this.count));
        }
      }
      this.instanceColor.needsUpdate = true;
    }
  }
  update(e2) {
    this.physics.update(e2);
    for (let idx = 0; idx < this.count; idx++) {
      U.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && this.config.followCursor === false) {
        U.scale.setScalar(0);
      } else {
        U.scale.setScalar(this.physics.sizeData[idx]);
      }
      U.updateMatrix();
      this.setMatrixAt(idx, U.matrix);
      if (idx === 0) this.light.position.copy(U.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}
function createBallpit(e2, t2 = {}) {
  const i2 = new x({
    canvas: e2,
    size: "parent",
    rendererOptions: { antialias: true, alpha: true }
  });
  let s2;
  i2.renderer.toneMapping = v;
  i2.camera.position.set(0, 0, 20);
  i2.camera.lookAt(0, 0, 0);
  i2.cameraMaxAspect = 1.5;
  i2.resize();
  initialize(t2);
  const n2 = new y();
  const o2 = new w(new a(0, 0, 1), 0);
  const r2 = new a();
  let c2 = false;
  e2.style.touchAction = "none";
  e2.style.userSelect = "none";
  e2.style.webkitUserSelect = "none";
  const h2 = S({
    domElement: e2,
    onMove() {
      n2.setFromCamera(h2.nPosition, i2.camera);
      i2.camera.getWorldDirection(o2.normal);
      n2.ray.intersectPlane(o2, r2);
      s2.physics.center.copy(r2);
      s2.config.controlSphere0 = true;
    },
    onLeave() {
      s2.config.controlSphere0 = false;
    }
  });
  function initialize(e3) {
    if (s2) {
      i2.clear();
      i2.scene.remove(s2);
    }
    s2 = new Z(i2.renderer, e3);
    i2.scene.add(s2);
  }
  i2.onBeforeRender = (e3) => {
    if (!c2) s2.update(e3);
  };
  i2.onAfterResize = (e3) => {
    s2.config.maxX = e3.wWidth / 2;
    s2.config.maxY = e3.wHeight / 2;
  };
  return {
    three: i2,
    get spheres() {
      return s2;
    },
    setCount(e3) {
      initialize({ ...s2.config, count: e3 });
    },
    togglePause() {
      c2 = !c2;
    },
    dispose() {
      h2.dispose();
      i2.dispose();
    }
  };
}
const Ballpit = ({ className = "", followCursor = true, ...props }) => {
  _s();
  const canvasRef = useRef(null);
  const spheresInstanceRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    spheresInstanceRef.current = createBallpit(canvas, { followCursor, ...props });
    return () => {
      if (spheresInstanceRef.current) {
        spheresInstanceRef.current.dispose();
      }
    };
  }, []);
  return /* @__PURE__ */ jsxDEV("canvas", { className, ref: canvasRef, style: { width: "100%", height: "100%" } }, void 0, false, {
    fileName: "C:/Users/mr/OneDrive/Desktop/Arun project/Reume-maker/src/components/Ballpit.jsx",
    lineNumber: 749,
    columnNumber: 10
  }, this);
};
_s(Ballpit, "zfLykvNPavFXMWxJRK9PIXc47O8=");
_c0 = Ballpit;
export default Ballpit;
var _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c0;
$RefreshReg$(_c, "S");
$RefreshReg$(_c2, "M");
$RefreshReg$(_c3, "C");
$RefreshReg$(_c4, "L");
$RefreshReg$(_c5, "TouchStart");
$RefreshReg$(_c6, "TouchMove");
$RefreshReg$(_c7, "TouchEnd");
$RefreshReg$(_c8, "P");
$RefreshReg$(_c9, "D");
$RefreshReg$(_c0, "Ballpit");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/mr/OneDrive/Desktop/Arun project/Reume-maker/src/components/Ballpit.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/mr/OneDrive/Desktop/Arun project/Reume-maker/src/components/Ballpit.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "C:/Users/mr/OneDrive/Desktop/Arun project/Reume-maker/src/components/Ballpit.jsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,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QUksS0FBQUMsS0FBQUMsS0FBQUMsS0FBQUssS0FBQWtKO0FBQUEsYUFBQXpLLElBQUE7QUFBQSxhQUFBSSxLQUFBO0FBQUEsYUFBQUssS0FBQTtBQUFBLGFBQUFFLEtBQUE7QUFBQSxhQUFBSSxLQUFBO0FBQUEsYUFBQUMsS0FBQTtBQUFBLGFBQUFDLEtBQUE7QUFBQSxhQUFBQyxLQUFBO0FBQUEsYUFBQUssS0FBQTtBQUFBLGFBQUFrSixLQUFBIiwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUmVmIiwiVmVjdG9yMyIsImEiLCJNZXNoUGh5c2ljYWxNYXRlcmlhbCIsImMiLCJJbnN0YW5jZWRNZXNoIiwiZCIsIkNsb2NrIiwiZSIsIkFtYmllbnRMaWdodCIsImYiLCJTcGhlcmVHZW9tZXRyeSIsImciLCJTaGFkZXJDaHVuayIsImgiLCJTY2VuZSIsImkiLCJDb2xvciIsImwiLCJPYmplY3QzRCIsIm0iLCJTUkdCQ29sb3JTcGFjZSIsIm4iLCJNYXRoVXRpbHMiLCJvIiwiUE1SRU1HZW5lcmF0b3IiLCJwIiwiVmVjdG9yMiIsInIiLCJXZWJHTFJlbmRlcmVyIiwicyIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwidCIsIlBvaW50TGlnaHQiLCJ1IiwiQUNFU0ZpbG1pY1RvbmVNYXBwaW5nIiwidiIsIlBsYW5lIiwidyIsIlJheWNhc3RlciIsInkiLCJSb29tRW52aXJvbm1lbnQiLCJ6IiwieCIsImNhbnZhcyIsImNhbWVyYSIsImNhbWVyYU1pbkFzcGVjdCIsImNhbWVyYU1heEFzcGVjdCIsImNhbWVyYUZvdiIsIm1heFBpeGVsUmF0aW8iLCJtaW5QaXhlbFJhdGlvIiwic2NlbmUiLCJyZW5kZXJlciIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsIndXaWR0aCIsIndIZWlnaHQiLCJyYXRpbyIsInBpeGVsUmF0aW8iLCJyZW5kZXIiLCJvbkJlZm9yZVJlbmRlciIsIm9uQWZ0ZXJSZW5kZXIiLCJvbkFmdGVyUmVzaXplIiwiaXNEaXNwb3NlZCIsImVsYXBzZWQiLCJkZWx0YSIsImNvbnN0cnVjdG9yIiwicmVzaXplIiwiZm92IiwiaWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29uc29sZSIsImVycm9yIiwic3R5bGUiLCJkaXNwbGF5IiwicG93ZXJQcmVmZXJlbmNlIiwicmVuZGVyZXJPcHRpb25zIiwib3V0cHV0Q29sb3JTcGFjZSIsIk9iamVjdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kIiwicGFyZW50Tm9kZSIsIlJlc2l6ZU9ic2VydmVyIiwib2JzZXJ2ZSIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzY29ubmVjdCIsImlzSW50ZXJzZWN0aW5nIiwiaGlkZGVuIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYXNwZWN0IiwiaXNQZXJzcGVjdGl2ZUNhbWVyYSIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJ1cGRhdGVXb3JsZFNpemUiLCJNYXRoIiwidGFuIiwiZGVnVG9SYWQiLCJyYWRUb0RlZyIsImF0YW4iLCJQSSIsInBvc2l0aW9uIiwibGVuZ3RoIiwiaXNPcnRob2dyYXBoaWNDYW1lcmEiLCJ0b3AiLCJib3R0b20iLCJyaWdodCIsImxlZnQiLCJzZXRTaXplIiwiZGV2aWNlUGl4ZWxSYXRpbyIsInNldFBpeGVsUmF0aW8iLCJwb3N0cHJvY2Vzc2luZyIsImFuaW1hdGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJnZXREZWx0YSIsInN0YXJ0IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJzdG9wIiwiY2xlYXIiLCJ0cmF2ZXJzZSIsImlzTWVzaCIsIm1hdGVyaWFsIiwia2V5cyIsImZvckVhY2giLCJkaXNwb3NlIiwiZ2VvbWV0cnkiLCJmb3JjZUNvbnRleHRMb3NzIiwiYiIsIk1hcCIsIkEiLCJSIiwiUyIsIm5Qb3NpdGlvbiIsImhvdmVyIiwidG91Y2hpbmciLCJvbkVudGVyIiwib25Nb3ZlIiwib25DbGljayIsIm9uTGVhdmUiLCJoYXMiLCJzZXQiLCJib2R5IiwiTSIsIkwiLCJDIiwiVG91Y2hTdGFydCIsInBhc3NpdmUiLCJUb3VjaE1vdmUiLCJUb3VjaEVuZCIsImRvbUVsZW1lbnQiLCJkZWxldGUiLCJfYyIsImNsaWVudFgiLCJjbGllbnRZIiwicHJvY2Vzc0ludGVyYWN0aW9uIiwiX2MyIiwiZWxlbSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIkQiLCJQIiwiX2MzIiwidmFsdWVzIiwiX2M0IiwidG91Y2hlcyIsInByZXZlbnREZWZhdWx0IiwicmVjdCIsIl9jNSIsIl9jNiIsIl9jNyIsIl9jOCIsInNfbGVmdCIsIm5fdG9wIiwib193aWR0aCIsInJfaGVpZ2h0IiwiX2M5IiwicmFuZEZsb2F0IiwiayIsInJhbmRGbG9hdFNwcmVhZCIsIkUiLCJGIiwiSSIsIk8iLCJWIiwiQiIsIk4iLCJfIiwiaiIsIkgiLCJUIiwiVyIsImNvbmZpZyIsInBvc2l0aW9uRGF0YSIsIkZsb2F0MzJBcnJheSIsImNvdW50IiwiZmlsbCIsInZlbG9jaXR5RGF0YSIsInNpemVEYXRhIiwiY2VudGVyIiwic2V0U2l6ZXMiLCJ0b0FycmF5IiwibWF4WCIsIm1heFkiLCJtYXhaIiwic2l6ZTAiLCJtaW5TaXplIiwibWF4U2l6ZSIsInVwZGF0ZSIsImNvbnRyb2xTcGhlcmUwIiwiZnJvbUFycmF5IiwibGVycCIsImlkeCIsImJhc2UiLCJncmF2aXR5IiwibXVsdGlwbHlTY2FsYXIiLCJmcmljdGlvbiIsImNsYW1wTGVuZ3RoIiwibWF4VmVsb2NpdHkiLCJhZGQiLCJyYWRpdXMiLCJqZHgiLCJvdGhlckJhc2UiLCJvdGhlclJhZGl1cyIsImNvcHkiLCJzdWIiLCJkaXN0Iiwic3VtUmFkaXVzIiwib3ZlcmxhcCIsIm5vcm1hbGl6ZSIsIm1heCIsInN1bVJhZGl1czAiLCJkaWZmIiwiYWJzIiwic2lnbiIsIndhbGxCb3VuY2UiLCJtYXhCb3VuZGFyeSIsIlkiLCJ1bmlmb3JtcyIsInRoaWNrbmVzc0Rpc3RvcnRpb24iLCJ2YWx1ZSIsInRoaWNrbmVzc0FtYmllbnQiLCJ0aGlja25lc3NBdHRlbnVhdGlvbiIsInRoaWNrbmVzc1Bvd2VyIiwidGhpY2tuZXNzU2NhbGUiLCJkZWZpbmVzIiwiVVNFX1VWIiwib25CZWZvcmVDb21waWxlIiwiYXNzaWduIiwiZnJhZ21lbnRTaGFkZXIiLCJyZXBsYWNlIiwibGlnaHRzX2ZyYWdtZW50X2JlZ2luIiwicmVwbGFjZUFsbCIsIm9uQmVmb3JlQ29tcGlsZTIiLCJYIiwiY29sb3JzIiwiYW1iaWVudENvbG9yIiwiYW1iaWVudEludGVuc2l0eSIsImxpZ2h0SW50ZW5zaXR5IiwibWF0ZXJpYWxQYXJhbXMiLCJtZXRhbG5lc3MiLCJyb3VnaG5lc3MiLCJjbGVhcmNvYXQiLCJjbGVhcmNvYXRSb3VnaG5lc3MiLCJmb2xsb3dDdXJzb3IiLCJVIiwiWiIsImZyb21TY2VuZSIsInRleHR1cmUiLCJlbnZNYXAiLCJlbnZNYXBSb3RhdGlvbiIsInBoeXNpY3MiLCJzZXRDb2xvcnMiLCJhbWJpZW50TGlnaHQiLCJsaWdodCIsIkFycmF5IiwiaXNBcnJheSIsImNvbCIsInB1c2giLCJnZXRDb2xvckF0Iiwib3V0Iiwic2NhbGVkIiwibWluIiwiZmxvb3IiLCJjbG9uZSIsImFscGhhIiwiZW5kIiwic2V0Q29sb3JBdCIsImNvbG9yIiwiaW5zdGFuY2VDb2xvciIsIm5lZWRzVXBkYXRlIiwic2NhbGUiLCJzZXRTY2FsYXIiLCJ1cGRhdGVNYXRyaXgiLCJzZXRNYXRyaXhBdCIsIm1hdHJpeCIsImluc3RhbmNlTWF0cml4IiwiY3JlYXRlQmFsbHBpdCIsImFudGlhbGlhcyIsInRvbmVNYXBwaW5nIiwibG9va0F0IiwiaW5pdGlhbGl6ZSIsInRvdWNoQWN0aW9uIiwidXNlclNlbGVjdCIsIndlYmtpdFVzZXJTZWxlY3QiLCJzZXRGcm9tQ2FtZXJhIiwiZ2V0V29ybGREaXJlY3Rpb24iLCJub3JtYWwiLCJyYXkiLCJpbnRlcnNlY3RQbGFuZSIsInJlbW92ZSIsInRocmVlIiwic3BoZXJlcyIsInNldENvdW50IiwidG9nZ2xlUGF1c2UiLCJCYWxscGl0IiwiY2xhc3NOYW1lIiwicHJvcHMiLCJfcyIsImNhbnZhc1JlZiIsInNwaGVyZXNJbnN0YW5jZVJlZiIsImN1cnJlbnQiLCJfYzAiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQmFsbHBpdC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBWZWN0b3IzIGFzIGEsXG4gIE1lc2hQaHlzaWNhbE1hdGVyaWFsIGFzIGMsXG4gIEluc3RhbmNlZE1lc2ggYXMgZCxcbiAgQ2xvY2sgYXMgZSxcbiAgQW1iaWVudExpZ2h0IGFzIGYsXG4gIFNwaGVyZUdlb21ldHJ5IGFzIGcsXG4gIFNoYWRlckNodW5rIGFzIGgsXG4gIFNjZW5lIGFzIGksXG4gIENvbG9yIGFzIGwsXG4gIE9iamVjdDNEIGFzIG0sXG4gIFNSR0JDb2xvclNwYWNlIGFzIG4sXG4gIE1hdGhVdGlscyBhcyBvLFxuICBQTVJFTUdlbmVyYXRvciBhcyBwLFxuICBWZWN0b3IyIGFzIHIsXG4gIFdlYkdMUmVuZGVyZXIgYXMgcyxcbiAgUGVyc3BlY3RpdmVDYW1lcmEgYXMgdCxcbiAgUG9pbnRMaWdodCBhcyB1LFxuICBBQ0VTRmlsbWljVG9uZU1hcHBpbmcgYXMgdixcbiAgUGxhbmUgYXMgdyxcbiAgUmF5Y2FzdGVyIGFzIHlcbn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgUm9vbUVudmlyb25tZW50IGFzIHogfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vZW52aXJvbm1lbnRzL1Jvb21FbnZpcm9ubWVudC5qcyc7XG5cbmNsYXNzIHgge1xuICAjZTtcbiAgY2FudmFzO1xuICBjYW1lcmE7XG4gIGNhbWVyYU1pbkFzcGVjdDtcbiAgY2FtZXJhTWF4QXNwZWN0O1xuICBjYW1lcmFGb3Y7XG4gIG1heFBpeGVsUmF0aW87XG4gIG1pblBpeGVsUmF0aW87XG4gIHNjZW5lO1xuICByZW5kZXJlcjtcbiAgI3Q7XG4gIHNpemUgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIHdXaWR0aDogMCwgd0hlaWdodDogMCwgcmF0aW86IDAsIHBpeGVsUmF0aW86IDAgfTtcbiAgcmVuZGVyID0gdGhpcy4jaTtcbiAgb25CZWZvcmVSZW5kZXIgPSAoKSA9PiB7fTtcbiAgb25BZnRlclJlbmRlciA9ICgpID0+IHt9O1xuICBvbkFmdGVyUmVzaXplID0gKCkgPT4ge307XG4gICNzID0gZmFsc2U7XG4gICNuID0gZmFsc2U7XG4gIGlzRGlzcG9zZWQgPSBmYWxzZTtcbiAgI287XG4gICNyO1xuICAjYTtcbiAgI2MgPSBuZXcgZSgpO1xuICAjaCA9IHsgZWxhcHNlZDogMCwgZGVsdGE6IDAgfTtcbiAgI2w7XG4gIGNvbnN0cnVjdG9yKGUpIHtcbiAgICB0aGlzLiNlID0geyAuLi5lIH07XG4gICAgdGhpcy4jbSgpO1xuICAgIHRoaXMuI2QoKTtcbiAgICB0aGlzLiNwKCk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgICB0aGlzLiNnKCk7XG4gIH1cbiAgI20oKSB7XG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgdCgpO1xuICAgIHRoaXMuY2FtZXJhRm92ID0gdGhpcy5jYW1lcmEuZm92O1xuICB9XG4gICNkKCkge1xuICAgIHRoaXMuc2NlbmUgPSBuZXcgaSgpO1xuICB9XG4gICNwKCkge1xuICAgIGlmICh0aGlzLiNlLmNhbnZhcykge1xuICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLiNlLmNhbnZhcztcbiAgICB9IGVsc2UgaWYgKHRoaXMuI2UuaWQpIHtcbiAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy4jZS5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1RocmVlOiBNaXNzaW5nIGNhbnZhcyBvciBpZCBwYXJhbWV0ZXInKTtcbiAgICB9XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgY29uc3QgZSA9IHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMsXG4gICAgICBwb3dlclByZWZlcmVuY2U6ICdoaWdoLXBlcmZvcm1hbmNlJyxcbiAgICAgIC4uLih0aGlzLiNlLnJlbmRlcmVyT3B0aW9ucyA/PyB7fSlcbiAgICB9O1xuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgcyhlKTtcbiAgICB0aGlzLnJlbmRlcmVyLm91dHB1dENvbG9yU3BhY2UgPSBuO1xuICB9XG4gICNnKCkge1xuICAgIGlmICghKHRoaXMuI2Uuc2l6ZSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLiNmLmJpbmQodGhpcykpO1xuICAgICAgaWYgKHRoaXMuI2Uuc2l6ZSA9PT0gJ3BhcmVudCcgJiYgdGhpcy5jYW52YXMucGFyZW50Tm9kZSkge1xuICAgICAgICB0aGlzLiNyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHRoaXMuI2YuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuI3Iub2JzZXJ2ZSh0aGlzLmNhbnZhcy5wYXJlbnROb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy4jbyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcih0aGlzLiN1LmJpbmQodGhpcyksIHtcbiAgICAgIHJvb3Q6IG51bGwsXG4gICAgICByb290TWFyZ2luOiAnMHB4JyxcbiAgICAgIHRocmVzaG9sZDogMFxuICAgIH0pO1xuICAgIHRoaXMuI28ub2JzZXJ2ZSh0aGlzLmNhbnZhcyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMuI3YuYmluZCh0aGlzKSk7XG4gIH1cbiAgI3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuI2YuYmluZCh0aGlzKSk7XG4gICAgdGhpcy4jcj8uZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuI28/LmRpc2Nvbm5lY3QoKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy4jdi5iaW5kKHRoaXMpKTtcbiAgfVxuICAjdShlKSB7XG4gICAgdGhpcy4jcyA9IGVbMF0uaXNJbnRlcnNlY3Rpbmc7XG4gICAgdGhpcy4jcyA/IHRoaXMuI3coKSA6IHRoaXMuI3ooKTtcbiAgfVxuICAjdigpIHtcbiAgICBpZiAodGhpcy4jcykge1xuICAgICAgZG9jdW1lbnQuaGlkZGVuID8gdGhpcy4jeigpIDogdGhpcy4jdygpO1xuICAgIH1cbiAgfVxuICAjZigpIHtcbiAgICBpZiAodGhpcy4jYSkgY2xlYXJUaW1lb3V0KHRoaXMuI2EpO1xuICAgIHRoaXMuI2EgPSBzZXRUaW1lb3V0KHRoaXMucmVzaXplLmJpbmQodGhpcyksIDEwMCk7XG4gIH1cbiAgcmVzaXplKCkge1xuICAgIGxldCBlLCB0O1xuICAgIGlmICh0aGlzLiNlLnNpemUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGUgPSB0aGlzLiNlLnNpemUud2lkdGg7XG4gICAgICB0ID0gdGhpcy4jZS5zaXplLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuI2Uuc2l6ZSA9PT0gJ3BhcmVudCcgJiYgdGhpcy5jYW52YXMucGFyZW50Tm9kZSkge1xuICAgICAgZSA9IHRoaXMuY2FudmFzLnBhcmVudE5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICB0ID0gdGhpcy5jYW52YXMucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMuc2l6ZS53aWR0aCA9IGU7XG4gICAgdGhpcy5zaXplLmhlaWdodCA9IHQ7XG4gICAgdGhpcy5zaXplLnJhdGlvID0gZSAvIHQ7XG4gICAgdGhpcy4jeCgpO1xuICAgIHRoaXMuI2IoKTtcbiAgICB0aGlzLm9uQWZ0ZXJSZXNpemUodGhpcy5zaXplKTtcbiAgfVxuICAjeCgpIHtcbiAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLnNpemUud2lkdGggLyB0aGlzLnNpemUuaGVpZ2h0O1xuICAgIGlmICh0aGlzLmNhbWVyYS5pc1BlcnNwZWN0aXZlQ2FtZXJhICYmIHRoaXMuY2FtZXJhRm92KSB7XG4gICAgICBpZiAodGhpcy5jYW1lcmFNaW5Bc3BlY3QgJiYgdGhpcy5jYW1lcmEuYXNwZWN0IDwgdGhpcy5jYW1lcmFNaW5Bc3BlY3QpIHtcbiAgICAgICAgdGhpcy4jQSh0aGlzLmNhbWVyYU1pbkFzcGVjdCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2FtZXJhTWF4QXNwZWN0ICYmIHRoaXMuY2FtZXJhLmFzcGVjdCA+IHRoaXMuY2FtZXJhTWF4QXNwZWN0KSB7XG4gICAgICAgIHRoaXMuI0EodGhpcy5jYW1lcmFNYXhBc3BlY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYW1lcmEuZm92ID0gdGhpcy5jYW1lcmFGb3Y7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB0aGlzLnVwZGF0ZVdvcmxkU2l6ZSgpO1xuICB9XG4gICNBKGUpIHtcbiAgICBjb25zdCB0ID0gTWF0aC50YW4oby5kZWdUb1JhZCh0aGlzLmNhbWVyYUZvdiAvIDIpKSAvICh0aGlzLmNhbWVyYS5hc3BlY3QgLyBlKTtcbiAgICB0aGlzLmNhbWVyYS5mb3YgPSAyICogby5yYWRUb0RlZyhNYXRoLmF0YW4odCkpO1xuICB9XG4gIHVwZGF0ZVdvcmxkU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5jYW1lcmEuaXNQZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgICAgY29uc3QgZSA9ICh0aGlzLmNhbWVyYS5mb3YgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgIHRoaXMuc2l6ZS53SGVpZ2h0ID0gMiAqIE1hdGgudGFuKGUgLyAyKSAqIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmxlbmd0aCgpO1xuICAgICAgdGhpcy5zaXplLndXaWR0aCA9IHRoaXMuc2l6ZS53SGVpZ2h0ICogdGhpcy5jYW1lcmEuYXNwZWN0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jYW1lcmEuaXNPcnRob2dyYXBoaWNDYW1lcmEpIHtcbiAgICAgIHRoaXMuc2l6ZS53SGVpZ2h0ID0gdGhpcy5jYW1lcmEudG9wIC0gdGhpcy5jYW1lcmEuYm90dG9tO1xuICAgICAgdGhpcy5zaXplLndXaWR0aCA9IHRoaXMuY2FtZXJhLnJpZ2h0IC0gdGhpcy5jYW1lcmEubGVmdDtcbiAgICB9XG4gIH1cbiAgI2IoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMuc2l6ZS53aWR0aCwgdGhpcy5zaXplLmhlaWdodCk7XG4gICAgdGhpcy4jdD8uc2V0U2l6ZSh0aGlzLnNpemUud2lkdGgsIHRoaXMuc2l6ZS5oZWlnaHQpO1xuICAgIGxldCBlID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgaWYgKHRoaXMubWF4UGl4ZWxSYXRpbyAmJiBlID4gdGhpcy5tYXhQaXhlbFJhdGlvKSB7XG4gICAgICBlID0gdGhpcy5tYXhQaXhlbFJhdGlvO1xuICAgIH0gZWxzZSBpZiAodGhpcy5taW5QaXhlbFJhdGlvICYmIGUgPCB0aGlzLm1pblBpeGVsUmF0aW8pIHtcbiAgICAgIGUgPSB0aGlzLm1pblBpeGVsUmF0aW87XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhlKTtcbiAgICB0aGlzLnNpemUucGl4ZWxSYXRpbyA9IGU7XG4gIH1cbiAgZ2V0IHBvc3Rwcm9jZXNzaW5nKCkge1xuICAgIHJldHVybiB0aGlzLiN0O1xuICB9XG4gIHNldCBwb3N0cHJvY2Vzc2luZyhlKSB7XG4gICAgdGhpcy4jdCA9IGU7XG4gICAgdGhpcy5yZW5kZXIgPSBlLnJlbmRlci5iaW5kKGUpO1xuICB9XG4gICN3KCkge1xuICAgIGlmICh0aGlzLiNuKSByZXR1cm47XG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuI2wgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgICB0aGlzLiNoLmRlbHRhID0gdGhpcy4jYy5nZXREZWx0YSgpO1xuICAgICAgdGhpcy4jaC5lbGFwc2VkICs9IHRoaXMuI2guZGVsdGE7XG4gICAgICB0aGlzLm9uQmVmb3JlUmVuZGVyKHRoaXMuI2gpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMub25BZnRlclJlbmRlcih0aGlzLiNoKTtcbiAgICB9O1xuICAgIHRoaXMuI24gPSB0cnVlO1xuICAgIHRoaXMuI2Muc3RhcnQoKTtcbiAgICBhbmltYXRlKCk7XG4gIH1cbiAgI3ooKSB7XG4gICAgaWYgKHRoaXMuI24pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuI2wpO1xuICAgICAgdGhpcy4jbiA9IGZhbHNlO1xuICAgICAgdGhpcy4jYy5zdG9wKCk7XG4gICAgfVxuICB9XG4gICNpKCkge1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgfVxuICBjbGVhcigpIHtcbiAgICB0aGlzLnNjZW5lLnRyYXZlcnNlKGUgPT4ge1xuICAgICAgaWYgKGUuaXNNZXNoICYmIHR5cGVvZiBlLm1hdGVyaWFsID09PSAnb2JqZWN0JyAmJiBlLm1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGUubWF0ZXJpYWwpLmZvckVhY2godCA9PiB7XG4gICAgICAgICAgY29uc3QgaSA9IGUubWF0ZXJpYWxbdF07XG4gICAgICAgICAgaWYgKGkgIT09IG51bGwgJiYgdHlwZW9mIGkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBpLmRpc3Bvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGkuZGlzcG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGUubWF0ZXJpYWwuZGlzcG9zZSgpO1xuICAgICAgICBlLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNjZW5lLmNsZWFyKCk7XG4gIH1cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLiN5KCk7XG4gICAgdGhpcy4jeigpO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLiN0Py5kaXNwb3NlKCk7XG4gICAgdGhpcy5yZW5kZXJlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5yZW5kZXJlci5mb3JjZUNvbnRleHRMb3NzKCk7XG4gICAgdGhpcy5pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgfVxufVxuXG5jb25zdCBiID0gbmV3IE1hcCgpLFxuICBBID0gbmV3IHIoKTtcbmxldCBSID0gZmFsc2U7XG5mdW5jdGlvbiBTKGUpIHtcbiAgY29uc3QgdCA9IHtcbiAgICBwb3NpdGlvbjogbmV3IHIoKSxcbiAgICBuUG9zaXRpb246IG5ldyByKCksXG4gICAgaG92ZXI6IGZhbHNlLFxuICAgIHRvdWNoaW5nOiBmYWxzZSxcbiAgICBvbkVudGVyKCkge30sXG4gICAgb25Nb3ZlKCkge30sXG4gICAgb25DbGljaygpIHt9LFxuICAgIG9uTGVhdmUoKSB7fSxcbiAgICAuLi5lXG4gIH07XG4gIChmdW5jdGlvbiAoZSwgdCkge1xuICAgIGlmICghYi5oYXMoZSkpIHtcbiAgICAgIGIuc2V0KGUsIHQpO1xuICAgICAgaWYgKCFSKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBNKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCBMKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEMpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIFRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgVG91Y2hFbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBUb3VjaEVuZCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcblxuICAgICAgICBSID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pKGUuZG9tRWxlbWVudCwgdCk7XG4gIHQuZGlzcG9zZSA9ICgpID0+IHtcbiAgICBjb25zdCB0ID0gZS5kb21FbGVtZW50O1xuICAgIGIuZGVsZXRlKHQpO1xuICAgIGlmIChiLnNpemUgPT09IDApIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBNKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgTCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQyk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIFRvdWNoU3RhcnQpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBUb3VjaE1vdmUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIFRvdWNoRW5kKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBUb3VjaEVuZCk7XG5cbiAgICAgIFIgPSBmYWxzZTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBNKGUpIHtcbiAgQS54ID0gZS5jbGllbnRYO1xuICBBLnkgPSBlLmNsaWVudFk7XG4gIHByb2Nlc3NJbnRlcmFjdGlvbigpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzSW50ZXJhY3Rpb24oKSB7XG4gIGZvciAoY29uc3QgW2VsZW0sIHRdIG9mIGIpIHtcbiAgICBjb25zdCBpID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoRChpKSkge1xuICAgICAgUCh0LCBpKTtcbiAgICAgIGlmICghdC5ob3Zlcikge1xuICAgICAgICB0LmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgdC5vbkVudGVyKHQpO1xuICAgICAgfVxuICAgICAgdC5vbk1vdmUodCk7XG4gICAgfSBlbHNlIGlmICh0LmhvdmVyICYmICF0LnRvdWNoaW5nKSB7XG4gICAgICB0LmhvdmVyID0gZmFsc2U7XG4gICAgICB0Lm9uTGVhdmUodCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEMoZSkge1xuICBBLnggPSBlLmNsaWVudFg7XG4gIEEueSA9IGUuY2xpZW50WTtcbiAgZm9yIChjb25zdCBbZWxlbSwgdF0gb2YgYikge1xuICAgIGNvbnN0IGkgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIFAodCwgaSk7XG4gICAgaWYgKEQoaSkpIHQub25DbGljayh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBMKCkge1xuICBmb3IgKGNvbnN0IHQgb2YgYi52YWx1ZXMoKSkge1xuICAgIGlmICh0LmhvdmVyKSB7XG4gICAgICB0LmhvdmVyID0gZmFsc2U7XG4gICAgICB0Lm9uTGVhdmUodCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFRvdWNoU3RhcnQoZSkge1xuICBpZiAoZS50b3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgQS54ID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgQS55ID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG5cbiAgICBmb3IgKGNvbnN0IFtlbGVtLCB0XSBvZiBiKSB7XG4gICAgICBjb25zdCByZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmIChEKHJlY3QpKSB7XG4gICAgICAgIHQudG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICBQKHQsIHJlY3QpO1xuICAgICAgICBpZiAoIXQuaG92ZXIpIHtcbiAgICAgICAgICB0LmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgICB0Lm9uRW50ZXIodCk7XG4gICAgICAgIH1cbiAgICAgICAgdC5vbk1vdmUodCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFRvdWNoTW92ZShlKSB7XG4gIGlmIChlLnRvdWNoZXMubGVuZ3RoID4gMCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBBLnggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICBBLnkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcblxuICAgIGZvciAoY29uc3QgW2VsZW0sIHRdIG9mIGIpIHtcbiAgICAgIGNvbnN0IHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgUCh0LCByZWN0KTtcblxuICAgICAgaWYgKEQocmVjdCkpIHtcbiAgICAgICAgaWYgKCF0LmhvdmVyKSB7XG4gICAgICAgICAgdC5ob3ZlciA9IHRydWU7XG4gICAgICAgICAgdC50b3VjaGluZyA9IHRydWU7XG4gICAgICAgICAgdC5vbkVudGVyKHQpO1xuICAgICAgICB9XG4gICAgICAgIHQub25Nb3ZlKHQpO1xuICAgICAgfSBlbHNlIGlmICh0LmhvdmVyICYmIHQudG91Y2hpbmcpIHtcbiAgICAgICAgdC5vbk1vdmUodCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFRvdWNoRW5kKCkge1xuICBmb3IgKGNvbnN0IFssIHRdIG9mIGIpIHtcbiAgICBpZiAodC50b3VjaGluZykge1xuICAgICAgdC50b3VjaGluZyA9IGZhbHNlO1xuICAgICAgaWYgKHQuaG92ZXIpIHtcbiAgICAgICAgdC5ob3ZlciA9IGZhbHNlO1xuICAgICAgICB0Lm9uTGVhdmUodCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIFAoZSwgdCkge1xuICBjb25zdCB7IHBvc2l0aW9uOiBpLCBuUG9zaXRpb246IHMgfSA9IGU7XG4gIGkueCA9IEEueCAtIHQubGVmdDtcbiAgaS55ID0gQS55IC0gdC50b3A7XG4gIHMueCA9IChpLnggLyB0LndpZHRoKSAqIDIgLSAxO1xuICBzLnkgPSAoLWkueSAvIHQuaGVpZ2h0KSAqIDIgKyAxO1xufVxuZnVuY3Rpb24gRChlKSB7XG4gIGNvbnN0IHsgeDogdCwgeTogaSB9ID0gQTtcbiAgY29uc3QgeyBsZWZ0OiBzLCB0b3A6IG4sIG86IHcsIHI6IGggfSA9IGU7IC8vIFZhcmlhYmxlIG5hbWUgJ28nLCAncicgbWlnaHQgYmUgJ3dpZHRoJywgJ2hlaWdodCcuIFdhaXQsIGluIHRoZSB1c2VyIHByb3ZpZGVkIGNvZGUgaXQgc2F5czogY29uc3QgeyBsZWZ0OiBzLCB0b3A6IG4sIHdpZHRoOiBvLCBoZWlnaHQ6IHIgfSA9IGU7IExldCdzIGZpeCB0aGlzIGluIHRoZSBuZXh0IGxpbmUgdG8gYmUgc2FmZSBidXQgdGhlIHVzZXIgcHJvdmlkZWQgYHdpZHRoOiBvLCBoZWlnaHQ6IHIgfSA9IGU7YFxuICAvLyBBY3R1YWxseSBsZXQgbWUgdXNlIGV4YWN0bHkgd2hhdCB1c2VyIHBvc3RlZDpcbiAgY29uc3QgeyBsZWZ0OiBzX2xlZnQsIHRvcDogbl90b3AsIHdpZHRoOiBvX3dpZHRoLCBoZWlnaHQ6IHJfaGVpZ2h0IH0gPSBlO1xuICByZXR1cm4gdCA+PSBzX2xlZnQgJiYgdCA8PSBzX2xlZnQgKyBvX3dpZHRoICYmIGkgPj0gbl90b3AgJiYgaSA8PSBuX3RvcCArIHJfaGVpZ2h0O1xufVxuLy8gUmVwbGFjaW5nIEQgdG8gYWNjdXJhdGVseSBtYXRjaCB0aGUgbG9naWMgdXNlciBwcm92aWRlZDpcbi8vIGZ1bmN0aW9uIEQoZSkge1xuLy8gICBjb25zdCB7IHg6IHQsIHk6IGkgfSA9IEE7XG4vLyAgIGNvbnN0IHsgbGVmdDogcywgdG9wOiBuLCB3aWR0aDogbywgaGVpZ2h0OiByIH0gPSBlO1xuLy8gICByZXR1cm4gdCA+PSBzICYmIHQgPD0gcyArIG8gJiYgaSA+PSBuICYmIGkgPD0gbiArIHI7XG4vLyB9XG5cbmNvbnN0IHsgcmFuZEZsb2F0OiBrLCByYW5kRmxvYXRTcHJlYWQ6IEUgfSA9IG87XG5jb25zdCBGID0gbmV3IGEoKTtcbmNvbnN0IEkgPSBuZXcgYSgpO1xuY29uc3QgTyA9IG5ldyBhKCk7XG5jb25zdCBWID0gbmV3IGEoKTtcbmNvbnN0IEIgPSBuZXcgYSgpO1xuY29uc3QgTiA9IG5ldyBhKCk7XG5jb25zdCBfID0gbmV3IGEoKTtcbmNvbnN0IGogPSBuZXcgYSgpO1xuY29uc3QgSCA9IG5ldyBhKCk7XG5jb25zdCBUID0gbmV3IGEoKTtcblxuY2xhc3MgVyB7XG4gIGNvbnN0cnVjdG9yKGUpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGU7XG4gICAgdGhpcy5wb3NpdGlvbkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KDMgKiBlLmNvdW50KS5maWxsKDApO1xuICAgIHRoaXMudmVsb2NpdHlEYXRhID0gbmV3IEZsb2F0MzJBcnJheSgzICogZS5jb3VudCkuZmlsbCgwKTtcbiAgICB0aGlzLnNpemVEYXRhID0gbmV3IEZsb2F0MzJBcnJheShlLmNvdW50KS5maWxsKDEpO1xuICAgIHRoaXMuY2VudGVyID0gbmV3IGEoKTtcbiAgICB0aGlzLiNSKCk7XG4gICAgdGhpcy5zZXRTaXplcygpO1xuICB9XG4gICNSKCkge1xuICAgIGNvbnN0IHsgY29uZmlnOiBlLCBwb3NpdGlvbkRhdGE6IHQgfSA9IHRoaXM7XG4gICAgdGhpcy5jZW50ZXIudG9BcnJheSh0LCAwKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGUuY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgcyA9IDMgKiBpO1xuICAgICAgdFtzXSA9IEUoMiAqIGUubWF4WCk7XG4gICAgICB0W3MgKyAxXSA9IEUoMiAqIGUubWF4WSk7XG4gICAgICB0W3MgKyAyXSA9IEUoMiAqIGUubWF4Wik7XG4gICAgfVxuICB9XG4gIHNldFNpemVzKCkge1xuICAgIGNvbnN0IHsgY29uZmlnOiBlLCBzaXplRGF0YTogdCB9ID0gdGhpcztcbiAgICB0WzBdID0gZS5zaXplMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGUuY291bnQ7IGkrKykge1xuICAgICAgdFtpXSA9IGsoZS5taW5TaXplLCBlLm1heFNpemUpO1xuICAgIH1cbiAgfVxuICB1cGRhdGUoZSkge1xuICAgIGNvbnN0IHsgY29uZmlnOiB0LCBjZW50ZXI6IGksIHBvc2l0aW9uRGF0YTogcywgc2l6ZURhdGE6IG4sIHZlbG9jaXR5RGF0YTogbyB9ID0gdGhpcztcbiAgICBsZXQgciA9IDA7XG4gICAgaWYgKHQuY29udHJvbFNwaGVyZTApIHtcbiAgICAgIHIgPSAxO1xuICAgICAgRi5mcm9tQXJyYXkocywgMCk7XG4gICAgICBGLmxlcnAoaSwgMC4xKS50b0FycmF5KHMsIDApO1xuICAgICAgVi5zZXQoMCwgMCwgMCkudG9BcnJheShvLCAwKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaWR4ID0gcjsgaWR4IDwgdC5jb3VudDsgaWR4KyspIHtcbiAgICAgIGNvbnN0IGJhc2UgPSAzICogaWR4O1xuICAgICAgSS5mcm9tQXJyYXkocywgYmFzZSk7XG4gICAgICBCLmZyb21BcnJheShvLCBiYXNlKTtcbiAgICAgIEIueSAtPSBlLmRlbHRhICogdC5ncmF2aXR5ICogbltpZHhdO1xuICAgICAgQi5tdWx0aXBseVNjYWxhcih0LmZyaWN0aW9uKTtcbiAgICAgIEIuY2xhbXBMZW5ndGgoMCwgdC5tYXhWZWxvY2l0eSk7XG4gICAgICBJLmFkZChCKTtcbiAgICAgIEkudG9BcnJheShzLCBiYXNlKTtcbiAgICAgIEIudG9BcnJheShvLCBiYXNlKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaWR4ID0gcjsgaWR4IDwgdC5jb3VudDsgaWR4KyspIHtcbiAgICAgIGNvbnN0IGJhc2UgPSAzICogaWR4O1xuICAgICAgSS5mcm9tQXJyYXkocywgYmFzZSk7XG4gICAgICBCLmZyb21BcnJheShvLCBiYXNlKTtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IG5baWR4XTtcbiAgICAgIGZvciAobGV0IGpkeCA9IGlkeCArIDE7IGpkeCA8IHQuY291bnQ7IGpkeCsrKSB7XG4gICAgICAgIGNvbnN0IG90aGVyQmFzZSA9IDMgKiBqZHg7XG4gICAgICAgIE8uZnJvbUFycmF5KHMsIG90aGVyQmFzZSk7XG4gICAgICAgIE4uZnJvbUFycmF5KG8sIG90aGVyQmFzZSk7XG4gICAgICAgIGNvbnN0IG90aGVyUmFkaXVzID0gbltqZHhdO1xuICAgICAgICBfLmNvcHkoTykuc3ViKEkpO1xuICAgICAgICBjb25zdCBkaXN0ID0gXy5sZW5ndGgoKTtcbiAgICAgICAgY29uc3Qgc3VtUmFkaXVzID0gcmFkaXVzICsgb3RoZXJSYWRpdXM7XG4gICAgICAgIGlmIChkaXN0IDwgc3VtUmFkaXVzKSB7XG4gICAgICAgICAgY29uc3Qgb3ZlcmxhcCA9IHN1bVJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgai5jb3B5KF8pXG4gICAgICAgICAgICAubm9ybWFsaXplKClcbiAgICAgICAgICAgIC5tdWx0aXBseVNjYWxhcigwLjUgKiBvdmVybGFwKTtcbiAgICAgICAgICBILmNvcHkoaikubXVsdGlwbHlTY2FsYXIoTWF0aC5tYXgoQi5sZW5ndGgoKSwgMSkpO1xuICAgICAgICAgIFQuY29weShqKS5tdWx0aXBseVNjYWxhcihNYXRoLm1heChOLmxlbmd0aCgpLCAxKSk7XG4gICAgICAgICAgSS5zdWIoaik7XG4gICAgICAgICAgQi5zdWIoSCk7XG4gICAgICAgICAgSS50b0FycmF5KHMsIGJhc2UpO1xuICAgICAgICAgIEIudG9BcnJheShvLCBiYXNlKTtcbiAgICAgICAgICBPLmFkZChqKTtcbiAgICAgICAgICBOLmFkZChUKTtcbiAgICAgICAgICBPLnRvQXJyYXkocywgb3RoZXJCYXNlKTtcbiAgICAgICAgICBOLnRvQXJyYXkobywgb3RoZXJCYXNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHQuY29udHJvbFNwaGVyZTApIHtcbiAgICAgICAgXy5jb3B5KEYpLnN1YihJKTtcbiAgICAgICAgY29uc3QgZGlzdCA9IF8ubGVuZ3RoKCk7XG4gICAgICAgIGNvbnN0IHN1bVJhZGl1czAgPSByYWRpdXMgKyBuWzBdO1xuICAgICAgICBpZiAoZGlzdCA8IHN1bVJhZGl1czApIHtcbiAgICAgICAgICBjb25zdCBkaWZmID0gc3VtUmFkaXVzMCAtIGRpc3Q7XG4gICAgICAgICAgai5jb3B5KF8ubm9ybWFsaXplKCkpLm11bHRpcGx5U2NhbGFyKGRpZmYpO1xuICAgICAgICAgIEguY29weShqKS5tdWx0aXBseVNjYWxhcihNYXRoLm1heChCLmxlbmd0aCgpLCAyKSk7XG4gICAgICAgICAgSS5zdWIoaik7XG4gICAgICAgICAgQi5zdWIoSCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhJLngpICsgcmFkaXVzID4gdC5tYXhYKSB7XG4gICAgICAgIEkueCA9IE1hdGguc2lnbihJLngpICogKHQubWF4WCAtIHJhZGl1cyk7XG4gICAgICAgIEIueCA9IC1CLnggKiB0LndhbGxCb3VuY2U7XG4gICAgICB9XG4gICAgICBpZiAodC5ncmF2aXR5ID09PSAwKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhJLnkpICsgcmFkaXVzID4gdC5tYXhZKSB7XG4gICAgICAgICAgSS55ID0gTWF0aC5zaWduKEkueSkgKiAodC5tYXhZIC0gcmFkaXVzKTtcbiAgICAgICAgICBCLnkgPSAtQi55ICogdC53YWxsQm91bmNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKEkueSAtIHJhZGl1cyA8IC10Lm1heFkpIHtcbiAgICAgICAgSS55ID0gLXQubWF4WSArIHJhZGl1cztcbiAgICAgICAgQi55ID0gLUIueSAqIHQud2FsbEJvdW5jZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heEJvdW5kYXJ5ID0gTWF0aC5tYXgodC5tYXhaLCB0Lm1heFNpemUpO1xuICAgICAgaWYgKE1hdGguYWJzKEkueikgKyByYWRpdXMgPiBtYXhCb3VuZGFyeSkge1xuICAgICAgICBJLnogPSBNYXRoLnNpZ24oSS56KSAqICh0Lm1heFogLSByYWRpdXMpO1xuICAgICAgICBCLnogPSAtQi56ICogdC53YWxsQm91bmNlO1xuICAgICAgfVxuICAgICAgSS50b0FycmF5KHMsIGJhc2UpO1xuICAgICAgQi50b0FycmF5KG8sIGJhc2UpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBZIGV4dGVuZHMgYyB7XG4gIGNvbnN0cnVjdG9yKGUpIHtcbiAgICBzdXBlcihlKTtcbiAgICB0aGlzLnVuaWZvcm1zID0ge1xuICAgICAgdGhpY2tuZXNzRGlzdG9ydGlvbjogeyB2YWx1ZTogMC4xIH0sXG4gICAgICB0aGlja25lc3NBbWJpZW50OiB7IHZhbHVlOiAwIH0sXG4gICAgICB0aGlja25lc3NBdHRlbnVhdGlvbjogeyB2YWx1ZTogMC4xIH0sXG4gICAgICB0aGlja25lc3NQb3dlcjogeyB2YWx1ZTogMiB9LFxuICAgICAgdGhpY2tuZXNzU2NhbGU6IHsgdmFsdWU6IDEwIH1cbiAgICB9O1xuICAgIHRoaXMuZGVmaW5lcy5VU0VfVVYgPSAnJztcbiAgICB0aGlzLm9uQmVmb3JlQ29tcGlsZSA9IGUgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihlLnVuaWZvcm1zLCB0aGlzLnVuaWZvcm1zKTtcbiAgICAgIGUuZnJhZ21lbnRTaGFkZXIgPVxuICAgICAgICAnXFxuICAgICAgICB1bmlmb3JtIGZsb2F0IHRoaWNrbmVzc1Bvd2VyO1xcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB0aGlja25lc3NTY2FsZTtcXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdGhpY2tuZXNzRGlzdG9ydGlvbjtcXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdGhpY2tuZXNzQW1iaWVudDtcXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdGhpY2tuZXNzQXR0ZW51YXRpb247XFxuICAgICAgJyArXG4gICAgICAgIGUuZnJhZ21lbnRTaGFkZXI7XG4gICAgICBlLmZyYWdtZW50U2hhZGVyID0gZS5mcmFnbWVudFNoYWRlci5yZXBsYWNlKFxuICAgICAgICAndm9pZCBtYWluKCkgeycsXG4gICAgICAgICdcXG4gICAgICAgIHZvaWQgUkVfRGlyZWN0X1NjYXR0ZXJpbmcoY29uc3QgaW4gSW5jaWRlbnRMaWdodCBkaXJlY3RMaWdodCwgY29uc3QgaW4gdmVjMiB1diwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeVBvc2l0aW9uLCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5Tm9ybWFsLCBjb25zdCBpbiB2ZWMzIGdlb21ldHJ5Vmlld0RpciwgY29uc3QgaW4gdmVjMyBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCwgaW5vdXQgUmVmbGVjdGVkTGlnaHQgcmVmbGVjdGVkTGlnaHQpIHtcXG4gICAgICAgICAgdmVjMyBzY2F0dGVyaW5nSGFsZiA9IG5vcm1hbGl6ZShkaXJlY3RMaWdodC5kaXJlY3Rpb24gKyAoZ2VvbWV0cnlOb3JtYWwgKiB0aGlja25lc3NEaXN0b3J0aW9uKSk7XFxuICAgICAgICAgIGZsb2F0IHNjYXR0ZXJpbmdEb3QgPSBwb3coc2F0dXJhdGUoZG90KGdlb21ldHJ5Vmlld0RpciwgLXNjYXR0ZXJpbmdIYWxmKSksIHRoaWNrbmVzc1Bvd2VyKSAqIHRoaWNrbmVzc1NjYWxlO1xcbiAgICAgICAgICAjaWZkZWYgVVNFX0NPTE9SXFxuICAgICAgICAgICAgdmVjMyBzY2F0dGVyaW5nSWxsdSA9IChzY2F0dGVyaW5nRG90ICsgdGhpY2tuZXNzQW1iaWVudCkgKiB2Q29sb3I7XFxuICAgICAgICAgICNlbHNlXFxuICAgICAgICAgICAgdmVjMyBzY2F0dGVyaW5nSWxsdSA9IChzY2F0dGVyaW5nRG90ICsgdGhpY2tuZXNzQW1iaWVudCkgKiBkaWZmdXNlO1xcbiAgICAgICAgICAjZW5kaWZcXG4gICAgICAgICAgcmVmbGVjdGVkTGlnaHQuZGlyZWN0RGlmZnVzZSArPSBzY2F0dGVyaW5nSWxsdSAqIHRoaWNrbmVzc0F0dGVudWF0aW9uICogZGlyZWN0TGlnaHQuY29sb3I7XFxuICAgICAgICB9XFxuXFxuICAgICAgICB2b2lkIG1haW4oKSB7XFxuICAgICAgJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHQgPSBoLmxpZ2h0c19mcmFnbWVudF9iZWdpbi5yZXBsYWNlQWxsKFxuICAgICAgICAnUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZ2VvbWV0cnlOb3JtYWwsIGdlb21ldHJ5Vmlld0RpciwgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIG1hdGVyaWFsLCByZWZsZWN0ZWRMaWdodCApOycsXG4gICAgICAgICdcXG4gICAgICAgICAgUkVfRGlyZWN0KCBkaXJlY3RMaWdodCwgZ2VvbWV0cnlQb3NpdGlvbiwgZ2VvbWV0cnlOb3JtYWwsIGdlb21ldHJ5Vmlld0RpciwgZ2VvbWV0cnlDbGVhcmNvYXROb3JtYWwsIG1hdGVyaWFsLCByZWZsZWN0ZWRMaWdodCApO1xcbiAgICAgICAgICBSRV9EaXJlY3RfU2NhdHRlcmluZyhkaXJlY3RMaWdodCwgdlV2LCBnZW9tZXRyeVBvc2l0aW9uLCBnZW9tZXRyeU5vcm1hbCwgZ2VvbWV0cnlWaWV3RGlyLCBnZW9tZXRyeUNsZWFyY29hdE5vcm1hbCwgcmVmbGVjdGVkTGlnaHQpO1xcbiAgICAgICAgJ1xuICAgICAgKTtcbiAgICAgIGUuZnJhZ21lbnRTaGFkZXIgPSBlLmZyYWdtZW50U2hhZGVyLnJlcGxhY2UoJyNpbmNsdWRlIDxsaWdodHNfZnJhZ21lbnRfYmVnaW4+JywgdCk7XG4gICAgICBpZiAodGhpcy5vbkJlZm9yZUNvbXBpbGUyKSB0aGlzLm9uQmVmb3JlQ29tcGlsZTIoZSk7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBYID0ge1xuICBjb3VudDogMjAwLFxuICBjb2xvcnM6IFswLCAwLCAwXSxcbiAgYW1iaWVudENvbG9yOiAxNjc3NzIxNSxcbiAgYW1iaWVudEludGVuc2l0eTogMSxcbiAgbGlnaHRJbnRlbnNpdHk6IDIwMCxcbiAgbWF0ZXJpYWxQYXJhbXM6IHtcbiAgICBtZXRhbG5lc3M6IDAuNSxcbiAgICByb3VnaG5lc3M6IDAuNSxcbiAgICBjbGVhcmNvYXQ6IDEsXG4gICAgY2xlYXJjb2F0Um91Z2huZXNzOiAwLjE1XG4gIH0sXG4gIG1pblNpemU6IDAuNSxcbiAgbWF4U2l6ZTogMSxcbiAgc2l6ZTA6IDEsXG4gIGdyYXZpdHk6IDAuNSxcbiAgZnJpY3Rpb246IDAuOTk3NSxcbiAgd2FsbEJvdW5jZTogMC45NSxcbiAgbWF4VmVsb2NpdHk6IDAuMTUsXG4gIG1heFg6IDUsXG4gIG1heFk6IDUsXG4gIG1heFo6IDIsXG4gIGNvbnRyb2xTcGhlcmUwOiBmYWxzZSxcbiAgZm9sbG93Q3Vyc29yOiB0cnVlXG59O1xuXG5jb25zdCBVID0gbmV3IG0oKTtcblxuY2xhc3MgWiBleHRlbmRzIGQge1xuICBjb25zdHJ1Y3RvcihlLCB0ID0ge30pIHtcbiAgICBjb25zdCBpID0geyAuLi5YLCAuLi50IH07XG4gICAgY29uc3QgcyA9IG5ldyB6KCk7XG4gICAgY29uc3QgbiA9IG5ldyBwKGUsIDAuMDQpLmZyb21TY2VuZShzKS50ZXh0dXJlO1xuICAgIGNvbnN0IG8gPSBuZXcgZygpO1xuICAgIGNvbnN0IHIgPSBuZXcgWSh7IGVudk1hcDogbiwgLi4uaS5tYXRlcmlhbFBhcmFtcyB9KTtcbiAgICByLmVudk1hcFJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgc3VwZXIobywgciwgaS5jb3VudCk7XG4gICAgdGhpcy5jb25maWcgPSBpO1xuICAgIHRoaXMucGh5c2ljcyA9IG5ldyBXKGkpO1xuICAgIHRoaXMuI1MoKTtcbiAgICB0aGlzLnNldENvbG9ycyhpLmNvbG9ycyk7XG4gIH1cbiAgI1MoKSB7XG4gICAgdGhpcy5hbWJpZW50TGlnaHQgPSBuZXcgZih0aGlzLmNvbmZpZy5hbWJpZW50Q29sb3IsIHRoaXMuY29uZmlnLmFtYmllbnRJbnRlbnNpdHkpO1xuICAgIHRoaXMuYWRkKHRoaXMuYW1iaWVudExpZ2h0KTtcbiAgICB0aGlzLmxpZ2h0ID0gbmV3IHUodGhpcy5jb25maWcuY29sb3JzWzBdLCB0aGlzLmNvbmZpZy5saWdodEludGVuc2l0eSk7XG4gICAgdGhpcy5hZGQodGhpcy5saWdodCk7XG4gIH1cbiAgc2V0Q29sb3JzKGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlKSAmJiBlLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHQgPSAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbGV0IHQsIGk7XG4gICAgICAgIGZ1bmN0aW9uIHNldENvbG9ycyhlKSB7XG4gICAgICAgICAgdCA9IGU7XG4gICAgICAgICAgaSA9IFtdO1xuICAgICAgICAgIHQuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICAgICAgaS5wdXNoKG5ldyBsKGNvbCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldENvbG9ycyhlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzZXRDb2xvcnMsXG4gICAgICAgICAgZ2V0Q29sb3JBdDogZnVuY3Rpb24gKHJhdGlvLCBvdXQgPSBuZXcgbCgpKSB7XG4gICAgICAgICAgICBjb25zdCBzY2FsZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCByYXRpbykpICogKHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKHNjYWxlZCk7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGlbaWR4XTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gdC5sZW5ndGggLSAxKSByZXR1cm4gc3RhcnQuY2xvbmUoKTtcbiAgICAgICAgICAgIGNvbnN0IGFscGhhID0gc2NhbGVkIC0gaWR4O1xuICAgICAgICAgICAgY29uc3QgZW5kID0gaVtpZHggKyAxXTtcbiAgICAgICAgICAgIG91dC5yID0gc3RhcnQuciArIGFscGhhICogKGVuZC5yIC0gc3RhcnQucik7XG4gICAgICAgICAgICBvdXQuZyA9IHN0YXJ0LmcgKyBhbHBoYSAqIChlbmQuZyAtIHN0YXJ0LmcpO1xuICAgICAgICAgICAgb3V0LmIgPSBzdGFydC5iICsgYWxwaGEgKiAoZW5kLmIgLSBzdGFydC5iKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkoZSk7XG4gICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLmNvdW50OyBpZHgrKykge1xuICAgICAgICB0aGlzLnNldENvbG9yQXQoaWR4LCB0LmdldENvbG9yQXQoaWR4IC8gdGhpcy5jb3VudCkpO1xuICAgICAgICBpZiAoaWR4ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5saWdodC5jb2xvci5jb3B5KHQuZ2V0Q29sb3JBdChpZHggLyB0aGlzLmNvdW50KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuaW5zdGFuY2VDb2xvci5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgfVxuICB9XG4gIHVwZGF0ZShlKSB7XG4gICAgdGhpcy5waHlzaWNzLnVwZGF0ZShlKTtcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLmNvdW50OyBpZHgrKykge1xuICAgICAgVS5wb3NpdGlvbi5mcm9tQXJyYXkodGhpcy5waHlzaWNzLnBvc2l0aW9uRGF0YSwgMyAqIGlkeCk7XG4gICAgICBpZiAoaWR4ID09PSAwICYmIHRoaXMuY29uZmlnLmZvbGxvd0N1cnNvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgVS5zY2FsZS5zZXRTY2FsYXIoMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBVLnNjYWxlLnNldFNjYWxhcih0aGlzLnBoeXNpY3Muc2l6ZURhdGFbaWR4XSk7XG4gICAgICB9XG4gICAgICBVLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgdGhpcy5zZXRNYXRyaXhBdChpZHgsIFUubWF0cml4KTtcbiAgICAgIGlmIChpZHggPT09IDApIHRoaXMubGlnaHQucG9zaXRpb24uY29weShVLnBvc2l0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5pbnN0YW5jZU1hdHJpeC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQmFsbHBpdChlLCB0ID0ge30pIHtcbiAgY29uc3QgaSA9IG5ldyB4KHtcbiAgICBjYW52YXM6IGUsXG4gICAgc2l6ZTogJ3BhcmVudCcsXG4gICAgcmVuZGVyZXJPcHRpb25zOiB7IGFudGlhbGlhczogdHJ1ZSwgYWxwaGE6IHRydWUgfVxuICB9KTtcbiAgbGV0IHM7XG4gIGkucmVuZGVyZXIudG9uZU1hcHBpbmcgPSB2O1xuICBpLmNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMjApO1xuICBpLmNhbWVyYS5sb29rQXQoMCwgMCwgMCk7XG4gIGkuY2FtZXJhTWF4QXNwZWN0ID0gMS41O1xuICBpLnJlc2l6ZSgpO1xuICBpbml0aWFsaXplKHQpO1xuICBjb25zdCBuID0gbmV3IHkoKTtcbiAgY29uc3QgbyA9IG5ldyB3KG5ldyBhKDAsIDAsIDEpLCAwKTtcbiAgY29uc3QgciA9IG5ldyBhKCk7XG4gIGxldCBjID0gZmFsc2U7XG5cbiAgZS5zdHlsZS50b3VjaEFjdGlvbiA9ICdub25lJztcbiAgZS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICBlLnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSc7XG5cbiAgY29uc3QgaCA9IFMoe1xuICAgIGRvbUVsZW1lbnQ6IGUsXG4gICAgb25Nb3ZlKCkge1xuICAgICAgbi5zZXRGcm9tQ2FtZXJhKGgublBvc2l0aW9uLCBpLmNhbWVyYSk7XG4gICAgICBpLmNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbihvLm5vcm1hbCk7XG4gICAgICBuLnJheS5pbnRlcnNlY3RQbGFuZShvLCByKTtcbiAgICAgIHMucGh5c2ljcy5jZW50ZXIuY29weShyKTtcbiAgICAgIHMuY29uZmlnLmNvbnRyb2xTcGhlcmUwID0gdHJ1ZTtcbiAgICB9LFxuICAgIG9uTGVhdmUoKSB7XG4gICAgICBzLmNvbmZpZy5jb250cm9sU3BoZXJlMCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoZSkge1xuICAgIGlmIChzKSB7XG4gICAgICBpLmNsZWFyKCk7XG4gICAgICBpLnNjZW5lLnJlbW92ZShzKTtcbiAgICB9XG4gICAgcyA9IG5ldyBaKGkucmVuZGVyZXIsIGUpO1xuICAgIGkuc2NlbmUuYWRkKHMpO1xuICB9XG4gIGkub25CZWZvcmVSZW5kZXIgPSBlID0+IHtcbiAgICBpZiAoIWMpIHMudXBkYXRlKGUpO1xuICB9O1xuICBpLm9uQWZ0ZXJSZXNpemUgPSBlID0+IHtcbiAgICBzLmNvbmZpZy5tYXhYID0gZS53V2lkdGggLyAyO1xuICAgIHMuY29uZmlnLm1heFkgPSBlLndIZWlnaHQgLyAyO1xuICB9O1xuICByZXR1cm4ge1xuICAgIHRocmVlOiBpLFxuICAgIGdldCBzcGhlcmVzKCkge1xuICAgICAgcmV0dXJuIHM7XG4gICAgfSxcbiAgICBzZXRDb3VudChlKSB7XG4gICAgICBpbml0aWFsaXplKHsgLi4ucy5jb25maWcsIGNvdW50OiBlIH0pO1xuICAgIH0sXG4gICAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgICBjID0gIWM7XG4gICAgfSxcbiAgICBkaXNwb3NlKCkge1xuICAgICAgaC5kaXNwb3NlKCk7XG4gICAgICBpLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IEJhbGxwaXQgPSAoeyBjbGFzc05hbWUgPSAnJywgZm9sbG93Q3Vyc29yID0gdHJ1ZSwgLi4ucHJvcHMgfSkgPT4ge1xuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHNwaGVyZXNJbnN0YW5jZVJlZiA9IHVzZVJlZihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG5cbiAgICBzcGhlcmVzSW5zdGFuY2VSZWYuY3VycmVudCA9IGNyZWF0ZUJhbGxwaXQoY2FudmFzLCB7IGZvbGxvd0N1cnNvciwgLi4ucHJvcHMgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHNwaGVyZXNJbnN0YW5jZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIHNwaGVyZXNJbnN0YW5jZVJlZi5jdXJyZW50LmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW10pO1xuXG4gIHJldHVybiA8Y2FudmFzIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByZWY9e2NhbnZhc1JlZn0gc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfX0gLz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCYWxscGl0O1xuIl0sImZpbGUiOiJDOi9Vc2Vycy9tci9PbmVEcml2ZS9EZXNrdG9wL0FydW4gcHJvamVjdC9SZXVtZS1tYWtlci9zcmMvY29tcG9uZW50cy9CYWxscGl0LmpzeCJ9