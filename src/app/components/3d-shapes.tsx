"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

type TorusData = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  spawnPosition: THREE.Vector3;
};

export default function ThreeDShapes() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const MIN_DISTANCE = 6; // Distance to trigger repulsion
  const REPULSION_STRENGTH = 0.5; // How strongly they repel away from cursor
  const RESTORING_STRENGTH = 0.003; // How strongly they go back to spawn point
  const FRICTION = 0.8; // How quickly they slow down
  const MIN_VELOCITY = 0.005; // The minimum speed they maintain

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const toruses: TorusData[] = [];
    const numToruses = 8;

    const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);

    for (let i = 0; i < numToruses; i++) {
      const colors = [
        { color: 0x28282B, weight: 0.4 },
        { color: 0xC0C0C0, weight: 0.25 },
        { color: 0xb0c4de, weight: 0.35 },
      ];

      const pickColor = () => {
        const totalWeight = colors.reduce((sum, c) => sum + c.weight, 0);
        const random = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        for (const c of colors) {
          cumulativeWeight += c.weight;
          if (random < cumulativeWeight) {
            return c.color;
          }
        }
      };

      const isCuboid = Math.random() < 0.4; // 40% chance for cuboids

      let geometry, material;

      if (isCuboid) {
        const length = 2.8;
        const side = 0.7;
        geometry = new THREE.BoxGeometry(length, side, side);
      } else {
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      }

      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(pickColor()),
      });

      const shape = new THREE.Mesh(geometry, material);

      const spawnPosition = new THREE.Vector3(
        Math.random() * 8 - 4, // X between -4 and 4
        Math.random() * 6 - 3, // Y between -3 and 3
        Math.random() * 4 - 2, // Z between -2 and 2
      );
      shape.position.copy(spawnPosition);

      shape.castShadow = true;
      scene.add(shape);

      toruses.push({
        mesh: shape,
        velocity: new THREE.Vector3(0, 0, 0), // Initial velocity
        spawnPosition,
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const boundaryX = 4;
      const boundaryY = 3;
      const spawnProximity = 0.5;

      toruses.forEach((torusData) => {
        const { mesh, velocity, spawnPosition } = torusData;

        const mouseVector = new THREE.Vector3(
          mouse.current.x * 4,
          mouse.current.y * 4,
          0,
        );
        const torusVector = new THREE.Vector3(
          mesh.position.x,
          mesh.position.y,
          mesh.position.z,
        );
        const distance = mouseVector.distanceTo(torusVector);

        // Apply repelling force if within MIN_DISTANCE
        if (distance < MIN_DISTANCE) {
          const direction = new THREE.Vector3()
            .subVectors(torusVector, mouseVector)
            .normalize()
            .multiplyScalar((MIN_DISTANCE - distance) * REPULSION_STRENGTH);

          velocity.add(direction);
        }

        // Apply restoring force if outside spawnProximity
        const spawnDistance = mesh.position.distanceTo(spawnPosition);
        if (spawnDistance > spawnProximity) {
          const restoringForce = new THREE.Vector3()
            .subVectors(spawnPosition, mesh.position)
            .normalize()
            .multiplyScalar(RESTORING_STRENGTH);

          velocity.add(restoringForce);
        }

        // Update position based on velocity
        mesh.position.add(velocity);

        // Apply friction
        velocity.multiplyScalar(FRICTION);

        // Maintain a minimum velocity (otherwise they stop too abruptly)
        if (velocity.length() < MIN_VELOCITY) {
          velocity.setLength(MIN_VELOCITY);
        }

        // Bounce when hitting screen boundaries
        if (mesh.position.x > boundaryX || mesh.position.x < -boundaryX) {
          velocity.x *= -1;
          mesh.position.x = Math.max(
            Math.min(mesh.position.x, boundaryX),
            -boundaryX,
          );
        }
        if (mesh.position.y > boundaryY || mesh.position.y < -boundaryY) {
          velocity.y *= -1;
          mesh.position.y = Math.max(
            Math.min(mesh.position.y, boundaryY),
            -boundaryY,
          );
        }

        // shape rotation
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Add Event Listener
    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute top-0 left-0 w-full h-full"></div>
  );
}
