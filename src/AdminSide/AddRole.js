import React from "react";

class AddRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            GymDocID: "",
            AccountDocID: "",
            RoleName: "",
            Designation: "",
            TeamHead: "",
            Salary: "",
            OtherAmounts: [{ title: "", value: "" }],
            Responsibilities: [{ title: "", detail: "" }],
            Perks: [{ title: "", detail: "" }],
            ShiftStart: "09:00",
            ShiftEnd: "17:00",
            SoftwareAccess: [],
            teamHeads: [],
            softwareAccessOptions: [
                { label: "New Gym", value: "new_gym" },
                { label: "New Subscription", value: "new_subscription" },
                { label: "Manage Members", value: "manage_members" },
                { label: "View Reports", value: "view_reports" }
            ],
            defaultSalary: "50000"
        };
    }

    componentDidMount() {
        var GymDocID = this.getcookie("GymDocID");
        this.setState({ GymDocID: GymDocID });
        var AccountDocID = this.getcookie("AccountDocID");
        this.setState({ AccountDocID: AccountDocID });

        // Fetch team heads from the server or initialize with dummy data
        this.setState({ teamHeads: ["John Doe", "Jane Smith", "Emily Davis"] });
        this.setState({ Salary: this.state.defaultSalary });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleOtherAmountChange = (index, event) => {
        const newOtherAmounts = this.state.OtherAmounts.map((amount, sIndex) => {
            if (index !== sIndex) return amount;
            return { ...amount, [event.target.name]: event.target.value };
        });
        this.setState({ OtherAmounts: newOtherAmounts });
    }

    handleResponsibilityChange = (index, event) => {
        const newResponsibilities = this.state.Responsibilities.map((responsibility, sIndex) => {
            if (index !== sIndex) return responsibility;
            return { ...responsibility, [event.target.name]: event.target.value };
        });
        this.setState({ Responsibilities: newResponsibilities });
    }

    handlePerkChange = (index, event) => {
        const newPerks = this.state.Perks.map((perk, sIndex) => {
            if (index !== sIndex) return perk;
            return { ...perk, [event.target.name]: event.target.value };
        });
        this.setState({ Perks: newPerks });
    }

    handleSoftwareAccessChange = (e) => {
        const { value, checked } = e.target;
        this.setState(prevState => {
            const newSoftwareAccess = checked
                ? [...prevState.SoftwareAccess, value]
                : prevState.SoftwareAccess.filter(access => access !== value);
            return { SoftwareAccess: newSoftwareAccess };
        });
    }

    addOtherAmount = () => {
        this.setState({ OtherAmounts: this.state.OtherAmounts.concat([{ title: "", value: "" }]) });
    }

    addResponsibility = () => {
        this.setState({ Responsibilities: this.state.Responsibilities.concat([{ title: "", detail: "" }]) });
    }

    addPerk = () => {
        this.setState({ Perks: this.state.Perks.concat([{ title: "", detail: "" }]) });
    }

    addRole = () => {
        const { RoleName, Designation, TeamHead, Salary, OtherAmounts, Responsibilities, Perks, ShiftStart, ShiftEnd, SoftwareAccess } = this.state;

        if (RoleName === "" || Designation === "" || TeamHead === "" || Salary === "" || Responsibilities.some(r => r.title === "" || r.detail === "") || ShiftStart === "" || ShiftEnd === "" || SoftwareAccess.length === 0) {
            if (RoleName === "") {
                document.getElementById("RoleName").style.border = "solid 1px red";
            } else {
                document.getElementById("RoleName").style.border = "none";
            }

            if (Designation === "") {
                document.getElementById("Designation").style.border = "solid 1px red";
            } else {
                document.getElementById("Designation").style.border = "none";
            }

            if (TeamHead === "") {
                document.getElementById("TeamHead").style.border = "solid 1px red";
            } else {
                document.getElementById("TeamHead").style.border = "none";
            }

            if (Salary === "") {
                document.getElementById("Salary").style.border = "solid 1px red";
            } else {
                document.getElementById("Salary").style.border = "none";
            }

            if (Responsibilities.some(r => r.title === "" || r.detail === "")) {
                Responsibilities.forEach((r, index) => {
                    if (r.title === "" || r.detail === "") {
                        document.getElementById(`Responsibility-${index}-title`).style.border = "solid 1px red";
                        document.getElementById(`Responsibility-${index}-detail`).style.border = "solid 1px red";
                    } else {
                        document.getElementById(`Responsibility-${index}-title`).style.border = "none";
                        document.getElementById(`Responsibility-${index}-detail`).style.border = "none";
                    }
                });
            }

            if (ShiftStart === "") {
                document.getElementById("ShiftStart").style.border = "solid 1px red";
            } else {
                document.getElementById("ShiftStart").style.border = "none";
            }

            if (ShiftEnd === "") {
                document.getElementById("ShiftEnd").style.border = "solid 1px red";
            } else {
                document.getElementById("ShiftEnd").style.border = "none";
            }

            if (SoftwareAccess.length === 0) {
                document.getElementById("SoftwareAccessError").style.display = "block";
            } else {
                document.getElementById("SoftwareAccessError").style.display = "none";
            }
        } else {
            fetch('https://us-central1-carte-gym.cloudfunctions.net/app/AddRoles', {
                method: 'POST',
                body: JSON.stringify({
                    "AccountDocID": this.state.AccountDocID,
                    "GymDocID": this.state.GymDocID,
                    "RoleName": RoleName,
                    "Designation": Designation,
                    "TeamHead": TeamHead,
                    "Salary": Salary,
                    "OtherAmounts": OtherAmounts,
                    "Responsibilities": Responsibilities,
                    "Perks": Perks,
                    "ShiftStart": ShiftStart,
                    "ShiftEnd": ShiftEnd,
                    "SoftwareAccess": SoftwareAccess
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    alert("Role Added Successfully");
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

    render() {
        return (
            <>
                <div className="FormBG">
                    <div className="Form">
                        <div className="Header">
                            <h3>Add New Job Role</h3>
                        </div>
                        <div className="FieldsArea">
                            <div className="FieldRow">
                                <b>Role Name</b>
                                <input name="RoleName" id="RoleName" type="text" placeholder="Role Name" onChange={this.handleChange} />
                            </div>
                            <div className="FieldRow">
                                <b>Designation</b>
                                <input name="Designation" id="Designation" type="text" placeholder="Designation" onChange={this.handleChange} />
                            </div>
                            <div className="FieldRow">
                                <b>Team Head</b>
                                <select name="TeamHead" id="TeamHead" onChange={this.handleChange}>
                                    <option value="">Select Team Head</option>
                                    {this.state.teamHeads.map((head, index) => (
                                        <option key={index} value={head}>{head}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="FormFieldDivider"></div>
                            <div className="FieldRow">
                                <b>Salary</b>
                                <input name="Salary" id="Salary" className="RuppeeSymbol" type="number" placeholder="Salary" value={this.state.Salary} onChange={this.handleChange} />
                            </div>
                            <div className="FormFieldDivider"></div>
                            {this.state.OtherAmounts.map((amount, index) => (
                                <div key={index} className="FieldRow">
                                    <b>Other Amount {index + 1}</b>
                                    <input
                                        type="text"
                                        name="title"
                                        id={`OtherAmount-${index}-title`}
                                        placeholder="Title"
                                        value={amount.title}
                                        onChange={(e) => this.handleOtherAmountChange(index, e)}
                                    />
                                    <input
                                        type="number"
                                        name="value"
                                        id={`OtherAmount-${index}-value`}
                                        className="RuppeeSymbol"
                                        placeholder="Amount"
                                        value={amount.value}
                                        onChange={(e) => this.handleOtherAmountChange(index, e)}
                                    />
                                </div>
                            ))}
                            <div className="FieldRow">
                                <button type="button" onClick={this.addOtherAmount}>Add Other Amount</button>
                            </div>
                            <div className="FormFieldDivider"></div>
                            {this.state.Responsibilities.map((responsibility, index) => (
                                <div key={index} className="FieldRow">
                                    <b>Responsibility {index + 1}</b>
                                    <input
                                        type="text"
                                        name="title"
                                        id={`Responsibility-${index}-title`}
                                        placeholder="Title"
                                        value={responsibility.title}
                                        onChange={(e) => this.handleResponsibilityChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="detail"
                                        id={`Responsibility-${index}-detail`}
                                        placeholder="Detail"
                                        value={responsibility.detail}
                                        onChange={(e) => this.handleResponsibilityChange(index, e)}
                                    />
                                </div>
                            ))}
                            <div className="FieldRow">
                                <button type="button" onClick={this.addResponsibility}>Add Responsibility</button>
                            </div>
                            <div className="FormFieldDivider"></div>
                            {this.state.Perks.map((perk, index) => (
                                <div key={index} className="FieldRow">
                                    <b>Perk {index + 1}</b>
                                    <input
                                        type="text"
                                        name="title"
                                        id={`Perk-${index}-title`}
                                        placeholder="Title"
                                        value={perk.title}
                                        onChange={(e) => this.handlePerkChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="detail"
                                        id={`Perk-${index}-detail`}
                                        placeholder="Detail"
                                        value={perk.detail}
                                        onChange={(e) => this.handlePerkChange(index, e)}
                                    />
                                </div>
                            ))}
                            <div className="FieldRow">
                                <button type="button" onClick={this.addPerk}>Add Perk</button>
                            </div>
                            <div className="FormFieldDivider"></div>
                            <div className="FieldRow">
                                <b>Shift Start Time</b>
                                <input name="ShiftStart" id="ShiftStart" type="time" value={this.state.ShiftStart} onChange={this.handleChange} />
                            </div>
                            <div className="FieldRow">
                                <b>Shift End Time</b>
                                <input name="ShiftEnd" id="ShiftEnd" type="time" value={this.state.ShiftEnd} onChange={this.handleChange} />
                            </div>
                            <div className="FormFieldDivider"></div>
                            <div className="FieldRow">
                                <b>Software Functionality Access</b>
                                {this.state.softwareAccessOptions.map((option, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            id={`SoftwareAccess-${option.value}`}
                                            value={option.value}
                                            onChange={this.handleSoftwareAccessChange}
                                        />
                                        <label htmlFor={`SoftwareAccess-${option.value}`}>{option.label}</label>
                                    </div>
                                ))}
                                <div id="SoftwareAccessError" style={{ color: 'red', display: 'none' }}>Please select at least one access option</div>
                            </div>
                            <div className="ButtonArea">
                                <input type="button" value="Add Role" onClick={this.addRole} />
                                <input type="button" value="Cancel" onClick={this.props.onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AddRole;
