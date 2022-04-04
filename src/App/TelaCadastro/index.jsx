import { useState } from "react"
import { Link } from "react-router-dom"
import { ThreeDots } from  'react-loader-spinner'
import axios from 'axios'
import styled from 'styled-components'

import Logo from "./../../assets/logo.jpg"

export default function TelaCadastro() {

    const [desabilitar, setDesabilitar] = useState("")

    const [cadastro, setCadastro] = useState(
        {
            email: "",
            name: "",
            image: "",
            password: ""
        }
    )

    function realizarCadastro(e) {
        e.preventDefault()

        setDesabilitar("disabled")

        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", cadastro)

        promessa.then(resposta => {
            setDesabilitar("")
        })

        promessa.catch(erro => {
            alert(`Erro ${erro.response.status}. Tente Novamente`)

            setDesabilitar("")
        })
    }

    return (
        <Container className='centralizar-conteudo-em-coluna'>
            <img src={Logo} alt="TrackIt" />

            <form onSubmit={realizarCadastro} className='centralizar-conteudo-em-coluna'>
                <input
                    type="text"
                    required
                    disabled={desabilitar}
                    placeholder="email"
                    value={cadastro.email}
                    onChange={e => setCadastro({...cadastro, email: e.target.value})}
                />
                <input
                    type="password"
                    required
                    disabled={desabilitar}
                    placeholder="senha"
                    value={cadastro.password}
                    onChange={e => setCadastro({...cadastro, password: e.target.value})}
                />
                <input
                    type="text"
                    required
                    disabled={desabilitar}
                    placeholder="nome"
                    value={cadastro.name}
                    onChange={e => setCadastro({...cadastro, name: e.target.value})}
                />
                <input
                    type="text"
                    required
                    disabled={desabilitar}
                    placeholder="foto"
                    value={cadastro.image}
                    onChange={e => setCadastro({...cadastro, image: e.target.value})}
                />

                <Botao type="submit" disabled={desabilitar}>Cadastrar</Botao>

                <BotaoCarregando type="button" desabilitar={desabilitar}>
                    <ThreeDots
                        color='white'
                        ariaLabel='loading'
                    />
                </BotaoCarregando>

                <Link to={"/"}>
                    <p>Já tem uma conta? Faça login!</p>
                </Link>
            </form>
        </Container>
    )
}

const Container = styled.div`
    img {
        width: 180px;

        margin: 68px 0 32.62px 0;
    }

    input {
        width: 303px;
        height: 45px;

        margin-bottom: 6px;

        border: 1px solid #D5D5D5;
        border-radius: 5px;
        
        background: #FFFFFF;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }

    a {
        text-decoration: none;
    }
`

const Botao = styled.button`
    display: ${props => props.disabled === "disabled" ? "none" : ""};

    width: 303px;
    height: 45px;

    margin-bottom: 25px;

    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;

    border: none;
    border-radius: 4.6px;
    
    background: #52B6FF;
`

const BotaoCarregando = styled.button`
    display: ${props => props.desabilitar === "disabled" ? "flex" : "none"};

    width: 303px;
    height: 45px;

    margin-bottom: 25px;

    justify-content: center;
    align-items: center;

    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;

    border: none;
    border-radius: 4.6px;

    background: #52B6FF;
    opacity: 0.7;
`