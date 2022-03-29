import { useContext } from "react";
import styled from 'styled-components'

import UserContext from "../../contexts/UsuarioContext";

export default function TelaHabitos() {

    const { usuario, setUsuario } = useContext(UserContext);
    console.log(usuario)

    return (
        <Container>
            <header>
                <span>TrackIt</span>
                {/* <img src={usuario.image} alt={usuario.name} /> */}
            </header>
        </Container>
    )
}

const Container = styled.div`
    header {
        position: sticky;
        z-index: 1;
        top: 0; left: 0; right: 0;

        height: 70px;

        padding: 0 18px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background: #126BA5;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }
    header span {
        font-family: 'Playball', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    header img {
        width: 51px;
        height: 51px;

        border-radius: 98.5px;
    }
`