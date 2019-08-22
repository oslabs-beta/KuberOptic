import React, { useRef, useEffect} from 'react';
import visualizer from './components/visualizer'

declare namespace JSX {
  interface IntrinsicElements {
      app: any
  }
}

const app = () => {
  return (
      <div className="my-app">
          <visualizer data={[1,2,3]} />
      </div>
  )
}

export default app;

