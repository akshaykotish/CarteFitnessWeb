import React from "react";
import LoadingStrip from "../LoadingStrip";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            message: '',
            inputErrors: {
                PhoneNumber: false,
                Password: false
            }
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            inputErrors: { ...this.state.inputErrors, [e.target.name]: false }
        });
    };

    Login = () => {
        this.setState({ isLoading: true });
        const phonenumber = this.state.PhoneNumber;
        const password = this.state.Password;

        if (phonenumber === "" || password === "") {
            this.setState({ 
                isLoading: false, 
                message: 'Kindly insert your phone number and password properly.', 
                inputErrors: {
                    PhoneNumber: phonenumber === "",
                    Password: password === ""
                }
            });
            return;
        }

        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/Login', {
            method: 'POST',
            body: JSON.stringify({
                "Phone": phonenumber,
                "Password": password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.Status !== undefined && data.Status === "False") {
                    this.setState({ isLoading: false, message: 'You have entered wrong phone number or password.' });
                    console.log(data.Status);
                    console.log("Wrong credentials");
                } else {
                    console.log(data._fieldsProto);
                    console.log(data._ref._path.segments[1]);
                    console.log(data);
                    document.cookie = "AccountDocID=" + data._ref._path.segments[1];
                    window.location.href = "/Home";
                }
            })
            .catch((err) => {
                console.log(err.message);
                this.setState({ isLoading: false, message: `Error: ${err.message}` });
            });
    };

    render() {
        return (
            <>
                <div className="LoginBackground">
                    <div className="LoginForm">
                        <div className="LoginFieldArea">
                            <div className="Header">
                                <h1>Login</h1>
                            </div>
                            <div className="FieldRow">
                                <b>Phone Number</b>
                                <div className="InputWithIcon">
                                    <i className="fas fa-phone"></i>
                                    <input name="PhoneNumber" id="PhoneNumber" type="text" placeholder="Phone" className={this.state.inputErrors.PhoneNumber ? 'error' : ''} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="FieldRow">
                                <b>Password</b>
                                <div className="InputWithIcon">
                                    <i className="fas fa-lock"></i>
                                    <input name="Password" id="Password" type="password" placeholder="Password" className={this.state.inputErrors.Password ? 'error' : ''} onChange={this.handleChange} />
                                </div>
                            </div>
                        
                            <div className="ButtonArea">
                                <input type="button" value="Login" onClick={this.Login}></input>
                                <br />
                                If you don't have account <a href="Signup">Signup</a>
                            </div>
                        </div>
                        {
                            this.state.isLoading ?
                                <div className="LoadingStripArea">
                                    <LoadingStrip />
                                </div>
                                :
                                <div className={`MessageBox ${this.state.message ? 'error' : ''}`}>
                                    {this.state.message}
                                </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
