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

  const pointer = useRef(new THREE.Vector2());

  const MIN_DISTANCE = 4; // Distance from spawn to begin restoring
  const REPULSION_STRENGTH = 0.25; // How strongly they repel when mouse intersects
  const RESTORING_STRENGTH = 0.001; // How strongly they go back to spawn point
  const FRICTION = 0.9; // How quickly they slow down
  const MIN_VELOCITY = 0.001; // The minimum speed they maintain

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

    const raycaster = new THREE.Raycaster();

    const toruses: TorusData[] = [];
    const numToruses = 8;

    for (let i = 0; i < numToruses; i++) {
      const colors = [
        { color: 0x28282b, weight: 0.4 },
        { color: 0xc0c0c0, weight: 0.25 },
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
        return 0x28282b;
      };

      // 40% chance for a cuboid, else a torus
      const isCuboid = Math.random() < 0.4;
      let geometry: THREE.BufferGeometry;
      if (isCuboid) {
        geometry = new THREE.BoxGeometry(3.5, 0.9, 0.9);
      } else {
        geometry = new THREE.TorusGeometry(1.5, 0.6, 16, 100);
      }

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(pickColor()),
        metalness: 0.8,
        roughness: 0.2,
      });

      const shape = new THREE.Mesh(geometry, material);

      const spawnPosition = new THREE.Vector3(
        Math.random() * 8 - 4,
        Math.random() * 6 - 3,
        Math.random() * 4 - 2,
      );
      shape.position.copy(spawnPosition);

      shape.castShadow = true;
      scene.add(shape);

      toruses.push({
        mesh: shape,
        velocity: new THREE.Vector3(0, 0, 0),
        spawnPosition,
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(0, 0, 8);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffff00, 0.8);
    directionalLight.position.set(6, 10, 6);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const height = 14;
    const radius = 6;
    const radialSegments = 32;

    const coneGeometry = new THREE.ConeGeometry(radius, height, radialSegments);
    coneGeometry.translate(0, height / 2, 0);

    const coneMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });

    const sunRayCone = new THREE.Mesh(coneGeometry, coneMaterial);
    sunRayCone.position.set(6, 10, 6);
    sunRayCone.lookAt(0, 0, 0);
    scene.add(sunRayCone);

    const handleMouseMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const getScreenBounds = () => {
      const vFOV = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      return {
        halfWidth: visibleWidth / 2,
        halfHeight: visibleHeight / 2,
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(pointer.current, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      const intersectedObjects = new Set<THREE.Object3D>();
      intersects.forEach((hit) => {
        intersectedObjects.add(hit.object);
      });

      const { halfWidth, halfHeight } = getScreenBounds();

      toruses.forEach((torusData) => {
        const { mesh, velocity, spawnPosition } = torusData;

        if (intersectedObjects.has(mesh)) {
          const pushDirection = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            0,
          ).normalize();

          velocity.addScaledVector(pushDirection, REPULSION_STRENGTH);
        }

        const spawnDistance = mesh.position.distanceTo(spawnPosition);
        if (spawnDistance > MIN_DISTANCE) {
          const restoringForce = new THREE.Vector3()
            .subVectors(spawnPosition, mesh.position)
            .normalize()
            .multiplyScalar(RESTORING_STRENGTH);

          velocity.add(restoringForce);
        }

        mesh.position.add(velocity);

        velocity.multiplyScalar(FRICTION);

        if (velocity.length() < MIN_VELOCITY) {
          velocity.setLength(MIN_VELOCITY);
        }

        if (mesh.position.x > halfWidth || mesh.position.x < -halfWidth) {
          velocity.x *= -1;
          mesh.position.x = Math.max(
            Math.min(mesh.position.x, halfWidth),
            -halfWidth,
          );
        }
        if (mesh.position.y > halfHeight || mesh.position.y < -halfHeight) {
          velocity.y *= -1;
          mesh.position.y = Math.max(
            Math.min(mesh.position.y, halfHeight),
            -halfHeight,
          );
        }

        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

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
