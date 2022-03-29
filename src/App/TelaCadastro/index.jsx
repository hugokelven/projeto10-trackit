import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import styled from 'styled-components'

import Logo from "./../../assets/logo.jpg"

export default function TelaCadastro() {

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

        console.log(cadastro)
        
        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", cadastro)

        promessa.then(resposta => {
            console.log(resposta.data)
        })

        promessa.catch(erro => {
            alert(`Erro ${erro.response}. Tente Novamente`)
        })
    }

    return (
        <Container className='centralizar-conteudo-em-coluna'>
            <img src={Logo} alt="TrackIt" />

            <form onSubmit={realizarCadastro} className='centralizar-conteudo-em-coluna'>
                <input
                    type="text"
                    placeholder="email"
                    value={cadastro.email}
                    onChange={e => setCadastro({...cadastro, email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={cadastro.password}
                    onChange={e => setCadastro({...cadastro, password: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="nome"
                    value={cadastro.name}
                    onChange={e => setCadastro({...cadastro, name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="foto"
                    value={cadastro.image}
                    onChange={e => setCadastro({...cadastro, image: e.target.value})}
                />

                <button type="submit">Cadastrar</button>

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