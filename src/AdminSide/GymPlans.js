import React from "react";
import "./GymPlans.css";
import NavMenu from "./NavMenu";
import TextLoader from "../textloaderwaiting";
import NavStripe from "../NavStripe";
import LoadingStrip from "../LoadingStrip";

class GymPlans extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLoadGymCalled: false,
            Gyms: [],
            Subscriptions: [],
            Bricks: [],
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
                this.state.Bricks.push("Select Gym" + ";/Home");
                this.setState({Gyms: this.state.Gyms, Bricks: this.state.Bricks});
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

    CreateSubsription = ()=>{
        window.location.href="/CreateSubscription";
    }

    CreateSubscriptionOrder = ()=>{
        window.location.href="/SubscriptionOrder";
    }

    DisplayGym(){
        if(this.state.Gyms.length == 0)
        {
            return (<LoadingStrip></LoadingStrip>);
        }
        else{
            return (
                <>{
                    this.state.Gyms.map(data=>{
                        return (
                        <span key={data._fieldsProto.GymName.stringValue}>
                                {data._fieldsProto.GymName.stringValue}
                        </span>
                        );
                    })
                }</>);
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

    OnClickOnSubscribers(e){
        document.cookie = "SubDocID=" + e._ref._path.segments[3];
        document.cookie = "SubscriptionDocID=" + e._ref._path.segments[3];
        window.location.href="/Subscribers";
    }

    DisplaySubscriptions = ()=>{
        if(this.state.Gyms.length == 0)
        {
            return (<LoadingStrip></LoadingStrip>);
        }
        else{
            return (
                <>{
                    this.state.Subscriptions.map(data=>{
                        return (
                            <div className="Card SubscriptionDesign" key={data._fieldsProto.SubScriptionNameIn.stringValue} onClick={()=>this.OnClickOnSubscribers(data)}>
                                <div className="CardCover">
                                <div className="Icon">
                                    {data._fieldsProto.Months.stringValue}.{data._fieldsProto.Days.stringValue}
                                    <div className="IconSmallText">Months</div>
                                </div>
                                <div className="Text">
                                    <div className="HeadText">{data._fieldsProto.SubScriptionNameIn.stringValue}</div>
                                    <div className="SubText">
                                        <b>₹ {data._fieldsProto.Price.stringValue}</b> per <u>{data._fieldsProto.Months.stringValue} Months</u> + <u>{data._fieldsProto.Days.stringValue} Days</u>
                                        <br/>
                                        {data._fieldsProto.Details.stringValue}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }</>);
        }
    }

    LoadClients = (GymDocID) => {
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

    render(){
        return (
            <>
            <div className="CardsBox">
                <div className="CardsBoxTitle">
                    <h3>Subscription Plans&nbsp;</h3>
                    <p>&nbsp;|&nbsp;Daily, Weekly, Monthly & Yearly</p>
                </div>
                <div className="Cards">
                            <div className="Card AddNewAnythingDesign" style={{width: '20vw', height: '10vw'}} onClick={this.props.CreateNewPlan}>
                                <div className="Text">
                                    <div className="PlusButton">
                                        +
                                    </div>
                                    Add New Plan
                                    <br/>
                                    <span>
                                        You can create new plan from here.
                                        </span>
                                    </div>
                            </div>
                    {this.DisplaySubscriptions()}
                </div>
            </div>
            </>
        );
    }

}


export default GymPlans;