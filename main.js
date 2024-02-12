// code pour le mouvement 360° du logo
// document.addEventListener("DOMContentLoaded", function() {
//     const logo = document.querySelector(".logo");
//     logo.addEventListener("click", function() {
//         logo.classList.add("clicked");

//         // Réinitialisez la classe "clicked" après l'animation (en utilisant un délai)
//         setTimeout(function() {
//             logo.classList.remove("clicked");
//         }, 300); // 300ms (0.3s) correspond à la durée de l'animation dans les styles CSS
//     });

    
// });
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app'),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const AmbientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(AmbientLight);


//fais FBXloader

const loader = new FBXLoader();
loader.load('./3D/siege.fbx', function (object) {
  object.scale.set(0.005, 0.005, 0.005);
  object.position.set(0, 0, 0);
  object.name="siege";
  scene.add(object);
});

let logo;
//logo MMI
loader.load('./3D/logo2.fbx', function (object) {
  logo = object;
  logo.scale.set(0.005, 0.005, 0.005);
  //modifie son matériau
  logo.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(0x292929);
    }
  });
  logo.name="logo";
  logo.rotation.x = 1.5;
  logo.position.set(-10, 13, 0);
  scene.add(logo);
});


camera.position.set(0, 13, 9);
camera.rotation.x = -0.5;

const animate = function () {
  requestAnimationFrame(animate);

  //recupere le logo par son nom
  if(logo!== undefined) {
    logo.children[0].rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

animate();

const resize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', resize);
resize();

// lumiere

let spotLight = new THREE.SpotLight( 0xffffff, 400 );
spotLight.position.set( 0, 17, 2.5 );
spotLight.penumbra = 1;
spotLight.decay = 1;
spotLight.distance = 0;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.focus = 1;
scene.add( spotLight );

document.addEventListener('mousemove', function(event) {
    let siege = scene.getObjectByName("siege");
    if(siege!== undefined) {
        siege.rotation.y += event.movementX * 0.0005;
        siege.rotation.x += event.movementY * 0.0005;
        renderer.render(scene, camera);
    }
})


