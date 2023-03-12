// import * as THREE from "./build/three.module.js";
// import { OrbitControls } from "./controls/OrbitControls.js";

// //UIデバッグ
// const gui = new dat.GUI();

// //サイズ
// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };

// //シーン
// const scene = new THREE.Scene();

// //カメラ
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	sizes.width / sizes.height,
// 	0.1,
// 	1000,
// );
// camera.position.x = -2;
// camera.position.y = 1;
// camera.position.z = 4;
// scene.add(camera);

// //ライト
// const ambientLight = new THREE.AmbientLight();
// ambientLight.color.set("white");
// ambientLight.intensity = 0.4;
// gui.add(ambientLight, "intensity").min(0).max(1);
// scene.add(ambientLight);

// //マテリアル
// const material = new THREE.MeshStandardMaterial();
// const material2 = new THREE.MeshStandardMaterial();
// material.roughness = 0.3;
// material.color.set("red");
// //オブジェクト
// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
// sphere.position.x = -1.5;

// const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material2);

// const torus = new THREE.Mesh(
// 	new THREE.TorusGeometry(0.3, 0.2, 32, 64),
// 	material,
// );
// torus.position.x = 1.5;

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
// plane.rotation.x = -Math.PI * 0.5;
// plane.position.y = -0.65;

// scene.add(sphere, cube, torus, plane);

// window.addEventListener("resize", () => {
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;

// 	camera.aspect = sizes.width / sizes.height;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// //レンダラー
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// document.body.appendChild(renderer.domElement);

// //コントロール
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// const clock = new THREE.Clock();

// const animate = () => {
// 	const elapsedTime = clock.getElapsedTime();

// 	// Update objects
// 	sphere.rotation.y = 0.1 * elapsedTime;
// 	cube.rotation.y = 0.1 * elapsedTime;
// 	torus.rotation.y = 0.1 * elapsedTime;

// 	sphere.rotation.x = 0.15 * elapsedTime;
// 	cube.rotation.x = 0.15 * elapsedTime;
// 	torus.rotation.x = 0.15 * elapsedTime;

// 	controls.update();

// 	renderer.render(scene, camera);
// 	window.requestAnimationFrame(animate);
// };

// animate();
// const objClick = (obj, callback) => {
// 	renderer.domElement.addEventListener("click", (evt) => {
// 		const raycaster = new THREE.Raycaster();
// 		const vector = new THREE.Vector2(
// 			(evt.clientX / window.innerWidth) * 2 - 1,
// 			(evt.clientY / window.innerHeight) * -2 + 1,
// 		);

// 		raycaster.setFromCamera(vector, camera);

// 		const intersects = raycaster.intersectObjects(scene.children);

// 		const clickObj = intersects.find((intersect) => {
// 			return intersect.object.uuid === obj.uuid;
// 		});
// 		if (clickObj) {
// 			callback(clickObj);
// 		}
// 	});
// };
// objClick(cube, (mesh) => {
// 	console.log("test");
// });

// window.addEventListener("keydown", (event) => {
// 	console.log(event);
// 	if (event.key === "ArrowLeft") {
// 		cube.position.x -= 0.3;
// 	} else if (event.key === "ArrowRight") {
// 		cube.position.x += 0.3;
// 	} else if (event.key === "ArrowUp") {
// 		cube.position.y += 0.3;
// 	} else if (event.key === "ArrowDown") {
// 		cube.position.y -= 0.3;
// 	}
// });
