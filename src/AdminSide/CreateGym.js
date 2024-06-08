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

        if(gymname == "" || address1  == "" || address2 == "" || city == "" || state == "" || country == "" || gymphone == "" || gymemail == "")
        {
            if(gymname == "")
            {
                document.getElementById("GymName").style.border = "solid 1px red";
            }
            else{
                document.getElementById("GymName").style.border = "none";
            }

            if(address1 == "")
            {
                document.getElementById("Address1").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Address1").style.border = "none";
            }

            if(address2 == "")
            {
                document.getElementById("Address2").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Address2").style.border = "none";
            }

            if(city == "")
            {
                document.getElementById("City").style.border = "solid 1px red";
            }
            else{
                document.getElementById("City").style.border = "none";
            }

            if(state == "")
            {
                document.getElementById("State").style.border = "solid 1px red";
            }
            else{
                document.getElementById("State").style.border = "none";
            }

            if(country == "")
            {
                document.getElementById("Country").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Country").style.border = "none";
            }

            if(gymphone == "")
            {
                document.getElementById("GymPhone").style.border = "solid 1px red";
            }
            else{
                document.getElementById("GymPhone").style.border = "none";
            }

            if(gymemail == "")
            {
                document.getElementById("GymEmail").style.border = "solid 1px red";
            }
            else{
                document.getElementById("GymEmail").style.border = "none";
            }
        }
        else{

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
                this.props.onSubmit();
             })
             .catch((err) => {
                console.log(err.message);
             });
        }
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


      AddRoles = async () =>
      {

        var GYMDocID = this.getcookie("GymDocID");
        var AccountDocID = this.getcookie("AccountDocID");


        var resonse = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/AddRoles', {
            method: 'POST',
            body: JSON.stringify({
                "GYMDocID": GYMDocID,
                "AccountDocID": AccountDocID,
                "Powers": ["Admin"]
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });

        var data = await resonse.json();
        console.log(data);
        alert("Gym Created");
      }


    render(){
        return (
            <>
            <div className="FormBG">
            <div className="Form">
                <div className="Header">
                    <h3>Introduce New Gym</h3>
                </div>
                <div className="FieldsArea">
                    <div className="FieldRow">
                        
                            <b>
                            Gym Name
                        </b>
                            <input name="GymName" id="GymName" type="text" placeholder="Gym Name"></input>
                        </div>
                        <div className="FormFieldDivider"></div>
                    <div className="FieldRow">
                        
                            <b>
                            Address 1
                        </b>
                            <input name="Address1" id="Address1" type="text" placeholder="Address 1"></input>
                        </div>
                    <div className="FieldRow">
                        
                            <b>
                            Address 2
                        </b>
                            <input name="Address2" id="Address2" type="text" placeholder="Address 2"></input>
                        </div>
                    <div className="FieldRow">
                        
                            <b>
                            City
                        </b>
                            <input name="City" id="City" type="text" placeholder="City"></input>
                        </div>
                    <div className="FieldRow">
                        
                            <b>
                            State
                        </b>
                            <input name="State" id="State" type="text" placeholder="State"></input>
                        </div>
                    <div className="FieldRow">
                        
                            <b>
                            Country
                        </b>
                            <input name="Country" id="Country" type="text" placeholder="Country"></input>
                        </div>
                        
                        <div className="FormFieldDivider"></div>
                   
                    <div className="FieldRow">
                        
                            <b>
                            Official Phone
                        </b>
                            <input name="GymPhone" id="GymPhone" type="phone" placeholder="Official Phone"></input>
                        </div>
                    <div className="FieldRow">
                        
                            <b>
                            Official Email
                        </b>
                            <input name="GymEmail" id="GymEmail" type="email" placeholder="Official Email" ></input>
                        </div>
                    <div className="ButtonArea">
                     
                        <input type="button" value="Create Gym" onClick={this.CreateGym}></input>
                        <input type="button" value="Cancel" onClick={this.props.onSubmit}></input>                        
                   
                        </div>
                </div>
            </div>
            </div>
            </>
        );
    }
}

export default CreateGym;