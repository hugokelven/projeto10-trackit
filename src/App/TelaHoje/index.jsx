import { useState, useEffect } from "react"
import { useContext } from "react";
import axios from "axios";
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";
import Menu from '../Menu';
import Topo from "../Topo";
import HabitoDeHoje from "./HabitoDeHoje";

export default function TelaHoje() {

    const { usuario, progresso, setProgresso } = useContext(UserContext)

    const [habitosDoDia, setHabitosDoDia] = useState([])
    const [habitosConcluidos, setHabitosConcluidos] = useState([])
    const [recarregar, setRecarregar] = useState(false)

    // Exibir habitos do dia
    useEffect(() => {
        if (usuario !== null) {

            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.token}`
                }
            }

            const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

            promessa.then(resposta => {
                console.log(resposta.data)
                setHabitosDoDia(resposta.data)

                setHabitosConcluidos(
                    resposta.data.filter(habito => {
                        if (habito.done) {
                            return true
                        }
                    })
                )
            })

            promessa.catch(erro => {alert(`Erro ${erro.response.status}. Tente novamente.`)})
        }
    }, [usuario, recarregar])

    setProgresso((habitosConcluidos.length/habitosDoDia.length) * 100)

    function recarregarHabitos() {
        setRecarregar(!recarregar)
    }

    return (
        <Container>
            <Topo/>

            <DiaAtual>
                <h1>XXXXXX, XX/XX</h1>

                <NenhumConcluido habitosConcluidos={habitosConcluidos}>Nenhum hábito concluído ainda</NenhumConcluido>

                <PorcentagemConclusao habitosConcluidos={habitosConcluidos}>
                    {((habitosConcluidos.length/habitosDoDia.length) * 100).toFixed(0)}% dos hábitos concluídos
                </PorcentagemConclusao>
            </DiaAtual>

            <ul>
                {habitosDoDia?.map(habitoDoDia => 
                    <HabitoDeHoje
                        key={habitoDoDia.id}
                        habitoDoDia={habitoDoDia}
                        recarregarHabitos={recarregarHabitos}
                    />
                )}
            </ul>

            <Menu progresso={progresso}/>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;

    background: #F2F2F2;
`
const DiaAtual = styled.div`
    margin: 28px 0 28px 18px;

    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`

const NenhumConcluido = styled.p`
    display: ${props => props.habitosConcluidos.length > 0 ? "none" : ""};

    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
`

const PorcentagemConclusao = styled.p`
    display: ${props => props.habitosConcluidos.length > 0 ? "" : "none"};

    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8FC549;
`