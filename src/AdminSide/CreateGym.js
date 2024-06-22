import React from "react";
import "./CreateGym.css";
import ReuseFunctions from "./ReuseFunctions";  // Import ReuseFunctions
import LoadingStrip from "../LoadingStrip"; // Import LoadingStrip

class CreateGym extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AccountDocID: "",
            GYMDocID: "",
            isLoading: false, // Add isLoading state
        };
        this.reuseFunctions = new ReuseFunctions();  // Create an instance of ReuseFunctions
    }

    componentDidMount() {
        var AccountDocID = this.getcookie("AccountDocID");
        this.setState({ AccountDocID: AccountDocID });
    }

    CreateGym = () => {
        this.setState({ isLoading: true }); // Set loading state to true
        var gymname = document.getElementById("GymName").value;
        var address1 = document.getElementById("Address1").value;
        var address2 = document.getElementById("Address2").value;
        var city = document.getElementById("City").value;
        var state = document.getElementById("State").value;
        var country = document.getElementById("Country").value;
        var gymphone = document.getElementById("GymPhone").value;
        var gymemail = document.getElementById("GymEmail").value;

        if (gymname === "" || address1 === "" || address2 === "" || city === "" || state === "" || country === "" || gymphone === "" || gymemail === "") {
            this.highlightEmptyFields([gymname, address1, address2, city, state, country, gymphone, gymemail]);
            this.setState({ isLoading: false }); // Set loading state to false
        } else {
            fetch('https://us-central1-carte-gym.cloudfunctions.net/app/CreateGym', {
                method: 'POST',
                body: JSON.stringify({
                    "GymName": gymname,
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
                    this.setState({ GYMDocID: data._path.segments[1]}); // Set loading state to false
                    this.addRoles();
                    this.props.onSubmit();
                })
                .catch((err) => {
                    // Handle the error
                    this.setState({ isLoading: false }); // Set loading state to false
                });
        }
    }

    highlightEmptyFields = (fields) => {
        const fieldIds = ["GymName", "Address1", "Address2", "City", "State", "Country", "GymPhone", "GymEmail"];
        fields.forEach((field, index) => {
            if (field === "") {
                document.getElementById(fieldIds[index]).style.border = "solid 1px red";
            } else {
                document.getElementById(fieldIds[index]).style.border = "none";
            }
        });
    }

    getcookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    addRoles = async () => {
        var GYMDocID = this.getcookie("GymDocID");
        var AccountDocID = this.getcookie("AccountDocID");
        var bodydata = {
            "GYMDocID": GYMDocID,
            "AccountDocID": AccountDocID,
            "RoleName": "Administrator",
            "Designation": "Carte Fitness Software Admin",
            "TeamHead": "Carte Fitness",
            "Salary": 0,
            "OtherAmounts": 0,
            "Responsibilities": "Full Software Control",
            "Perks": [],
            "ShiftStart": "00:00",
            "ShiftEnd": "00:00",
            "SoftwareAccess": []
        };

        try {
            var respone = await this.reuseFunctions.AddRole(bodydata);
            console.log(respone);
            this.AddAdministrator(respone._path.segments[3]);
            // Handle success if needed
        } catch (error) {
            console.log(error);
            // Handle the error if needed
        }
    }

    AddAdministrator = async (RoleId) => {
        var GYMDocID = this.getcookie("GymDocID");
        var AccountDocID = this.getcookie("AccountDocID");
        var bodydata = {
            "GYMDocID": GYMDocID,
            "AccountDocID": AccountDocID,
            "RoleId": RoleId
        };

        try {
            var respone = await this.reuseFunctions.AddAdministrator(bodydata);
            var data = respone.json();
            this.setState({ isLoading: false });
            //console.log(data);
            // Handle success if needed
        } catch (error) {
            // Handle the error if needed
        }
    }

    handleCancel = () => {
        this.setState({ isLoading: true }); // Set loading state to true
        this.props.onSubmit();
        this.setState({ isLoading: false }); // Set loading state to false
    }

    render() {
        return (
            <>
                <div className="FormBG">
                    <div className="Form">
                        <div className="Header">
                            <h3>Introduce New Gym</h3>
                        </div>
                        {this.state.isLoading && <LoadingStrip />} {/* Conditionally render LoadingStrip */}
                        <div className="FieldsArea">
                            <div className="FieldRow">
                                <b>Gym Name</b>
                                <input name="GymName" id="GymName" type="text" placeholder="Gym Name"></input>
                            </div>
                            <div className="FormFieldDivider"></div>
                            <div className="FieldRow">
                                <b>Address 1</b>
                                <input name="Address1" id="Address1" type="text" placeholder="Address 1"></input>
                            </div>
                            <div className="FieldRow">
                                <b>Address 2</b>
                                <input name="Address2" id="Address2" type="text" placeholder="Address 2"></input>
                            </div>
                            <div className="FieldRow">
                                <b>City</b>
                                <input name="City" id="City" type="text" placeholder="City"></input>
                            </div>
                            <div className="FieldRow">
                                <b>State</b>
                                <input name="State" id="State" type="text" placeholder="State"></input>
                            </div>
                            <div className="FieldRow">
                                <b>Country</b>
                                <input name="Country" id="Country" type="text" placeholder="Country"></input>
                            </div>
                            <div className="FormFieldDivider"></div>
                            <div className="FieldRow">
                                <b>Official Phone</b>
                                <input name="GymPhone" id="GymPhone" type="phone" placeholder="Official Phone"></input>
                            </div>
                            <div className="FieldRow">
                                <b>Official Email</b>
                                <input name="GymEmail" id="GymEmail" type="email" placeholder="Official Email"></input>
                            </div>
                            <div className="ButtonArea">
                                <input type="button" value="Create Gym" onClick={this.CreateGym}></input>
                                <input type="button" value="Cancel" onClick={this.handleCancel}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CreateGym;
