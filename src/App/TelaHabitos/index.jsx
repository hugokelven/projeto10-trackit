import { useState, useEffect } from "react"
import { useContext } from "react";
import axios from "axios";
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";
import Menu from "../Menu";
import Topo from "../Topo";
import Dia from "./Dia";
import Habito from "./Habito";

export default function TelaHabitos() {

    const { usuario } = useContext(UserContext)

    const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"]

    const [habito, setHabito] = useState("")
    const [meusHabitos, setMeusHabitos] = useState([])
    const [exibirCriacao, setExibirCriacao] = useState("escondido")
    const [diasSelecionados, setDiasSelecionados] = useState([])

    // Exibir habitos do usuario
    useEffect(() => {
        if (usuario !== null) {

            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.token}`
                }
            }
    
            const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
    
            promessa.then(resposta => {
                console.log(resposta.data)
                setMeusHabitos(resposta.data)
            })
    
            promessa.catch(erro => {alert(`Erro ${erro.response.status}. Tente novamente.`)})
        }
    }, [usuario])

    function obterDiaSelecionado(id) {
        setDiasSelecionados([...diasSelecionados, id])
    }

    function removerDiaDesmarcado(id) {
        setDiasSelecionados(
            diasSelecionados.filter(el => {
                if (el !== id) return true
            })
        )
    }

    function cadastrarHabito(e) {
        e.preventDefault()

        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {name: habito, days: diasSelecionados}, config)

        promessa.then(resposta => {
            console.log(resposta.data)
        })

        promessa.catch(erro => {alert(`Erro ${erro.response.status}. Tente novamente.`)})
    }

    return (
        <Container>
            <Topo/>

            <Titulo>
                <h1>Meus hábitos</h1>
                <button onClick={() => {setExibirCriacao("")}}>+</button>
            </Titulo>

            <form className={exibirCriacao} onSubmit={cadastrarHabito}>
                <input
                    type="text"
                    placeholder='nome do habito'
                    value={habito}
                    onChange={e => {setHabito(e.target.value)}}
                />

                <div className="Dias-semana">
                    {diasDaSemana.map((dia, i) =>
                        <Dia
                            key={i}
                            id={i}
                            dia={dia}
                            obterDiaSelecionado={obterDiaSelecionado}
                            removerDiaDesmarcado={removerDiaDesmarcado}
                        />)}
                </div>

                <div className="Botoes">
                    <button type="button" onClick={() => {setExibirCriacao("escondido")}}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>

            <ul>
                {meusHabitos?.map(meuHabito => 
                    <Habito
                        key={meuHabito.id}
                        meuHabito={meuHabito}
                        diasDaSemana={diasDaSemana}
                    />
                )}
            </ul>

            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>

            <Menu/>
        </Container>
    )
}

const Titulo = styled.div`
    margin: 28px 18px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;

        font-style: normal;
        font-weight: 400;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;

        border: none;
        border-radius: 4.6px;
        
        background: #52B6FF;
    }
`

const Container = styled.div`
    height: 100vh;

    background: #F2F2F2;

    ul {
        margin: 0 18px;
    }

    p {
        margin: 0 18px;

        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
    }


    form {
        width: calc(100% - (2 * 18px));
        min-height: 180px;

        margin: 0 18px 20px 18px;
        padding: 18px 18px 15px 18px;

        border-radius: 5px;
        
        background: #FFFFFF;
    }
    form input {
        width: 303px;
        height: 45px;

        margin-bottom: 10px;

        border: 1px solid #D5D5D5;
        border-radius: 5px;
        
        background: #FFFFFF;
    }

    .Dias-semana {
        width: 303px;
        
        margin: 0;
        padding: 0;

        display: flex;
        justify-content: start;
    }

    .Botoes {
        margin: 29px 0 0 0;

        display: flex;
        justify-content: end;
    }
    .Botoes button {
        width: 84px;
        height: 35px;

        margin-left: 23px;

        font-style: normal;
        font-weight: 400;
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;

        border: none;
        border-radius: 4.6px;
        
        background: #52B6FF;
    }
    .Botoes button:first-child {
        color: #52B6FF;

        background: #FFFFFF;
    }
`