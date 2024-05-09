import React from "react";
import "./ManageGym.css";
import TextLoader from "../textloaderwaiting";
import NavStripe from "../NavStripe";

class ManageGym extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isLoadGymCalled: false,
            Gyms: [],
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
                this.setState({Gyms: this.state.Gyms});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    load_myGyms = ()=>{
        var AccountDocID = this.getcookie("AccountDocID");

        fetch('https://us-central1-carte-gym.cloudfunctions.net/app/MyGyms', {
            method: 'POST',
            body: JSON.stringify({
                "AccountDocID": AccountDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    console.log(element._fieldsProto.GYMDocID.stringValue);
                    this.loadGYM(element._fieldsProto.GYMDocID.stringValue);
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    componentDidMount(){
        
        if(this.state.isLoadGymCalled == false){
            this.state.isLoadGymCalled = true;
            this.load_myGyms();
        }
        
    }

    OnClickGymBox = (data)=>{
        document.cookie = "GymDocID=" + data._ref._path.segments[1];
        window.location.href="/GymDashboard";
        //alert(data._ref._path.segments[1]);
    }

    DisplayGyms(){
        if(this.state.Gyms.length == 0)
        {
            return (<TextLoader text="Carte..." intervalTime={500} />);
        }
        else{
            console.log(this.state.Gyms);
            return (
                <>{
                    this.state.Gyms.map(data=>{
                        return (
                        <div className="Card GymPickDesign" key={data._fieldsProto.GymName.stringValue} onClick={()=>this.OnClickGymBox(data)}>
                                <div className="Text">
                                    {data._fieldsProto.GymName.stringValue}
                                    <br/>
                                    <span>
                                        {data._fieldsProto.Address1.stringValue} {data._fieldsProto.Address2.stringValue} {data._fieldsProto.City.stringValue}
                                        </span>
                                    </div>
                            </div>
                        );
                    })
                }</>);
        }
    }
 
    render(){
        return (
            <>
                <div className="ManageGymBackground">
                    <div className="CardsBox">
                        <div className="CardsBoxTitle">
                            <h3>Pick your gym</h3>
                        </div>
                        <div className="Cards">
                            {this.DisplayGyms()}
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default ManageGym;