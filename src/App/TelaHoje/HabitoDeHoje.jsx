import { useState } from "react"
import { useContext } from "react";
import axios from "axios";
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";
import Check from "../../assets/check.svg"

export default function HabitoDeHoje({habitoDoDia}) {

    const { usuario } = useContext(UserContext)

    const {id, name, done, currentSequence, highestSequence} = habitoDoDia

    const [concluido, setConcluido] = useState(done)

    function marcarComoConcluido() {
        if (concluido === false) {
            setConcluido(true)
            realizarPostParaServidor("check")
        } else {
            setConcluido(false)
            realizarPostParaServidor("uncheck")
        }
    }

    function realizarPostParaServidor(acao) {

        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promessa = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${acao}`, {}, config)

        promessa.then(resposta => console.log(resposta.data))

        promessa.catch(erro => {alert(`Erro ${erro.response.status}. Tente novamente.`)})
    }

    return (
        <Container>
            <Info>
                <h2>{name}</h2>

                <span>
                    <p>Sequência atual:</p>
                    <SeqAtual concluido={concluido}>{currentSequence} dias</SeqAtual>
                </span>
                <span>
                    <p>Seu recorde:</p>
                    <Recorde
                        currentSequence={currentSequence}
                        highestSequence={highestSequence}
                    >{highestSequence} dias</Recorde>
                </span>
            </Info>

            <Marcador className='centralizar-conteudo' concluido={concluido}>
                <img src={Check} alt="Check" onClick={marcarComoConcluido}/>
            </Marcador>
        </Container>
    )
}

const Container = styled.div`
    width: 340px;
    min-height: 94px;

    margin: 0 18px 10px 18px;
    padding: 12px 12px 12px 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 5px;
    
    background: #FFFFFF;
`
const Info = styled.div`
    h2 {
        margin-bottom: 7px;

        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

    span {
        display: flex;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
    }
`

const SeqAtual = styled.p`
    margin-left: 5px;

    color: ${props => props.concluido === true ? "#8FC549" : "#666666"}
`
const Recorde = styled.p`
    margin-left: 5px;

    color: ${props => props.currentSequence >= props.highestSequence ? "#8FC549" : "#666666"};
`

const Marcador = styled.div`
    min-width: 69px;
    height: 69px;

    border: 1px solid #E7E7E7;
    border-radius: 5px;
    
    /* background: #EBEBEB; */
    background: ${props => props.concluido === true ? "#8FC549" : "#EBEBEB"}
`