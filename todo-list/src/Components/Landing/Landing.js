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

    constructor(props) {
        super(props);
        this.state = {
            visible: "login"
        };
    }

    aFunctionCall = (data) => {
        this.props.changeLogin(data);
    }

    changeText = () => {
        if(this.state.visible === "login") {
            this.setState({
                visible: "signup"
            });
        } else {
            this.setState({
                visible: "login"
            });
        }
    }

    render() {

        const dark = {
            background: "#111",
            color: "white"
        }

        const light = {
            color: "#555",
            background: "#fff"
        }

        return (
            <Container className="landing" style={this.props.isDark === true ? dark : light} fluid>
                <Row>
                    <Col md={7} className="image my-auto">
                        <h1 className="text-center">Declutter Your Schedule</h1>
                        <Image src={Logo} fluid></Image>
                        <h5 className="text-center">Your Busy Life Deserves This</h5>
                    </Col>
                    <Col md={5} className="sign my-auto">
                        <h2>Welcome, Let's Get Started.</h2>
                        {this.state.visible === "login" ?
                            <Login 
                                loggedIn={this.props.loggedIn}
                                isDark={this.props.isDark}
                                aFunctionCall={this.aFunctionCall}
                                authToken={this.props.authToken}
                                changeText={this.changeText}
                            /> :
                            <SignUp 
                                loggedIn={this.props.loggedIn}
                                isDark={this.props.isDark}
                                aFunctionCall={this.aFunctionCall}
                                authToken={this.props.authToken}
                                changeToLogin={this.changeText}
                            />}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Landing;