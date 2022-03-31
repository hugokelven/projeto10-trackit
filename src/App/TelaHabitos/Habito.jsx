import { useContext } from "react";
import axios from 'axios'
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";
import Lixeira from "../../assets/trash.svg"

export default function Habito({meuHabito, diasDaSemana}) {
    
    const { usuario } = useContext(UserContext)

    function deletarHabito() {
        const config = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }

        const promessa = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${meuHabito.id}`, config)

        promessa.then(resposta => {console.log(resposta.data)})

        promessa.catch(erro => {alert(`Erro ${erro.response.status}. Tente novamente.`)})
    }

    return (
        <Container>
            <h2>{meuHabito.name}</h2>

            <div>
                {diasDaSemana.map((dia, i) => {
                    let selecionado = false
    
                    if (meuHabito.days.includes(i)) {
                        selecionado = true
                    }
                    
                    return <DiaDaSemana key={i} selecionado={selecionado}>{dia}</DiaDaSemana>
                })}
            </div>
            
            <img src={Lixeira} alt="Excluir" onClick={deletarHabito}/>
        </Container>
    )
}

const Container = styled.li`
    position: relative;

    width: 340px;
    height: 91px;

    margin-bottom: 10px;
    padding: 14px;

    border-radius: 5px;
    
    background: #FFFFFF;

    h2 {
        margin-bottom: 8px;

        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

    div {
        display: flex;
    }

    img {
        position: absolute;
        z-index: 2;
        top: 11px; right: 10px; 
    }
`
const DiaDaSemana = styled.span`
    width: 30px;
    height: 30px;
    
    margin-right: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.selecionado === true ? "#FFFFFF" : "#DBDBDB"};
    
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    
    background: ${props => props.selecionado === true ? "#CFCFCF" : "#FFFFFF"};
`