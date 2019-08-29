import React, { useState, createContext } from 'react';
import { any } from 'prop-types';
// import { any } from 'prop-types';
// import { checkPropTypes } from 'prop-types';

 
export const StoreContext = createContext(null); 


export const StoreContextProvider = (props: any) => {
    const [Store, setStore] = useState({
      landingPageState: false,
      uploadPageState: false,
      credentials: null
    })



    return (
      <StoreContext.Provider value={[Store, setStore]}>
          {props.children}
      </StoreContext.Provider>
     )
}

export default StoreContext;