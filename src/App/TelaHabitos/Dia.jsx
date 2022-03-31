import { useState } from "react"
import styled from 'styled-components'

export default function Dia({dia, id, obterDiaSelecionado, removerDiaDesmarcado}) {

    const [selecionado, setSelecionado] = useState(false)

    function selecionar() {
        if (!selecionado) {
            setSelecionado(true)
            obterDiaSelecionado(id)
        } else {
            setSelecionado(false)
            removerDiaDesmarcado(id)
        }
    }

    return (
        <DiaDaSemana
            onClick={selecionar}
            selecionado={selecionado}
        >{dia}</DiaDaSemana>
    )
}

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