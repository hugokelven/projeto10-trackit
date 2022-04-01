import { useContext } from "react";
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";
import Menu from "../Menu";
import Topo from "../Topo";

export default function TelaHistorico() {

    const { progresso } = useContext(UserContext)

    return (
        <Container>
            <Topo/>

            <h1>Histórico</h1>

            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>

            <Menu progresso={progresso}/>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;

    background: #F2F2F2;

    h1 {
        margin: 28px 0 17px 18px;

        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    p {
        margin: 0 22px 0 15px;

        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`