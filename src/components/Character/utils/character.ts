import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Helper to create the TB logo texture
const createMonitorTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 512, 512);

    // Subtle Digital Grid
    ctx.strokeStyle = "rgba(0, 251, 251, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(512, i);
      ctx.stroke();
    }

    // Glow Effect
    ctx.shadowColor = "#00fbfb";
    ctx.shadowBlur = 30;

    // TB Text
    ctx.fillStyle = "#061414ff";
    ctx.font = "bold 220px 'Inter', 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TB", 256, 256);

    // Scanline effect
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(213, 41, 41, 0.2)";
    for (let i = 0; i < 512; i += 4) {
      ctx.fillRect(0, i, 512, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Change clothing colors to match site theme
                if (mesh.material) {
                  if (mesh.name === "BODY.SHIRT") { // The shirt mesh
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#d03aff"); // Deep Onyx for a stealth look
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000000");
                    mesh.material = newMat;
                  } else if (mesh.name.toLowerCase().includes("cap") || mesh.name.toLowerCase().includes("hat")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#00fbfb"); // Electric Cyan to match theme
                    mesh.material = newMat;
                  }
                }

                // Apply TB Logo to Monitor
                if (mesh.material && (mesh.material as any).name === "Material.018") {
                  const logoTexture = createMonitorTexture();
                  const monitorMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  monitorMat.map = logoTexture;
                  monitorMat.emissiveMap = logoTexture;
                  monitorMat.emissive = new THREE.Color("#00fbfb");
                  monitorMat.emissiveIntensity = 2;
                  mesh.material = monitorMat;
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
