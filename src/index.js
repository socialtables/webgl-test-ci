import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh
} from "three";
import fetch from "unfetch";

const WIDTH = 500;
const HEIGHT = 500;

const scene = new Scene();
const camera = new PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
const renderer = new WebGLRenderer();
renderer.setSize( WIDTH, HEIGHT );
document.body.appendChild( renderer.domElement );

const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

renderer.render( scene, camera );
const gl = renderer.getContext();
gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));

const imageURL = renderer.domElement.toDataURL();

fetch("/save-image", {
	method: "POST",
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		image: imageURL
	})
})
.then(() => {
	return fetch("/close", { method: "POSt" });
});
