import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 13;

const scene = new THREE.Scene();

let drone;
let mixer;
const loader = new GLTFLoader();
loader.load('../assets/happy_drone.glb',
    function(gltf){
        drone = gltf.scene;
        drone.position.x = .72;
        drone.position.y = .3
        drone.rotation.y = -.3;
        scene.add(drone);
        mixer = new THREE.AnimationMixer(drone);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
    },
    function(xhr){
    },
    function (err){}
)

const renderer =  new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 3.0);
topLight.position.set(500, 500, 500);
scene.add(topLight);

////////////////////////////////

// Luce frontale
const frontLight = new THREE.DirectionalLight(0xffffff, 2.0);
frontLight.position.set(0, 0, 500);
scene.add(frontLight);

// Luce laterale
const sideLight = new THREE.DirectionalLight(0xffffff, 2.8);
sideLight.position.set(-500, 0, 0);
scene.add(sideLight);

// Luce dal basso
const bottomLight = new THREE.DirectionalLight(0xffffff, 2.5);
bottomLight.position.set(0, -500, 0);
scene.add(bottomLight);

const spotLight = new THREE.SpotLight(0xffffff, 2.0);
spotLight.position.set(0, 500, 0);
spotLight.angle = Math.PI / 4;
scene.add(spotLight);

////////////////////////////////

const reRender3D = () =>{
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);    
    if(mixer){ mixer.update(0.007)}
};

reRender3D();

let arrPositionModel = [
    {
        id: 'home',
        position:getResponsivePosition("home"), //{x:.72, y:.3, z:.5}
        rotation: {x: 0, y:-.3, z:0}
    },
    {
        id:'me',
        position:getResponsivePosition("me"), //{x:1.2, y:.4, z:0}, //
        rotation: {x: 0, y:-.3, z:0}
    },
    {
        id:'techStack',
        position: getResponsivePosition("techStack"), //{x:-.5, y:.65, z:0}
        rotation: {x: .85, y:0, z:0}
    },
    {
        id:'projects',
        position:getResponsivePosition("projects"), //{x:-.75, y:.65, z:0}
        rotation:{x:.5, y:.6, z:0}
    }
]

const modelMove = () =>{
    const sections = document.querySelectorAll("section");
    let currentSection;
    sections.forEach((section) =>{

        const rect = section.getBoundingClientRect();
        if(rect.top <= window.innerHeight / 3){
            currentSection = section.id;
        }

    });

    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    )

    if(position_active >=0){
        let new_coordinates = arrPositionModel[position_active];

        gsap.to(drone.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });

        gsap.to(drone.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
            
        });
    }
}

window.addEventListener("scroll", () => {

    if(drone){
        modelMove();
    }

})


//This function will be optimizated
//But it works.
function getResponsivePosition(section) {
    const width = window.innerWidth;
    
    if(section === "home"){

        if (width < 768) { // Mobile
            return {x: 0, y: .55, z: 0.5};
        } else if (width < 1024) { // Tablet
            return {x: 0.5, y: 0.3, z: 0.5};
        } else { // Desktop
            return {x:.72, y:.3, z:.5};
        }

    }else if(section === "me"){

        if (width < 768) { // Mobile
            return {x: 0.4, y: 0.3, z: 0.5};
        } else if (width < 1024) { // Tablet
            return {x: 0.5, y: 0.3, z: 0.5};
        } else { // Desktop
            return {x:1.2, y:.4, z:0};
        }

    }else if(section === "techStack"){

        if (width < 768) { // Mobile
            return {x: 0.4, y: 0.3, z: 0.5};
        } else if (width < 1024) { // Tablet
            return {x: 0.5, y: 0.3, z: 0.5};
        } else { // Desktop
            return {x:-.5, y:.65, z:0};
        }

    }else if(section === "projects"){
        
        if (width < 768) { // Mobile
            return {x: 0, y: .7, z: 0.5};
        } else if (width < 1024) { // Tablet
            return {x: 0.5, y: 0.3, z: 0.5};
        } else { // Desktop
            return {x:-.75, y:.65, z:0};
        }

    }

}


window.addEventListener('resize', () =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})