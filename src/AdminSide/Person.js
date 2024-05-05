import React from "react";
import NavMenu from "./NavMenu";

class Person extends React.Component{

    
    constructor(props){
        super(props);

        this.state = {
            isLoadPersonCalled: false,
            Persons: [],
            AccountData: [],
            OrderData: [],
            CurrentGym: [],
            Subscriptions: [],
        };
        
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


    componentDidMount(){
        if(this.state.isLoadPersonCalled == false){
            this.state.isLoadPersonCalled = true;

            var AccountData = localStorage.getItem('AccountData');
            var OrderData = localStorage.getItem('OrderData');

            this.state.AccountData = JSON.parse(AccountData);
            this.state.OrderData = JSON.parse(OrderData);
            //console.log(this.state.OrderData);
            this.LoadGymDetails(this.state.OrderData.GymDocID.stringValue);
            this.setState({AccountData: this.state.AccountData, OrderData: this.state.OrderData});
        }
    }

    LoadGymDetails = async (GymDocID) => {
        var gym = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetGym', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        var data = await gym.json();
        this.state.CurrentGym = data;
        this.setState({CurrentGym: data});
    }

    LoadSubscriptionDetails = async (GymDocID, SubDocID)=>{
        var gym = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetSubscription', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID,
                "SubDocID": SubDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        var data = await gym.json();
        console.log(data);
    }

    DisplayProfile(){
        if(this.state.AccountData.length == 0)
        {
            return (
                <>
                <span>Loading..</span>
                </>
            );
        }
        else{
            return (
                <>
                <div className="Info">
                    <h5>Customer Details</h5>
                    <b>{this.state.AccountData._fieldsProto.FullName.stringValue}</b><br/>
                    {this.state.AccountData._fieldsProto.Phone.stringValue != "" ? <>Phone: {this.state.AccountData._fieldsProto.Phone.stringValue} <br/></> : <></>}
                    {this.state.AccountData._fieldsProto.Email.stringValue != "" ? <>Email: {this.state.AccountData._fieldsProto.Email.stringValue} <br/></> : <></>}
                    {this.state.AccountData._fieldsProto.Address1 != undefined && this.state.AccountData._fieldsProto.Address1.stringValue != "" ? <>Address: {this.state.AccountData._fieldsProto.Address1.stringValue} {this.state.AccountData._fieldsProto.Address2.stringValue} <br/></> : <></>}
                </div>
                </>
               
            );
        }
    }

    DisplayCurrentSGym = ()=>{
        if(this.state.CurrentGym.length == undefined && this.state.CurrentGym._fieldsProto != undefined){
            return (
                <>
                    <div className="CurrentSubscription">
                        <p>
                            <h1>{this.state.CurrentGym._fieldsProto.GymName.stringValue}</h1>
                            {this.state.CurrentGym._fieldsProto.Address1.stringValue} {this.state.CurrentGym._fieldsProto.Address2.stringValue} {this.state.CurrentGym._fieldsProto.State.stringValue}
                        </p>
                    </div>
                </>
            );
        }

        if(this.state.CurrentGym.length == 0)
        {
            return (<><h1>Loading</h1></>);
        }
    }

    DisplayCurrentSGymandSubscription = ()=>{
        if(this.state.CurrentGym.length == undefined && this.state.CurrentGym._fieldsProto != undefined){
            console.log(this.state.OrderData);
            return (
                <>
                    <div className="CurrentSubscription">
                        <p>
                            <h5>Order Details</h5>
                            Start Date: <b>{this.state.OrderData.StartDate.stringValue}</b> | End Date: <b>{this.state.OrderData.EndDate.stringValue}</b><br/>
                            Payment Received: <u>{this.state.OrderData.PaymentReceived.stringValue}</u> <br/>
                            Payment Method: <u>{this.state.OrderData.PaymentMethod.stringValue}</u> <br/>
                            Discount: <u>{this.state.OrderData.DiscountPer.stringValue} %</u> <br/>
                            Tax: <u>{this.state.OrderData.TaxPer.stringValue} %</u><br/>
                            Total Amount: <u>₹ {this.state.OrderData.Price.stringValue}</u> <br/>
                        </p>
                    </div>
                </>
            );
        }

        if(this.state.CurrentGym.length == 0)
        {
            return (<><h1>Loading</h1></>);
        }
    }
    
    DisplayCurrentActiveOrder = ()=>{
        if(this.state.AccountData.length == 0)
        {
            return (
                <>
                <span>Active Order...</span>
                </>
            );
        }
        else{
            return (
                <>
                <div className="Info">
                    <h1>{this.state.OrderData}</h1>
                    Phone: {this.state.AccountData._fieldsProto.Phone.stringValue}<br/>
                    Email: {this.state.AccountData._fieldsProto.Email.stringValue}<br/>
                    {this.state.AccountData._fieldsProto.Address1 != undefined &&
                        <span>Address: {this.state.AccountData._fieldsProto.Address1.stringValue} {this.state.AccountData._fieldsProto.Address2.stringValue}</span>
                    }
                </div>
                </>
               
            );
        }
    }

    printDiv = (divId)=>{
        var divContents = document.getElementById(divId).innerHTML;
        var printWindow = window.open('www.carteapps.com', 'www.carteapps.com', 'height=500,width=800');
        printWindow.document.write('<html><head><title>www.carteapps.com</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }

    render()
    {
        return (
            <>
            <div className="Background">
                <NavMenu Bricks={[]}></NavMenu>
                <div className="PrintBtn" onClick={()=>this.printDiv('ToPrint')}>Print</div>
                <div id="ToPrint">
                    {this.DisplayCurrentSGym()}
                    {this.DisplayProfile()}  
                    {this.DisplayCurrentSGymandSubscription()}
                </div>
            </div>
            </>
        );
    }
}

export default Person;