import * as THREE from 'three'
import React, { useEffect, useRef}from 'react'
import * as d3 from 'd3';
import * as _ from 'underscore';


const Visualizer = () => {

    useEffect(() => {
      // boilerplate for setting up the camera renderer and scene
      const width = window.innerWidth;
      const vizWidth = width;
      const height = window.innerHeight;
      const fov = 40;
      const near = 10;
      const far = 10000;
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( width, height );
      ref.current.appendChild(renderer.domElement);
      let camera = new THREE.PerspectiveCamera( fov, width / height, near, far );
      // camera.position.set(0, 0, 125);
      // camera.lookAt(new THREE.Vector3(0, 0, 0));
      // camera.aspect = width / height;
      // camera.updateProjectionMatrix();
      renderer.setSize( width, height );
      // here we will define our points and sprites 
      const pointAmmount = 10;
      const circleSprite = new THREE.TextureLoader().load("https://fastforwardlabs.github.io/visualization_assets/circle-sprite.png")
      const colorArray = ["#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#6a3d9a"]
      const randomPosition = (radius?: number) => {
        radius = 2000;
        const ptAngle = Math.random() * 2 * Math.PI;
        const ptRadiusSq = Math.random() * radius * radius;
        const ptX = Math.sqrt(ptRadiusSq) * Math.cos(ptAngle);
        const ptY = Math.sqrt(ptRadiusSq) * Math.sin(ptAngle);
        return [ptX, ptY];
      }
      // const generatedPoints = d3.range(pointAmmount).map(phyllotaxis(2))
      const pointInfo = [];
      for (let i = 0; i < pointAmmount; i++) {
        const position = randomPosition()
        const name = 'Point ' + i;
        const group = Math.floor(Math.random() * 5);
        const point = { position, name, group }; 
        pointInfo.push(point);
      }
      const generatedPoints = pointInfo;
      console.log(generatedPoints);
      const pointsGeometry = new THREE.Geometry();
      const colors = []; 
      for (const point of generatedPoints) {
        const vertex = new THREE.Vector3(point.position[0], point.position[1], 0)
        pointsGeometry.vertices.push(vertex);
        const color = new THREE.Color(colorArray[point.group]);
        colors.push(color);
      }
      pointsGeometry.colors = colors;
      const pointsMaterial = new THREE.PointsMaterial({ size: 100,
        sizeAttenuation: false, vertexColors: THREE.VertexColors, map: circleSprite, transparent: true,});
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      const scene = new THREE.Scene();
      // scene.background = new THREE.Color(0xffffff);
      scene.add(points);
      scene.background = new THREE.Color(0xefefef);

        function toRadians (angle) {
          return angle * (Math.PI / 180);
        }

        const getScaleFromZ = (cameraZPosition) => {
          const halfFov = fov/2;
          const halfFovRadians = toRadians(halfFov);
          const halfFovHeight = Math.tan(halfFovRadians) * cameraZPosition;
          const fovHeight = halfFovHeight * 2;
          const scale = height / fovHeight; // Divide visualization height by height derived from field of view
          return scale;
        }

        function getZFromScale(scale) {
          const halfFov = fov/2;
          const halfFovRadians = toRadians(halfFov);
          let scaleHeight = height / scale;
          let cameraZPosition = scaleHeight / (2 * Math.tan(halfFovRadians));
          return cameraZPosition;
        }

        function zoomHandler(d3_transform) {
          let scale = d3_transform.k;
          let x = -(d3_transform.x - vizWidth/2) / scale;
          let y = (d3_transform.y - height/2) / scale;
          let z = getZFromScale(scale);
          camera.position.set(x, y, z);
        }
        
        let zoom = d3.zoom()
        .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
        .on('zoom', () =>  {
          let d3_transform = d3.event.transform;
          zoomHandler(d3_transform);
        });

          const view = d3.select(renderer.domElement);
          function setUpZoom() {
            view.call(zoom);    
            const initialScale = getScaleFromZ(far);
            const initialTransform = d3.zoomIdentity.translate(vizWidth / 2, height / 2).scale(initialScale);    
            zoom.transform(view, initialTransform);
            camera.position.set(0, 0, far);
          }
          setUpZoom();

      const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // raycasting, toolbar, and collission detection
      // ray casting helper functions start 
      const mouseToThree = (mouseX?: number, mouseY?: number) => {
        return new THREE.Vector3( mouseX / vizWidth * 2 - 1, - (mouseY / height) * 2 + 1, 1)
      }

      function sortIntersectsByDistanceToRay(intersects) {
        return _.sortBy(intersects, "distanceToRay");
      }
      // const pointsContainer = new THREE.Object3D();
      const hoverContainer = new THREE.Object3D();
      const removeHighlights = () => {
        hoverContainer.remove(...hoverContainer.children);
      };

      // Initial tooltip state
      const tooltipState = { 
        display: "none",
        left: "",
        name: "",
        group: "",
        top: "",
      } 
      const toolTip = divRefOne.current;
      const pointTip = divRefTwo.current;
      const groupTip = divRefThree.current;

      const highlightPoint = (datum) => {
        removeHighlights();
        console.log('in highlight point');
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(datum.position[0], datum.position[1], 0));
        geometry.colors = [ new THREE.Color(colorArray[datum.group])];
        const material = new THREE.PointsMaterial({
          size: 26,
          sizeAttenuation: false,
          vertexColors: THREE.VertexColors,
          map: circleSprite,
          transparent: true
        });
        const point = new THREE.Points(geometry, material);
        hoverContainer.add(point);
      };
      

      const updateTooltip = () => {
        toolTip.style.display = tooltipState.display;
        toolTip.style.left = tooltipState.left + 'px';
        toolTip.style.top = tooltipState.top + 'px';
        pointTip.innerText = tooltipState.name;
        pointTip.style.background = colorArray[tooltipState.group];
        groupTip.innerText = `Group ${tooltipState.group}`;
      }

      function showTooltip(mousePosition, datum) {
        console.log('I am in showtooltip')
        const tooltipWidth = 120;
        let xOffset = -tooltipWidth / 2;
        let yOffset = 30;
        tooltipState.display = "block";
        tooltipState.left = mousePosition[0] + xOffset;
        tooltipState.top = mousePosition[1] + yOffset;
        tooltipState.name = datum.name;
        tooltipState.group = datum.group;
        updateTooltip();
      }

      const raycaster = new THREE.Raycaster();
      raycaster.params.Points.threshold = 10;

      const checkCollission = (mousePosition) => {
        const mouseVector = mouseToThree(...mousePosition);
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObject(points);
        // console.log(collisions);
        if (intersects[0]) {
          console.log('I am in the collissions[o]')
          const sortedCollisions = sortIntersectsByDistanceToRay(intersects);
          const collision: any = sortedCollisions[0];
          const index = collision.index
          const datum = generatedPoints[index];
          showTooltip(mousePosition, datum);
          highlightPoint(datum);
        } else {
          removeHighlights();
          hideTooltip();
        }
      }

      // raycasting helper functions end 
      view.on('mousemove', () => {
        const [mouseX, mouseY] = d3.mouse(view.node());
        const mousePosition = [mouseX, mouseY];
        checkCollission(mousePosition);
      })

      // pointsContainer.add(points);
      view.on('mouseleave', () => {
        removeHighlights();
      });

      function hideTooltip() {
        tooltipState.display = 'none';
        updateTooltip();
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
  const divRefOne = useRef<HTMLDivElement>(null)
  const divRefTwo = useRef<HTMLDivElement>(null)
  const divRefThree = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={ref}>
        <div ref={divRefOne} id="tool-tip">
          <div ref={divRefTwo} id="point-tip" />
          <div ref={divRefThree} id="group-tip" />
        </div>
      </div>
    </>
    );
};

export default Visualizer;