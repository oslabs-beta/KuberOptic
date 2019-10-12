import * as THREE from 'three'
import React, { useEffect, useRef, useContext }from 'react'
import * as d3 from 'd3';
import * as _ from 'underscore';
import SideBar from './sidebar';
import {StoreContext} from '../../../store';

const width = window.innerWidth;
const height = window.innerHeight;
const vizWidth = width;
const fov = 100;
const near = 920;
const far = 3000;


// -----------fakeStore----------- if needed to test


// const store = [
//   {
//     endpoint: '35.225.31.212',
//     clusterName: 'standard-cluster-1',
//     clusterDescription: '',
//     creationTime: '2019-08-27T23:21:01+00:00',
//     clusterStatus: 'RUNNING',
//     nodeCount: 7,
//     location: 'us-central1-a',
//     NodePool_0: [ 'default-pool', 'diskSize[Gb]: 100', 'MachineType: g1-small' ],
//     NodePool_1: [ 'pool-1', 'diskSize[Gb]: 100', 'MachineType: f1-micro' ],
//     NodePool_2: [ 'pool-2', 'diskSize[Gb]: 100', 'MachineType: f1-micro' ]
//   },
//   {
//     endpoint: '34.70.204.169',
//     clusterName: 'weakclust',
//     clusterDescription: '',
//     creationTime: '2019-09-11T03:02:01+00:00',
//     clusterStatus: 'RUNNING',
//     nodeCount: 1,
//     location: 'us-central1-a',
//     NodePool_0: [ 'pool-1', 'diskSize[Gb]: 30', 'MachineType: g1-small' ]
//   }
// ]


const Visualizer = () => {

 let [store, setStore] = useContext(StoreContext);
  
  useEffect(() => {
    if(store.clusters){
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( width, height );
      ref.current.appendChild(renderer.domElement);
      let camera = new THREE.PerspectiveCamera( fov, width / height, near, far );
      //---------------number of hexagons---------------\\
      const pointAmmount = store.clusters.length;

      // https://upload.wikimedia.org/wikipedia/commons/e/e6/Basic_hexagon.svg
      // https://fastforwardlabs.github.io/visualization_assets/circle-sprite.png
      const circleSprite = new THREE.TextureLoader().load(".././src/client/assets/visualizerPage/Basic_hexagon.svg")
      const testSprite = new THREE.TextureLoader().load('https://fastforwardlabs.github.io/visualization_assets/circle-sprite.png')
      const colorArray = ['skyblue', 'blue', 'lightblue', 'skyblue', 'blue', 'lightblue', ]
      const colorArray2 = ['red']
      /* Testing to make random elements appear  */
      
      const randomPosition = (offset:number, radius?: number ) => {
        const ptAngle = Math.random() * 2 * Math.PI;
        const ptRadiusSq = Math.random() * radius * radius;
        const ptX = Math.sqrt(ptRadiusSq) * Math.cos(ptAngle);
        const ptY = Math.sqrt(ptRadiusSq) * Math.sin(ptAngle);
        return [ptX + offset, ptY];
      }

      const pointInfo = [];
      const pointInfo2 = [];

      //generating shapes for cluster!
      for (let i = 0; i < pointAmmount; i++) {
        const position = [2400*i -2400,1]
        const group = i;
        const name = store.clusters[i].clusterName;
        const clusterStatus = store.clusters[i].clusterStatus;
        const creationTime = store.clusters[i].creationTime;
        const location = store.clusters[i].location;
        const nodeCount = store.clusters[i].nodeCount;
        const endpoint = store.clusters[i].endpoint
        const point = { position, name, clusterStatus, creationTime, location, nodeCount, endpoint, group };
        pointInfo.push(point);
      }
      

      //for each cluster we must put nodes inside
      //omfg it works
      store.clusters.forEach(((cluster,i)=>{
        for(let j = 0; j < cluster.nodeCount; j++){
        const name2 = `Point` + j;
        const position = randomPosition(pointInfo[i].position[0], 300);
        const group = 0;
        const point2 = {position, name2, group}
        pointInfo2.push(point2)
        }
      }))

      const generatedPoints = pointInfo;
      const generatedPoints2 = pointInfo2;
      const pointsGeometry = new THREE.Geometry();
      const pointsGeometry2 = new THREE.Geometry();
      const colors = [];
      const colors2 = [];
      
      for (const point of generatedPoints) {
        const vertex = new THREE.Vector3(point.position[0], point.position[1])
        pointsGeometry.vertices.push(vertex);
        const color = new THREE.Color(colorArray[point.group]);
        colors.push(color);
      }
     for (const point2 of generatedPoints2) {
        const vertex = new THREE.Vector3(point2.position[0], point2.position[1])
        pointsGeometry2.vertices.push(vertex);
        const color = new THREE.Color(colorArray2[point2.group]);
        colors2.push(color);
      }
      pointsGeometry.colors = colors;
      pointsGeometry2.colors = colors2;
      //sizeAttenuation:true makes shakes bigger when zoom
     
      const pointsMaterial = new THREE.PointsMaterial({ size: 800, sizeAttenuation: true,
        vertexColors: THREE.VertexColors, map: circleSprite, transparent: true,});
      const pointsMaterial2 = new THREE.PointsMaterial({ size: 100, sizeAttenuation: true,
        vertexColors: THREE.VertexColors, map: testSprite, transparent: true,});
        //this where the shape is created
     
        const points = new THREE.Points(pointsGeometry, pointsMaterial);
      const points2 = new THREE.Points(pointsGeometry2, pointsMaterial2);
      const scene = new THREE.Scene();
     
      scene.add(points);
      scene.add(points2)
      scene.background = new THREE.Color('black');

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
          let x = -(d3_transform.x - vizWidth / 2) / scale;
          let y = (d3_transform.y - height / 2) / scale;
          let z = getZFromScale(scale);
          camera.position.set(x, y, z);
        }

        let zoom = d3.zoom()
        .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
        .on('zoom', () =>  {
          let d3_transform = d3.event.transform;
          zoomHandler(d3_transform);
        });
          //d3 White space in the browser
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

      const mouseToThree = (mouseX?: number, mouseY?: number) => {
        return new THREE.Vector3( mouseX / vizWidth * 2 - 1, - (mouseY / height) * 2 + 1, 1)
      }

      function sortIntersectsByDistanceToRay(intersects) {
        return _.sortBy(intersects, "distanceToRay");
      }
      
      const hoverContainer = new THREE.Object3D();
      const removeHighlights = () => {
        hoverContainer.remove(...hoverContainer.children);
      };

      const tooltipState: {[k: string]: any} = {
        display: "none",
      }
      const grouptipState:{[k: string]: any} = {
        display: "none",
      }
      const toolTip = divRefOne.current;
      const pointTip = divRefTwo.current;
      const groupTip = divRefThree.current;

      //---------highlight functionality--------//
      const highlightPoint = (datum) => {
        removeHighlights();
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(datum.position[0], datum.position[1], 0));
        geometry.colors = [ new THREE.Color(colorArray[datum.group])];
        const material = new THREE.PointsMaterial({
          size: 500,
          sizeAttenuation: false,
          vertexColors: THREE.VertexColors,
          map: circleSprite,
          transparent: false
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
        pStatus.current.textContent = tooltipState.clusterStatus //+ tooltipState.creationTime + tooltipState.location + tooltipState.nodeCount;
        pTime.current.textContent = tooltipState.creationTime;
        pLocation.current.textContent = tooltipState.location;
        pNode.current.textContent = tooltipState.nodeCount;
        pendpoint.current.textContent = tooltipState.endpoint;
      }
      const updateTooltip2 = () => {
        groupTip.style.display = grouptipState.display;
        groupTip.style.left = grouptipState.left + 'px';
        groupTip.style.top = grouptipState.top + 'px';
        pointTip.innerText = grouptipState.name;
        pointTip.style.background = colorArray[grouptipState.group];
        pStatus.current.textContent = grouptipState.clusterStatus //+ grouptipState.creationTime + grouptipState.location + grouptipState.nodeCount;
        pTime.current.textContent = grouptipState.creationTime;
        pLocation.current.textContent = grouptipState.location;
        pNode.current.textContent = grouptipState.nodeCount;
      }
      function showTooltip(mousePosition, datum) {
        const tooltipWidth = 120;
        let xOffset = -tooltipWidth / 2;
        let yOffset = 30;
        tooltipState.display = "block";
        tooltipState.left = mousePosition[0] + xOffset;
        tooltipState.top = mousePosition[1] + yOffset;
        tooltipState.name = datum.name;
        tooltipState.group = datum.group;
        tooltipState.clusterStatus = datum.clusterStatus;
        tooltipState.creationTime = datum.creationTime;
        tooltipState.location = datum.location;
        tooltipState.nodeCount = datum.nodeCount;
        tooltipState.endpoint = datum.endpoint
        updateTooltip();
      }
      function showTooltip2(mousePosition, datum) {
        grouptipState.display = "block";
        grouptipState.left = 0;
        grouptipState.top = 400;
        grouptipState.name = datum.name;
        grouptipState.group = datum.group;
        grouptipState.clusterStatus = datum.clusterStatus;
        grouptipState.clusterStatus = datum.clusterStatus;
        grouptipState.creationTime = datum.creationTime;
        grouptipState.location = datum.location;
        grouptipState.nodeCount = datum.nodeCount;
        updateTooltip2();
      }

      //ray caster makes sure when we hover over shape we get it on dom element
      const raycaster = new THREE.Raycaster();
      //this threshhold is what makes you hover over more than the centre
      raycaster.params.Points.threshold = 300;

      const checkCollission = (mousePosition) => {
        const mouseVector = mouseToThree(...mousePosition);
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObject(points);
        if (intersects[0]) {
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
    }
  })

  const ref = useRef<HTMLDivElement>(null)
  const divRefOne = useRef<HTMLDivElement>(null)
  const divRefTwo = useRef<HTMLDivElement>(null)
  const divRefThree = useRef<HTMLDivElement>(null)

  const pStatus = useRef<HTMLSpanElement>(null)
  const pTime = useRef<HTMLSpanElement>(null)
  const pLocation = useRef<HTMLSpanElement>(null)
  const pNode = useRef<HTMLSpanElement>(null)
  const pendpoint = useRef<HTMLSpanElement>(null)

  return (
    <>
    <SideBar/>
      <div ref={ref} id="leCanvas">
        <div ref={divRefOne} id="tool-tip">
          <div ref={divRefTwo} id="point-tip" />
          <div> status: <span ref={pStatus}/> 
          </div>
          <div>
            Time Created: <span ref={pTime}/>
          </div>
          <div>
            Cluster Location: <span ref={pLocation}/>
          </div>
          <div>
            nodeCount:<span ref={pNode}/>
          </div>
          <div>
            Endpoint: <span ref={pendpoint}/>
          </div>
        </div>
      </div>
    </>
    );
};

export default Visualizer;
