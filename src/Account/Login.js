import React from "react"; 
import "./Login.css";

class Login extends React.Component{


    Login(){
        var phonenumber = document.getElementById("PhoneNumber").value;
        var password = document.getElementById("Password").value;
        
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
                //console.log(data);
                if(data.Status != undefined && data.Status == "False")
                {
                    console.log(data.Status);
                    console.log("Wrong credentials");
                }else{
                    console.log(data._fieldsProto);
                    console.log(data._ref._path.segments[1]);
                    console.log(data);
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
            <div className="Form">
                <div className="Header">
                    <h1>Login</h1>
                </div>
                <div className="FieldsArea">
                    <div className="FieldRow">
                        <b>Phone Number</b> 
                        <input name="PhoneNumber" id="PhoneNumber" type="text" placeholder="Phone"></input>
                    </div>
                    <div className="FieldRow">
                        <b>Password</b> 
                        <input name="Password" id="Password" type="password" placeholder="Password"></input>
                    </div>
                </div>
                <div className="ButtonArea">
                        <input type="button" value="Login" onClick={this.Login}></input>
                        If you don't have account <a href="Signup">Signup</a>
                </div>
                <div className="Footer">

                </div>
            </div>
            </div>
            </>
        );
    }
}

export default Login;