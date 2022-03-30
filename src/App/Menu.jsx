import styled from 'styled-components'

export default function Menu() {
    return(
        <Container>
            <span>Hábitos</span>
            <span>Histórico</span>
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

    span {
        margin: 0 31px;

        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
`