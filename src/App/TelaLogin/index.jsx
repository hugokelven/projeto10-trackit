import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThreeDots } from  'react-loader-spinner'
import axios from 'axios'
import styled from 'styled-components'

import Logo from "./../../assets/logo.jpg"

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function TelaLogin() {

    const navigate = useNavigate()

    const [desabilitar, setDesabilitar] = useState("")

    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        }
    )

    function realizaLogin(e) {
        e.preventDefault()

        setDesabilitar("disabled")

        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", login)

        promessa.then(resposta => {
            const {image, name, token} = resposta.data
            const usuario = {imagem: image, nome: name, token: token}

            console.log(usuario) //remover
            window.localStorage.setItem('usuario', JSON.stringify(usuario));

            setDesabilitar("")
            
            navigate("/habitos")
        })

        promessa.catch(erro => {
            if (erro.response.status === 422) alert("E-mail ou senha incorretos.")
            else alert(`Erro ${erro.response.status}. Tente Novamente`)

            setDesabilitar("")
        })
    }

    return (
        <Container className='centralizar-conteudo-em-coluna'>
            <img src={Logo} alt="TrackIt" />

            <form onSubmit={realizaLogin} className='centralizar-conteudo-em-coluna'>
                <input
                    type="text"
                    required
                    disabled={desabilitar}
                    placeholder="email"
                    value={login.email}
                    onChange={e => setLogin({...login, email: e.target.value})}
                />
                <input
                    type="password"
                    required
                    disabled={desabilitar}
                    placeholder="senha"
                    value={login.password}
                    onChange={e => setLogin({...login, password: e.target.value})}
                />

                <Botao type="submit" disabled={desabilitar}>Entrar</Botao>

                <BotaoCarregando type="button" desabilitar={desabilitar}>
                    <ThreeDots
                        color='white'
                        ariaLabel='loading'
                    />
                </BotaoCarregando>

                <Link to={"/cadastro"}>
                    <p>Não tem uma conta? Cadastre-se!</p>
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
