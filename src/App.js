
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RouterCommercial from "./Pages/Commercial/RouterCommercial";
import RouterSousAdv from "./Pages/SousAdv/RouterSousAdv";
import AuthRouter from "./Pages/Auth/AuthRouter";
import AuthGuardCommercial from "./_guard/AuthGuardCommercial";
import Login from "./Pages/Auth/Login";
import AuthGuardSousAdv from "./_guard/AuthGuardSousAdv";
import RouterAdv from "./Pages/Adv/RouterAdv";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

            <Route path="/*" element={<Login/>}/>

            <Route path="/commercial/*" element={
              <AuthGuardCommercial>
                  <RouterCommercial/>
              </AuthGuardCommercial>
            }/>
            
            <Route path="/sousadv/*" element={
              <AuthGuardSousAdv>
                <RouterSousAdv/>
              </AuthGuardSousAdv>
            
            }/>

            <Route path="/adv/*" element={
              <RouterAdv/>
            }/>

            <Route path='/auth/*' element={<AuthRouter/> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;