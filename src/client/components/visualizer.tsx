import * as React from 'react';
import {useRef, useEffect} from 'react';
import * as THREE from 'three';


const Visualizer = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        const geometry = new THREE.BoxGeometry( 2, 2, 2 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 4;
        const animate = function () {
            requestAnimationFrame( animate );
            cube.rotation.x += 0.07;
            cube.rotation.y += 0.03;
            renderer.render( scene, camera );
          };
        animate();
    });
    return (
        <div>
            <h1>Hello World! </h1>
        </div>
      );
};

export default Visualizer;