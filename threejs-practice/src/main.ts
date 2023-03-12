import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGL1Renderer;
let controls: OrbitControls;
let pointLight: THREE.PointLight;
let redballMesh: THREE.Mesh;
let textMeshes: { mesh: THREE.Mesh; deg: number }[] = [];
const init = () => {
	//sceneを作成
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	const axesHelper = new THREE.AxesHelper(40);
	scene.add(axesHelper);
	camera.position.set(0, 0, +500);

	//PerspectiveCamera(視野角,アスペクト比,開始距離,終了距離)

	renderer = new THREE.WebGL1Renderer({ alpha: true });

	document.body.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	//Fonts
	const fontLoader = new FontLoader();

	fontLoader.load(
		"./node_modules/three/examples/fonts/gentilis_regular.typeface.json",
		(font) => {
			console.log(font);
			textMeshes = [
				createTextGeometry("P", font, 320),
				createTextGeometry("L", font, 340),
				createTextGeometry("O", font, 0),
				createTextGeometry("G", font, 20),
				createTextGeometry("L", font, 40),
				createTextGeometry("A", font, 60),
				createTextGeometry("B", font, 80),
			];
			textMeshes.forEach(({ mesh }) => {
				scene.add(mesh);
			});
		},
	);

	//テクスチャの追加
	// let ballTexture = new THREE.TextureLoader().load("proglab.png");
	// console.log(ballTexture);
	//ジオメトリ作成 骨格
	let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
	let redballGeometry = new THREE.SphereGeometry(20, 64, 32);

	//マテリアル作成 色,材質を指定
	let ballMaterial = new THREE.MeshPhysicalMaterial();
	let redballMaterial = new THREE.MeshPhysicalMaterial();
	redballMaterial.color.set("red");

	ballMaterial.color.set("aqua");
	//メッシュ がっちゃんこ
	let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
	redballMesh = new THREE.Mesh(redballGeometry, redballMaterial);
	redballMesh.position.set(110, 40, 40);
	scene.add(ballMesh, redballMesh);

	//平行光源を設定
	let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);

	//ポイント光源の指定
	pointLight = new THREE.PointLight(0xffffff, 1);
	pointLight.position.set(-200, -200, -200);
	scene.add(pointLight);

	//ポイント光源の位置確認
	let pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
	//ポイント光源を急の周りを巡回させる
	scene.add(pointLightHelper);
	controls = new OrbitControls(camera, renderer.domElement);
	window.addEventListener("resize", onWindowResize);
	animate();
};

//ブラウザのリサイズ対応
const onWindowResize = () => {
	//rendererのサイズを随時更新
	renderer.setSize(window.innerWidth, window.innerHeight);

	//カメラのアスペクト比を更新
	camera.aspect = window.innerWidth / window.innerHeight;
	//プロパティを変更したら更新するために必要
	camera.updateProjectionMatrix();
};

function animate() {
	pointLight.position.set(
		200 * Math.sin(Date.now() / 500),
		200 * Math.sin(Date.now() / 1000),
		200 * Math.cos(Date.now() / 500),
	);
	redballMesh.position.set(
		120 * Math.sin(Date.now() / 500),
		-50,
		120 * Math.cos(Date.now() / 500),
	);

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function createTextGeometry(text: string, font: Font, deg: number) {
	const textGeometry = new TextGeometry(text, {
		font: font,
		size: 40,
		height: 1,
		curveSegments: 10,
		bevelEnabled: true,
		bevelSize: 1,
		bevelSegments: 20,
		bevelOffset: 0.4,
		bevelThickness: 5,
	});

	textGeometry.center();

	const material = new THREE.MeshPhongMaterial({ color: "blue" });

	const r = 120;
	const phi = 90 * (Math.PI / 180);
	const theta = deg * (Math.PI / 180);
	const sphericalPos = new THREE.Spherical(r, phi, theta);

	let textMesh = new THREE.Mesh(textGeometry, material);
	textMesh.position.setFromSpherical(sphericalPos);
	textMesh.position.y = -20;

	const vector = new THREE.Vector3();
	vector.copy(textMesh.position).multiplyScalar(2);

	textMesh.lookAt(vector);
	return { mesh: textMesh, deg };
}

//レンダリング
window.addEventListener("load", init);
