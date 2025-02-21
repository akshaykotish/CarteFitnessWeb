import React from "react";
import { useState, useEffect } from "react"; 
import "./CreateGym.css";
import NavMenu from "./NavMenu";

class SubscriptionOrder extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLoadGymCalled: false,
            Gyms: [],
            Subscriptions: []
        };
        
    }

    
    loadGYM = (GymDocID)=>{
        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetGym', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.state.Gyms.push(data);
                this.setState({Gyms: this.state.Gyms});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    componentDidMount(){
        
        if(this.state.isLoadGymCalled == false){
            this.state.isLoadGymCalled = true;
            
            var GymDocID = this.getcookie("GymDocID");
            this.loadGYM(GymDocID);
            this.LoadSubscription(GymDocID);
        }
    }

    LoadSubscription = (GymDocID)=>{
        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetSubscriptions', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.state.Subscriptions = data;
                this.setState({Subscriptions: data});
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

      onSubscriptionChanged = ()=>{
        var SubscriptionSelected = document.getElementById("SubscriptionSelected");
        
        var fields = this.state.Subscriptions[SubscriptionSelected.value]._fieldsProto;

        var cost = Number(fields.Cost.stringValue);
        var marginper = Number(fields.MarginPer.stringValue);
        cost = cost + ((marginper/100) * cost);
        var discountper = Number(fields.DiscountPer.stringValue);
        var discount = (discountper/100) * cost;
        cost = cost - discount; 
        var taxper = Number(fields.TaxPer.stringValue);
        var tax = (taxper/100) * cost;
        var price = cost + tax;
        var days = Number(fields.Days.stringValue);
        var month = Number(fields.Months.stringValue);

        document.getElementById("Cost").value = Math.round((cost + discount) * 100) / 100;
        document.getElementById("Discount").value =  Math.round((discount) * 100) / 100;
        document.getElementById("Tax").value = Math.round((tax) * 100) / 100;
        document.getElementById("Price").value = Math.round((price) * 100) / 100;
        document.getElementById("Days").value = days;
        document.getElementById("Month").value = month;


        var date = new Date();
        document.getElementById("StartDate").value = date.toISOString().split('T')[0];
        date = new Date(date.setMonth(date.getMonth() + month));
        document.getElementById("EndDate").value = date.toISOString().split('T')[0];
      }

      onDataChange(e){
        console.log(e.target.value);
        var milliseconds = Date.parse(e.target.value);
        var date = new Date(milliseconds);
        
        var months = Number(document.getElementById("Month").value);

        date = new Date(date.setMonth(date.getMonth() + months));
        document.getElementById("EndDate").value = date;
      }
      
    DoCalculate(){
        var Cost_I = document.getElementById("Cost");
        var Discount_I = document.getElementById("Discount");
        var Tax_I = document.getElementById("Tax");
        var Price_I = document.getElementById("Price");

        var Cost = Cost_I.value == "" ? 0 : Number(Cost_I.value);
        var Discount = Cost_I.value == "" ? 0 : Number(Discount_I.value);
        var Tax = Cost_I.value == "" ? 0 : Number(Tax_I.value);

        Discount = (Discount/100) * (Cost);
        Tax = (Tax/100) * (Cost - Discount);
        var Price = Cost - Discount + Tax;
        Price_I.value = Math.round(Price * 100) / 100;
    }

      
    DisplaySubscriptions = ()=>{
        if(this.state.Subscriptions.length == 0)
        {
            return (<>Waiting</>);
        }
        else{
            return (
                <>
                <select id="SubscriptionSelected" onChange={this.onSubscriptionChanged}>
                <option>Select</option>
                {
                    this.state.Subscriptions.map((data, index)=>{
                        return (
                        <option value={index}>
                            {data._fieldsProto.SubScriptionNameIn.stringValue}
                        </option>
                        );
                    })
                }
                </select>
                </>);
        }
    }

    vhevksun(){
        var StartDate = document.getElementById("StartDate").value;
        var EndDate = document.getElementById("EndDate").value;
        
        var SubscriptionSelected = document.getElementById("SubscriptionSelected");
        alert(StartDate.value);
    }

    async CheckLoginWithPhone(Phone){
            alert(Phone);
             var res = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/LoginCheckPhone', {
                method: 'POST',
                body: JSON.stringify({
                  "Phone": Phone
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });

              var data = await res.json();
              return data;
    }


    SignUp = async (FullName, Phone, Email, Password)=>{
            var res = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/Signup', {
                method: 'POST',
                body: JSON.stringify({
                  "FullName": FullName,
                  "Phone": Phone,
                  "Email": "",
                  "Password": ""
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });
              var data = res.json();
              return data;
    }


    CreateOrder = async (UserAccountID, GymDocID, SubscriptionDocID, DiscountPer, Discount, DiscoutCode, TaxPer, Price, StartDate, EndDate, Status, Note, PaymentStatus, PaymentReceived, PaymentMethod, PaymentID, PaymentDetails, PaymentIssue, TimeStamp)  =>{
              
        var res = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/CreateOrder', {
            method: 'POST',
            body: JSON.stringify({
                "AccountDocID": UserAccountID,
                "GymDocID": GymDocID,
                "SubscriptionDocID": SubscriptionDocID,
                "DiscountPer": DiscountPer,
                "DiscountAmount": Discount,
                "DiscountCode": DiscoutCode,
                "TaxPer": TaxPer,
                "Price": Price,
                "StartDate": StartDate,
                "EndDate": EndDate, 
                "Status": Status,
                "Note": Note,
                "PaymentStatus": PaymentStatus,
                "PaymentReceived": PaymentReceived,
                "PaymentMethod": PaymentMethod,
                "PaymentId": PaymentID,
                "PaymentDetails": PaymentDetails,
                "PaymentIssue": PaymentIssue,
                "TimeStamp": TimeStamp
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });

        var data = await res.json();
        return data;
    }

    LinkGymSubscriptionToProfile = async (AccountDocID, GymDocID, SubscriptionDocID, OrderDocID, ExpiryDate, TimeStamp)=>{
        console.log(AccountDocID);
        var res = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/LinkGymSubscriptionToProfile', {
            method: 'POST',
            body: JSON.stringify({
                "AccountDocID": AccountDocID,
                "GymDocID": GymDocID,
                "SubscriptionDocID": SubscriptionDocID,
                "OrderDocID": OrderDocID,
                "ExpiryDate": ExpiryDate,
                "TimeStamp": TimeStamp 
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });

    }

    CreateSubscriptionOrder = ()=>{
        var FullName, Phone, SubscriptionPlan, Cost, Discount, Tax, Price, Days, Month, StartDate, EndDate, PaymentMethod, PaymentReceived, Note;

        FullName = document.getElementById("FullName").value;
        Phone = document.getElementById("Phone").value;

        if(Phone.includes("+91") == false)
        {
            Phone = "+91" + Phone;
        }

        var SubscriptionSelected = document.getElementById("SubscriptionSelected");

        Cost = document.getElementById("Cost").value;
        Discount = document.getElementById("Discount").value;
        Tax = document.getElementById("Tax").value;
        Price = document.getElementById("Price").value;
        Days = document.getElementById("Days").value;
        Month = document.getElementById("Month").value;
        StartDate = document.getElementById("StartDate").value;
        EndDate = document.getElementById("EndDate").value;
        PaymentMethod = document.getElementById("PaymentMethod").value;
        PaymentReceived = document.getElementById("PaymentRecieved").value;
        Note = document.getElementById("Pay_Note").value;

        console.log(FullName + " " + Phone + " " + SubscriptionSelected.value + " " + StartDate + " " + EndDate);



        if(FullName == "" || Phone == "" || SubscriptionSelected.value == "Select" || StartDate == undefined || EndDate == undefined)
        {
            alert("Kindly check Full Name, Phone, Subscription Plan, Start Date & End Date carefully.");
        }
        else{
            SubscriptionPlan = this.state.Subscriptions[SubscriptionSelected.value]._ref._path.segments[3];

            var fields = this.state.Subscriptions[SubscriptionSelected.value]._fieldsProto;
            var taxper = Number(fields.TaxPer.stringValue);
    
            var GymDocID = this.getcookie("GymDocID");
            var AccountDocID = "";
            var SubscriptionDocID = this.state.Subscriptions[SubscriptionSelected.value]._ref._path.segments[3];


            //EndDate = new Date(EndDate);
            //console.log(EndDate);

            this.CheckLoginWithPhone(Phone).then(async (data)=>{
                if(data.Status != undefined && data.Status == false)
                    {
                        var res = await this.SignUp(FullName, Phone, "", "");
                        AccountDocID = res.AccountID;
                    }
                    else{
                        AccountDocID = await data._ref._path.segments[1];
                    }
                    alert(AccountDocID);
                    console.log(AccountDocID);
                    var data = await this.CreateOrder(AccountDocID, GymDocID, SubscriptionDocID, "-", Discount, "-", taxper, Price, StartDate, EndDate, "Active", Note, "", PaymentReceived, PaymentMethod, "", "", "", new Date());
                    var OrderDocID = await data._path.segments[3];
                    this.LinkGymSubscriptionToProfile(AccountDocID, GymDocID, SubscriptionDocID, OrderDocID, EndDate, new Date());
                    window.location.href="/GymPage";
            });
        }
    }


    DisplayGym(){
        if(this.state.Gyms.length == 0)
        {
            return (<></>);
        }
        else{
            return (
                <>{
                    this.state.Gyms.map(data=>{
                        return (
                        <span key={data._fieldsProto.GymName.stringValue}>
                                {data._fieldsProto.GymName.stringValue} | 
                        </span>
                        );
                    })
                }</>);
        }
    }



    
    

    render(){
        return (
            <>
            <div className="Background">
            <NavMenu Bricks={[]}></NavMenu>
            <div className="Form">
                <h3>{this.DisplayGym()} Make New Subscription Order</h3>
                <table>
                    <tr>
                        <td>
                            Full Name
                        </td>
                        <td>
                            <input name="FullName" id="FullName" type="text" placeholder="Full Name"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Phone Number
                        </td>
                        <td>
                            <input name="Phone" id="Phone" type="text" placeholder="Phone"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Subscription Plan
                        </td>
                        <td>
                            {this.DisplaySubscriptions()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Cost
                        </td>
                        <td>
                            <input name="Cost" id="Cost" type="number" className="RuppeeSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Discount
                        </td>
                        <td>
                            <input name="Discount" id="Discount" type="number" className="PercentSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tax
                        </td>
                        <td>
                            <input name="Tax" id="Tax" type="number" className="PercentSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Price
                        </td>
                        <td>
                            <input name="Price" id="Price" type="number" className="RuppeeSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Days
                        </td>
                        <td>
                            <input name="Days" id="Days" type="text" readOnly="true" placeholder="0"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Month
                        </td>
                        <td>
                            <input name="Month" id="Month" type="text" readOnly="true" placeholder="0"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Start Date
                        </td>
                        <td>
                            <input name="StartDate" id="StartDate" type="date" onChange={this.onDateChange}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            End Date
                        </td>
                        <td>
                            <input name="EndDate" id="EndDate" type="date"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Payment Method
                        </td>
                        <td>
                            <select id="PaymentMethod">
                                <option value="Online">
                                    Online
                                </option>
                                <option value="Cash">
                                    Cash
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Payment Recieved
                        </td>
                        <td>
                            <select id="PaymentRecieved">
                                <option value="Yes">
                                    Yes
                                </option>
                                <option value="No">
                                    No
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Payment Note/ID
                        </td>
                        <td>
                            <input name="Pay_Note" id="Pay_Note" type="text" placeholder="Payment Note"></input>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="button" value="Create Subscription" onClick={this.CreateSubscriptionOrder}></input>
                        </td>
                    </tr>
                </table>
            </div>
            </div>
            </>
        );
    }
}

export default SubscriptionOrder;