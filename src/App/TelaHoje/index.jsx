import { useState, useEffect } from "react"
import { useContext } from "react";
import axios from "axios";
import dayjs from "dayjs"
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";
import "../../../node_modules/dayjs/locale/pt-br"
import Menu from '../Menu';
import Topo from "../Topo";
import HabitoDeHoje from "./HabitoDeHoje";

export default function TelaHoje() {

    const { usuario } = useContext(UserContext)

    const [recarregar, setRecarregar] = useState(false)
    const [habitosDoDia, setHabitosDoDia] = useState(
        {habitos: [], qtd: "", qtdConcluidos: ""}
    )

    // Carregar habitos do dia
    useEffect(() => {
        if (usuario !== null) {

            const config = {
                headers: {
                    Authorization: `Bearer ${usuario.token}`
                }
            }

            const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

            promessa.then(resposta => {
                const qtdHabitos = resposta.data.length

                const qtdHabitosConcluidos = resposta.data.filter(habito => {
                    if (habito.done) {
                        return true
                    }
                }).length

                setHabitosDoDia({...habitosDoDia, habitos: resposta.data, qtd: qtdHabitos, qtdConcluidos: qtdHabitosConcluidos})
            })

            promessa.catch(erro => {alert(`Erro ${erro.response.status}. Tente novamente.`)})
        }
    }, [usuario, recarregar])

    function recarregarHabitos() {
        setRecarregar(!recarregar)
    }

    return (
        <Container>
            <Topo/>

            <DiaAtual>
                <h1>{dayjs().locale("pt-br").format("dddd, DD/MM")}</h1>

                <NenhumConcluido qtdConcluidos={habitosDoDia.qtdConcluidos}>Nenhum hábito concluído ainda</NenhumConcluido>

                <PorcentagemConclusao qtdConcluidos={habitosDoDia.qtdConcluidos}>
                    {((habitosDoDia.qtdConcluidos/habitosDoDia.qtd) * 100).toFixed(0)}% dos hábitos concluídos
                </PorcentagemConclusao>
            </DiaAtual>

            <ul>
                {habitosDoDia.habitos?.map(habitoDoDia => 
                    <HabitoDeHoje
                        key={habitoDoDia.id}
                        habitoDoDia={habitoDoDia}
                        recarregarHabitos={recarregarHabitos}
                    />
                )}
            </ul>

            <Menu recarregar={recarregar}/>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;

    background: #F2F2F2;

    ul {
        padding-bottom: 120px;
    }
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
    display: ${props => props.qtdConcluidos > 0 ? "none" : ""};

    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #BABABA;
`

const PorcentagemConclusao = styled.p`
    display: ${props => props.qtdConcluidos > 0 ? "" : "none"};

    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8FC549;
`