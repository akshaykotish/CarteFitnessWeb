import React from "react"; 
import "./Signup.css";

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
            <div className="Background">
            <div className="SignUpForm">
                <h1>Carte Fitness</h1>
                <h4>Signup</h4>
                <table>
                    <tr>
                        <td>
                            Full Name
                        </td>
                        <td>
                            <input name="FullName" id="FullName" type="text"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Phone Number
                        </td>
                        <td>
                            <input name="PhoneNumber" id="PhoneNumber" type="text"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                        </td>
                        <td>
                            <input name="Email" id="Email" type="text"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password
                        </td>
                        <td>
                            <input name="Password" id="Password" type="text"></input>
                        </td>
                    </tr>
                    <tr>
                        <input type="button" value="Sign Up" onClick={this.CreateAccount}></input>
                    </tr>
                    <tr>
                        <td>
                            If already registered <a href="Login">Login</a>
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>
            </div>
            </div>
            </>
        );
    }
}

export default Signup;