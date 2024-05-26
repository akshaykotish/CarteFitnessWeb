import React from "react";
import LoadingStrip from "../LoadingStrip";

class Signup extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            isloading: false,
            message: ''
        };
    }


    CreateAccount = ()=>{
        this.setState({isloading: true});
        var fullname = document.getElementById("FullName").value;
        var phonenumber = document.getElementById("PhoneNumber").value;
        var email = document.getElementById("Email").value;
        var password = document.getElementById("Password").value;

        if(fullname == "" || phonenumber == "" || email == "" || password == "")
            {
                this.setState({isloading: false, message: 'Kindly insert your phone number and password properly.'});
            }
        
        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/Signup', {
            method: 'POST',
            body: JSON.stringify({
              "FullName": fullname,
              "Phone": phonenumber,
              "Email": email,
              "Password": password
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          .then((data) => {
             
                 console.log(data._fieldsProto);
                 console.log(data._ref._path.segments[1]);
                 console.log(data);
                 document.cookie = "AccountDocID=" + data._ref._path.segments[1];
                 window.location.href="/Login";
             
          })
             .catch((err) => {
                console.log(err.message);
             });
    }

    render(){
        return (
            <>
            <div className="LoginBackground">
            <div className="LoginForm">
            <div className="Header">
                    <h1>Sign Up</h1>
                </div>
                <div className="LoginFieldArea">
                    <div className="FieldRow">
                        <b>Full Name</b> 
                            <input name="FullName" id="FullName" type="text"></input>
                        </div>
                    <div className="FieldRow">
                        <b>Phone  Number</b> 
                            <input name="PhoneNumber" id="PhoneNumber" type="text"></input>
                        </div>
                    <div className="FieldRow">
                        <b>
                            Email
                        </b> 
                            <input name="Email" id="Email" type="text"></input>
                        </div>
                    <div className="FieldRow">
                        <b>
                            Password
                        </b> 
                            <input name="Password" id="Password" type="text"></input>
                    </div>
                    <div className="ButtonArea">
                    <input type="button" value="Sign Up" onClick={this.CreateAccount}></input>
                        <br/>
                        If you already have an account <a href="Login">Login</a>
                    </div>
                    {
                        this.state.isloading == true ? 
                        <div className="LoadingStripArea">
                            <LoadingStrip></LoadingStrip>
                        </div>
                        :
                        <div className="MessageBox">
                            {this.state.message}
                        </div>
                    }
            </div>
            </div>
        </div>
        
            </>
        );
    }
}

export default Signup;