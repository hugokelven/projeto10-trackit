import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"

import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaLogin from "./TelaLogin";
import TelaHistorico from "./TelaHistorico";

import UserContext from "../contexts/UsuarioContext";

export default function App() {

    const [usuario, setUsuario] = useState(null)
    const [progresso, setProgresso] = useState(0)

    useEffect(() => {
        setUsuario(JSON.parse(window.localStorage.getItem('usuario')))
    }, [])

    return (

        <UserContext.Provider value={{usuario, setUsuario, progresso, setProgresso}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin setUsuario={setUsuario}/>} />
                    <Route path="/cadastro" element={<TelaCadastro/>} />
                    <Route path="/habitos" element={<TelaHabitos/>} />
                    <Route path="/hoje" element={<TelaHoje/>} />
                    <Route path="/historico" element={<TelaHistorico/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    )
}