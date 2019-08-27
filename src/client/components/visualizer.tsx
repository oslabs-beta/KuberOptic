import * as THREE from 'three'
import React, { useEffect, useRef}from 'react'
import * as d3 from 'd3';
import { render } from 'react-dom';
import { zoom } from 'd3';


const Visualizer = () => {

    useEffect(() => {
      const width = 960;
      const height = 500;
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( width, height );
      ref.current.appendChild(renderer.domElement);
      let camera = new THREE.PerspectiveCamera( 45, width / height, 1, 300 );
      camera.position.set(0, 0, 125);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      renderer.setSize( width, height );
      const generatedPoints = d3.range(2000).map(phyllotaxis(2))
      const pointsGeometry = new THREE.Geometry()
      for (const point of generatedPoints) {
        const vertex = new THREE.Vector3(point[0], point[1], 0)
        pointsGeometry.vertices.push(vertex);
      }
      const pointsMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 6,
        sizeAttenuation: false  });
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      const pointsContainer = new THREE.Object3D();
      pointsContainer.add(points);
      scene.add(pointsContainer);
      // zoom functionality
      const zoom = d3.zoom()
        .scaleExtent([10, 300])
        .on('zoom', () => {
          const event = d3.event;
          if (event.sourceEvent) {
            // this gets the z from d3
            const newZ = event.transform.k;
            if (newZ !== camera.position.z) {
              const { clientX, clientY } = event.sourceEvent;
              // this will project a vector from the mouse poision and zoom level
              const vector = new THREE.Vector3(clientX / width * 2 - 1, - (clientY / height) * 2 + 1, 1);
              vector.unproject(camera);
              const dir = vector.sub(camera.position).normalize();
              const distance = (newZ - camera.position.z) / dir.z;
              const pos = camera.position.clone().add(dir.multiplyScalar(distance));
              // Set the camera to new coordinates
              camera.position.set(pos.x, pos.y, newZ);
            } else {
              // Handle panning
              const { movementX, movementY } = event.sourceEvent;
              // Adjust mouse movement by current scale and set camera
              const currentScale = getCurrentScale();
              camera.position.set(camera.position.x - movementX / currentScale, camera.position.y +
                movementY / currentScale, camera.position.z);
            }
          }
        });

        const view = d3.select(renderer.domElement);
        view.call(zoom);
        view.on('dblclick.zoom', null)
        zoom.scaleTo(view, 125);

      const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      function getCurrentScale() {
        var vFOV = camera.fov * Math.PI / 180
        var scaleHeight = 2 * Math.tan( vFOV / 2 ) * camera.position.z
        var currentScale = height / scaleHeight;
        return currentScale
      }
      
      // Point generator function
      function phyllotaxis(radius) {
        const theta = Math.PI * (3 - Math.sqrt(5));
        return function(i) {
          const r = radius * Math.sqrt(i), a = theta * i;
          return [
            width / 2 + r * Math.cos(a) - width / 2,
            height / 2 + r * Math.sin(a) - height / 2
          ];
        };
      }
  })

  const ref = useRef<HTMLDivElement>(null)
  return (
      <div ref={ref}>
      </div>
    );
};

export default Visualizer;