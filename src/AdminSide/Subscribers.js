import React from "react";
import ClientCard from "./ClientCard";
import NavMenu from "./NavMenu";
import TextLoader from '../textloaderwaiting';
import Cookies from "./Cookies";
import LoadingStrip from "../LoadingStrip";
class Subscribers extends React.Component{


    
    constructor(props){
        super(props);
        this.cookies = new Cookies();

        this.queryparams = new URLSearchParams(window.location.search);

        this.state = {
            isLoadGymCalled: false,
            Gyms: [],
            Subscriptions: [],
            Subscribers: [],
            ToDisplaySubscriber: [],
            SearchKeyword: "",
            Bricks: []
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
                this.state.Gyms.push(data);this.state.Bricks.push(data._fieldsProto.GymName.stringValue + ";/GymPlans");
                this.setState({Gyms: this.state.Gyms, Bricks: this.state.Bricks});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }   

    
    componentDidMount(){
        if(this.state.isLoadGymCalled == false){
            this.state.isLoadGymCalled = true;

            var GymDocID = this.cookies.getcookie("GymDocID"); 
            this.loadGYM(GymDocID);
                

            var ToSearchAll = this.queryparams.get("SearchAll");
            if(ToSearchAll != undefined && ToSearchAll == "YES")
            {
                this.LoadAllSubscriptions(GymDocID);
            }
            else{   
                var SubDocID = this.cookies.getcookie("SubDocID");
                this.LoadSubscribers(GymDocID, SubDocID);
                setTimeout(()=>{
                    console.log("M");
                    this.LoadIndividualPersons();
                }, 1000);
            }
        }
    }

    LoadAllSubscriptions = async (GymDocID) => {
        var response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetSubscription', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });

        response = await response.json()
        //console.log(response);

        console.log("S");
        await response.map(async (r)=>{
            var SubDocID = r._ref._path.segments[3];
            await this.LoadSubscribers(GymDocID, SubDocID)
            console.log("D");
        });
        setTimeout(()=>{
            console.log("M");
            this.LoadIndividualPersons();
        }, 1000);
        
    }


      async LoadSubscribers(GymDocID, SubDocID){
        var response = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/Subscribers', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID,
                "SubDocID": SubDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        var data = await response.json();
        await this.state.Subscribers.push(data);
        console.log("Added");
      }

      LoadIndividualPersons(){
        console.log("SAHIB")
        var Subscribers = this.state.Subscribers;
        for(let j=0; j<Subscribers.length; j++){
            for(let i=0; i<Subscribers[j].length; i++)
            {
                console.log(Subscribers[j][i]);
                this.LoadtoDisplayTheSubscriber(Subscribers[j][i]);
            }
        }
      }

      async LoadtoDisplayTheSubscriber(Data){
        console.log(Data._fieldsProto.AccountDocID.stringValue);
        let key = Data._fieldsProto.AccountDocID.stringValue;

        let accountData = await this.LoadAccount(key);

        if(accountData._fieldsProto != undefined){
            this.state.ToDisplaySubscriber.push({
                "key":key,
                "AccountData": accountData,
                "OrderData": Data._fieldsProto
            });
            this.setState({
                ToDisplaySubscriber: this.state.ToDisplaySubscriber
            });
        }
      }

      async LoadAccount(accountDocID)  {
        let account = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetAccount', {
            method: 'POST',
            body: JSON.stringify({
                "AccountDocID": accountDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let jsondata = await account.json();
        return jsondata;
      }

      
      async LoadCurrentSubscription(SubDocID)  {
        let account = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/CurrentSubscription', {
            method: 'POST',
            body: JSON.stringify({
                "AccountDocID": SubDocID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let jsondata = await account.json();
        return jsondata;
      }

        dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

      DisplaySubscriber = ()=>{
        var searchtext = this.state.SearchKeyword.toLocaleLowerCase();

        if(this.state.ToDisplaySubscriber.length == 0){
            return (
                <LoadingStrip></LoadingStrip>
            );
        }
        else{
            return this.state.ToDisplaySubscriber.map(data => {
                if(data.AccountData._fieldsProto.FullName.stringValue != undefined){
                    var date = new Date(Date.UTC(1970, 0, 1)); // Epoch
                    if(data.OrderData.EndDate.timestampValue == undefined)
                    {
                        var parts = data.OrderData.EndDate.stringValue.split("-");
                        date = new Date(parts[0],parts[1]-1,parts[2]);
                    }
                    else{
                        var seconds = Number(data.OrderData.EndDate.timestampValue.seconds);
                        date.setUTCSeconds(seconds);
                    }


                    // return (
                    //     <div key={data.key}>
                    //         
                    //         {data.OrderData.Status.stringValue}
                    //         {data.OrderData.PaymentStatus.stringValue}
                    //         {data.OrderData.PaymentReceived.stringValue}
                    //         {data.OrderData.PaymentMethod.stringValue}
                    //         {date.toString()}
                    //         <br/><br/>
                    //     </div>
                    // );

                    var today = new Date();
                    var diffdate = this.dateDiffInDays(date, today);
                    
                    if(diffdate < 0 && (searchtext == "" || data.AccountData._fieldsProto.FullName.stringValue.toLocaleLowerCase().includes(searchtext) == true || data.AccountData._fieldsProto.Phone.stringValue.toLocaleLowerCase().includes(searchtext) == true)){
                        return (
                            <>
                                <ClientCard 
                                    AccountData={data.AccountData}
                                    OrderData={data.OrderData}
                                    ClientName={data.AccountData._fieldsProto.FullName.stringValue} 
                                    ExpiryDate={date.toString()} 
                                    Phone={data.AccountData._fieldsProto.Phone.stringValue}
                                    PaymentStatus={data.OrderData.PaymentStatus.stringValue} 
                                    PaymentRecieved={data.OrderData.PaymentReceived.stringValue}
                                    PaymentMehthod={data.OrderData.PaymentMethod.stringValue}
                                ></ClientCard>
                            </>
                        );
                    }
                }
            });
        }
      }

      DoSearch = (e)=>{
        this.setState({SearchKeyword: e.target.value});
      }
      

    render(){
        return (
            
            <div className="CardsBox">
                <div className="CardsBoxTitle">
                    <h3>Subscribers&nbsp;</h3>
                    <p>&nbsp;|&nbsp;Daily, Weekly, Monthly & Yearly</p>
                </div>
                <div className="CardsBoxTitle">
                    <div className="SearchBar">
                        <input id="SearchTxt" placeholder="Search your query" width="100%" type="text" onChange={this.DoSearch}></input>
                    </div>
                </div>
                <div className="Cards">
                    {this.DisplaySubscriber()}
                </div>
            </div>
        );
    }
}

export default Subscribers;