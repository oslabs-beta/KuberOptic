// /**
//  * ************************************
//  *
//  * @module  LandingPage.tsx
//  * @author
//  * @date
//  * @description start page of app, allows to choose between GCP or AWS as a source of clusters to visualize
//  *
//  * ************************************
//  */

// import React, { useState, useEffect, useContext } from 'react';
// import UploadPage from './UploadPage';
// import UploadPage2 from './UploadPage2';
// import { StoreContext } from '../../../store';

// const LandingPage = () => {
//   const [Store, setStore] = useContext(StoreContext);

//   // function to get to the Google Cloud Platform upload page
//   const myFunctionG = () => {
//     console.log(Store.landingPageState);
//     setStore({...Store, landingPageState: true});
//   }

//   // function to get to the Amazon Web Services upload page
//   const myFunctionA = () => {
//     console.log(Store.landingPageState2);
//     setStore({...Store, landingPageState2: true});
//   }
//     return (
//       <div id="displays">
//         <div className='mainDiv'>
//           <img className='kubLogo' src={'https://i.gifer.com/4P4X.gif'}/>
//           <div className="landingTitle">
//             <h1 className='title'>KuberOptic</h1>
//             <h3 className='text'>The Kubernetes Visualizer</h3>
//           </div>
//           <div className= "awsAndGcpLogos">
//             <img className='logo' src={require('../assets/credsPage/aws.png')} onClick={myFunctionA}/>
//             <img className='logo2' src={require("../assets/credsPage/google.png")} onClick={myFunctionG}/>
//           </div>
//       </div>
//     </div>
//   )
// }


// export default LandingPage;
