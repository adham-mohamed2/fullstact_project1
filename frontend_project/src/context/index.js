import React, { useState } from 'react'
import { createContext } from 'react'
export const  GlobalContext = createContext(null);
function GlobalStore({children}) {
    const [user , setUser] = useState({});
  return (
    <GlobalContext.Provider value={{user , setUser}}>
         {children}
    </GlobalContext.Provider>
   
  )
}

export default GlobalStore