import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

let scene;
let camera;
let renderer;
let pointLight;
let controls;
let sphere;
let plane;
let octahedron;

window.addEventListener("load", init);

function init() {
	//シーン
	scene = new THREE.Scene();

	//カメラ
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		100,
	);
	camera.position.set(1, 1, 2);

	//レンダラー
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	document.body.appendChild(renderer.domElement);

	/**
	 * マテリアルセクション
	 */
	//ジオメトリ
	const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
	const planeGeometry = new THREE.PlaneGeometry(1, 1);
	const octahedronGeometry = new THREE.OctahedronGeometry(0.5);
	//テキスチャ
	const texture = new THREE.TextureLoader().load("textures/brick.jpg");
	// const material = new THREE.MeshBasicMaterial({});
	// material.map = texture;
	// material.color.set("red");
	// material.wireframe = true;
	// material.side = THREE.DoubleSide;
	// material.opacity = 0.5;
	// material.transparent = true;
	// const material = new THREE.MeshNormalMaterial();
	// material.flatShading = true;
	// const material = new THREE.MeshStandardMaterial();
	// material.color.set("#049ef4");
	// material.roughness = 0.34;
	// material.metalness = 0.64;

	//光の反射
	const material = new THREE.MeshPhongMaterial();
	material.shininess = 100;
	material.specular = new THREE.Color("red");
	//明かりを追加
	//全体を明るくする
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
	scene.add(ambientLight);
	const pointLight = new THREE.PointLight(0xffffff, 0.7);
	scene.add(pointLight);
	const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
	pointLight.position.set(1, 2, 3);
	scene.add(pointLightHelper);

	sphere = new THREE.Mesh(sphereGeometry, material);
	sphere.position.x = -1.5;
	plane = new THREE.Mesh(planeGeometry, material);
	octahedron = new THREE.Mesh(octahedronGeometry, material);
	octahedron.position.x = 1.5;

	scene.add(sphere, plane, octahedron);

	//マウス操作
	const controls = new OrbitControls(camera, renderer.domElement);

	window.addEventListener("resize", onWindowResize);

	animate();
}

const clock = new THREE.Clock();
function animate() {
	const elapseTime = clock.getElapsedTime();

	//オブジェクトの回転
	sphere.rotation.x = elapseTime;
	plane.rotation.x = elapseTime;
	octahedron.rotation.x = elapseTime;
	sphere.rotation.y = elapseTime;
	plane.rotation.y = elapseTime;
	octahedron.rotation.y = elapseTime;
	//レンダリング
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
