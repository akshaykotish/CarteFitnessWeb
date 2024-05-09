import React from "react";
import { useState, useEffect } from "react"; 
import "./CreateGym.css";
import NavMenu from "./NavMenu";

class CreateSubscription extends React.Component{

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

    CreateSubscription = ()=>{

        var GymDocID = this.getcookie("GymDocID");

        var SubScriptionNameIn = document.getElementById("SubscriptionNameIn").value;
        var Cost = document.getElementById("Cost").value;
        var MarginPer = document.getElementById("MarginPer").value;
        var DiscountPer = document.getElementById("DiscountPer").value;
        var TaxPer = document.getElementById("TaxPercentage").value;
        var Price = document.getElementById("Price").value;
        var Days = document.getElementById("Days").value;
        var Months = document.getElementById("Months").value;
        var Details = document.getElementById("Details").value;
        var Image = "";// document.getElementById("Image").value;

        
        //alert(SubScriptionNameIn);
        if(SubScriptionNameIn == "" || Cost == "" || Number(Cost) == NaN || MarginPer == "" || Number(MarginPer) == NaN || DiscountPer == "" || Number(DiscountPer) == NaN || TaxPer == "" || Number(TaxPer) == NaN || Price == "" || Number(Price) == NaN || Days == "" || Number(Days) == NaN || Months == "" || Number(Months) == NaN)
        {
            if(SubScriptionNameIn == "" || SubScriptionNameIn == " ")
            {
                SubScriptionNameIn = "Undefined Subscription";
                document.getElementById("SubscriptionNameIn").style.border = "solid 1px red";
            }
            else{
                document.getElementById("SubscriptionNameIn").style.border = "none";    
            }
            if(Cost == "" || Number(Cost) == NaN)
            {
                Cost = 0;
                document.getElementById("Cost").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Cost").style.border = "none";    
            }
            if(MarginPer == "" || Number(MarginPer) == NaN)
            {
                MarginPer = 0;
                document.getElementById("MarginPer").style.border = "solid 1px red";
            }
            else{
                document.getElementById("MarginPer").style.border = "none";    
            }
            if(DiscountPer == "" || Number(DiscountPer) == NaN)
            {
                DiscountPer = 0;
                document.getElementById("DiscountPer").style.border = "solid 1px red";
            }
            else{
                document.getElementById("DiscountPer").style.border = "none";    
            }
            if(TaxPer == "" || Number(TaxPer) == NaN)
            {
                TaxPer = 0;
                document.getElementById("TaxPercentage").style.border = "solid 1px red";
            }
            else{
                document.getElementById("TaxPercentage").style.border = "none";    
            }
            if(Price == "" || Number(Price) == NaN)
            {
                Price = 0;
                document.getElementById("Price").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Price").style.border = "none";    
            }
            if(Days == "" || Number(Days) == NaN)
            {
                Days = 0;
                document.getElementById("Days").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Days").style.border = "none";    
            }
            if(Months == "" || Number(Months) == NaN)
            {
                Months = 0;
                document.getElementById("Months").style.border = "solid 1px red";
            }
            else{
                document.getElementById("Months").style.border = "none";    
            }
        }
        else{

        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/CreateSubscription', {
            method: 'POST',
            body: JSON.stringify({
                "SubscriptionNameIn": SubScriptionNameIn,
                "Cost":Cost,
                "MarginPer": MarginPer,
                "DiscountPer": DiscountPer,
                "TaxPer": TaxPer,
                "Price": Price,
                "Days":Days,
                "Months": Months,
                "Details": Details,
                "Image": Image, 
                "GymDocID": GymDocID
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
             .then((response) => response.json())
             .then((data) => {
                document.cookie = "SubscriptionDocID=" + data._path.segments[1];
                console.log(data);
                console.log(data._path.segments[1]);

                this.props.onSubmit();
                //window.location.href="/GymPlans";
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


    DoCalculate(){
        var Cost_I = document.getElementById("Cost");
        var Margin_I = document.getElementById("MarginPer");
        var Discount_I = document.getElementById("DiscountPer");
        var Tax_I = document.getElementById("TaxPercentage");
        var Price_I = document.getElementById("Price");

        var Cost = Cost_I.value == "" ? 0 : Number(Cost_I.value);
        var Margin = Cost_I.value == "" ? 0 : Number(Margin_I.value);
        var Discount = Cost_I.value == "" ? 0 : Number(Discount_I.value);
        var Tax = Cost_I.value == "" ? 0 : Number(Tax_I.value);

        Margin = (Margin/100) * Cost;
        Discount = (Discount/100) * (Cost + Margin);
        Tax = (Tax/100) * (Cost + Margin - Discount);
        var Price = Cost + Margin - Discount + Tax;
        Price_I.value = Math.round(Price * 100) / 100;


        document.getElementById("TotalDays").value = Number(Number(document.getElementById("Months").value) * 30 + Number(document.getElementById("Days").value));
    }


    render(){
        return (
            <>
            <div className="FormBG">
            <div className="Form">
                <div className="Header">
                    <h3>New Subscription</h3>
                </div>
                <div className="FieldsArea">
                    <div className="FieldRow">
                        
                            <b>Subscription Name</b>
                            <input name="SubscriptionName" id="SubscriptionNameIn" type="text" placeholder="Subscription Name"></input>
                        
                    </div>
                    <div className="FieldRow">
                            <b>Details</b>
                            <input name="Details" id="Details" type="text" placeholder="Details"></input>
                    </div>
                    <div className="FormFieldDivider"></div>
                    <div className="FieldRow">
                        
                            <b>Cost</b>
                            <input name="Cost" id="Cost" type="number" className="RuppeeSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        
                    </div>
                    <div className="FieldRow">
                        
                            <b>Margin Percentage</b>
                            <input name="MarginPer" id="MarginPer" type="number" className="PercentSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        
                    </div>
                    <div className="FieldRow">
                        
                            <b>Discount Percentage</b>
                            <input name="DiscountPer" id="DiscountPer" type="number" className="PercentSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        
                    </div>
                    <div className="FieldRow">
                        
                            <b>Tax Percentage</b>
                            <input name="TaxPercentage" id="TaxPercentage" type="number" className="PercentSymbol" onChange={this.DoCalculate} placeholder="0"></input>
                        
                    </div>
                    <div className="FieldRow">
                        
                            <b>Price</b>
                            <input name="Price" id="Price" readOnly="true" className="RuppeeSymbol" type="number" placeholder="0"></input>
                        
                    </div>
                    <div className="FormFieldDivider"></div>
                    <div className="FieldRow">
                        
                            <b>Months</b>
                            <input name="Months" id="Months" type="Number" placeholder="0" onChange={this.DoCalculate} ></input>
                        
                    </div>
                    <div className="FieldRow">
                            <b>Days</b>
                            <input name="Days" id="Days" type="Number" placeholder="0" onChange={this.DoCalculate} ></input>
                        
                    </div>
                    <div className="FieldRow">
                        
                            <b>Total Days</b>
                            <input name="TotalDays" id="TotalDays" type="Number" readOnly="true" placeholder="0" ></input>
                        </div>
                    <div className="ButtonArea">
                        <input type="button" value="Create Subscription" onClick={this.CreateSubscription}></input>                        
                        <input type="button" value="Cancel" onClick={this.props.onSubmit}></input>                        
                    </div>
                    </div>
            </div>
            </div>
            </>
        );
    }
}

export default CreateSubscription;