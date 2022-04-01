import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styled from 'styled-components'

import 'react-circular-progressbar/dist/styles.css';

export default function Menu({progresso}) {

    return(
        <Container>
            <Link to={"/habitos"}>
                <div>Hábitos</div>
            </Link>

            <Hoje>
                <Link to={"/hoje"}>
                    <CircularProgressbar
                        value={progresso}
                        text={`Hoje`}
                        background={true}
                        backgroundPadding={6}
                        styles={buildStyles({
                            pathColor: "#FFFFFF",
                            textColor: "#FFFFFF",
                            trailColor: '#52B6FF',
                            backgroundColor: '#52B6FF',
                        })}
                    />;
                </Link>
            </Hoje>

            <Link to={"/historico"}>
                <div>Histórico</div>
            </Link>
        </Container>
    )
}

const Container = styled.footer`
    position: fixed;
    z-index: 1;
    bottom: 0; left: 0; right: 0;

    height: 70px;

    margin: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: white;

    & a:first-child div, & a:last-child div {
        margin: 0 31px;

        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }

    a {
        text-decoration: none;
    }
`
const Hoje = styled.div`
    position: absolute;
    z-index: 2;
    bottom: 10px; left: calc(50% - (91px / 2));

    width: 91px;
    height: 91px;
`