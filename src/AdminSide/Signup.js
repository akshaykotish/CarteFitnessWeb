import React from "react"; 
import "./Form.css";
import "./Common.css"

class Signup extends React.Component{



    CreateAccount(){
        var fullname = document.getElementById("FullName").value;
        var phonenumber = document.getElementById("PhoneNumber").value;
        var email = document.getElementById("Email").value;
        var password = document.getElementById("Password").value;
        
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
          .then((response) => response.json())
          .then((data) => {
             //console.log(data);
             if(data.Status != undefined && data.Status == "False")
             {
                 console.log(data.Status);
                 console.log("Wrong credentials");
             }else{
                 document.cookie = "AccountDocID=" + data._ref._path.segments[1];
                 window.location.href="/Home";
             }
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
                        <b>Phone Number</b> 
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
                        If you don't have account <a href="Signup">Signup</a>
                    </div>
            </div>
            </div>
        </div>
            </>
        );
    }
}

export default Signup;