import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Base Ambient Light for visibility
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // Soft Front Fill
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
  hemiLight.position.set(0, 20, 10);
  scene.add(hemiLight);

  const directionalLight = new THREE.DirectionalLight(0x5eead4, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(1, 2, 5); // Positioned from front-top-right
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath(`${import.meta.env.BASE_URL}models/`)
    .load("char_enviorment.hdr?v=2", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 1.2, // Boosted for better material pop
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.5, // Increased for sharper highlights
      duration: duration,
      ease: ease,
    });
    gsap.to(ambientLight, {
      intensity: 0.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
