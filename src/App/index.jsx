import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"

import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaLogin from "./TelaLogin";

import UserContext from "../contexts/UsuarioContext";

export default function App() {

    const [usuario, setUsuario] = useState(null)

    return (

        <UserContext.Provider value={{usuario, setUsuario}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin setUsuario={setUsuario}/>} />
                    <Route path="/cadastro" element={<TelaCadastro/>} />
                    <Route path="/habitos" element={<TelaHabitos/>} />
                    <Route path="/hoje" element={<TelaHoje/>} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    )
}