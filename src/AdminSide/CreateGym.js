import React from "react";
import { useState, useEffect } from "react"; 
import "./CreateGym.css";

class CreateGym extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            AccountDocID: "",
            GYMDocID: "",
        };
    }

    componentDidMount(){
        var AccountDocID = this.getcookie("AccountDocID");
        this.setState({AccountDocID: AccountDocID});
    }

    CreateGym = ()=>{
        var gymname = document.getElementById("GymName").value;
        var address1 = document.getElementById("Address1").value;
        var address2 = document.getElementById("Address2").value;
        var city = document.getElementById("City").value;
        var state = document.getElementById("State").value;
        var country = document.getElementById("Country").value;
        var gymphone = document.getElementById("GymPhone").value;
        var gymemail = document.getElementById("GymEmail").value;


        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/CreateGym', {
            method: 'POST',
            body: JSON.stringify({
                "GymName":gymname,
                "Address1": address1,
                "Address2": address2,
                "City": city,
                "State": state,
                "Country": country,
                "Phone": gymphone,
                "Email": gymemail
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                document.cookie = "GymDocID=" + data._path.segments[1];
                console.log(data);
                console.log(data._path.segments[1]);
                this.setState({GYMDocID: data._path.segments[1]});
                this.AddRoles();

             })
             .catch((err) => {
                console.log(err.message);
             });
    }
    
    
    getcookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }


      AddRoles = () =>
      {

        var GYMDocID = this.getcookie("GymDocID");
        var AccountDocID = this.getcookie("AccountDocID");

        alert("=>" + GYMDocID + " " + AccountDocID);

        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/AddRoles', {
            method: 'POST',
            body: JSON.stringify({
                "GYMDocID": GYMDocID,
                "AccountDocID": AccountDocID,
                "Powers": ["Admin"]
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.href="/Home";
            })
            .catch((err) => {
                console.log(err.message);
            });
      }


    render(){
        return (
            <>
            <div className="Background">
            <div className="Form">
                <div className="Logo"></div>
                <h3>Create Gym</h3>
                <table>
                    <tr>
                        <td>
                            Gym Name
                        </td>
                        <td>
                            <input name="GymName" id="GymName" type="text" placeholder="Gym Name"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Address 1
                        </td>
                        <td>
                            <input name="Address1" id="Address1" type="text" placeholder="Address 1"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Address 2
                        </td>
                        <td>
                            <input name="Address2" id="Address2" type="text" placeholder="Address 2"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            City
                        </td>
                        <td>
                            <input name="City" id="City" type="text" placeholder="City"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            State
                        </td>
                        <td>
                            <input name="State" id="State" type="text" placeholder="State"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Country
                        </td>
                        <td>
                            <input name="Country" id="Country" type="text" placeholder="Country"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Official Phone
                        </td>
                        <td>
                            <input name="GymPhone" id="GymPhone" type="phone" placeholder="Official Phone"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Official Email
                        </td>
                        <td>
                            <input name="GymEmail" id="GymEmail" type="email" placeholder="Official Email" ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                        <td>
                        <input type="button" value="Create Gym" onClick={this.CreateGym}></input>
                        </td>
                    </tr>
                </table>
            </div>
            </div>
            </>
        );
    }
}

export default CreateGym;