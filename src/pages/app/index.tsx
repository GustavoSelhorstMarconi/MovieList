import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../home";
import { Details } from "../details/details";

function App() {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />}/>
                
                <Route path="*" element={<Navigate to={'/home'}/>} />

                <Route path="/details/:id" element={<Details />}/>
            </Routes>
        </>
    )
}

export default App;