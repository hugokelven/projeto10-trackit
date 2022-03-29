import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import styled from 'styled-components'

import Logo from "./../../assets/logo.jpg"

export default function TelaLogin({setUsuario}) {

    const navigate = useNavigate()

    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        }
    )

    function realizaLogin(e) {
        e.preventDefault()

        console.log(login)

        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", login)

        promessa.then(resposta => {
            console.log(resposta.data)
            setUsuario(resposta.data)
            navigate("/habitos")
        })

        promessa.catch(erro => {
            alert(`Erro ${erro.response}. Tente Novamente`)
        })
    }

    return (
        <Container className='centralizar-conteudo-em-coluna'>
            <img src={Logo} alt="TrackIt" />

            <form onSubmit={realizaLogin} className='centralizar-conteudo-em-coluna'>
                <input
                    type="text"
                    placeholder="email"
                    value={login.email}
                    onChange={e => setLogin({...login, email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={login.password}
                    onChange={e => setLogin({...login, password: e.target.value})}
                />

                <button type="submit">Entrar</button>

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

    button {
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
`
