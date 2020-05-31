import React from 'react';
import Logo from '../Todo/preview.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import './Landing.css';

class Landing extends React.Component {

    state = {
        visible: "signup"
    }

    render() {
        return (
            <Container className="landing" fluid>
                <Row>
                    <Col md={7} className="image my-auto">
                        <h1 className="text-center">Declutter Your Life</h1>
                        <Image src={Logo} fluid></Image>
                        <h4 className="text-center">Your Busy Life Deserves This</h4>
                    </Col>
                    <Col md={5} className="sign my-auto">
                        <h2>Welcome, Let's Get Started.</h2>
                        {this.state.visible === "login" ?
                            <Login /> :
                            <SignUp />}
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Landing;