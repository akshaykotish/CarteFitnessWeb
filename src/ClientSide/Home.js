import React from "react";
import "./Home.css";
import ManageGym from "../AdminSide/ManageGym";
import GymPlans from "../AdminSide/GymPlans";
import Subscribers from "../AdminSide/Subscribers";
import CreateSubscription from "../AdminSide/CreateSubscription";
import Person from '../AdminSide/Person';
import NavMenu from "../AdminSide/NavMenu";
import SubscriptionOrder from "../AdminSide/SubscriptionOrder";
import GymDashboard from "../AdminSide/Dashboard";
import {
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Login from "../Account/Login";
import SignUp from "../Account/Signup";
import Cookies from "../AdminSide/Cookies";
import TextLoader from "../textloaderwaiting";
import CreateGym from "../AdminSide/CreateGym";
import Logo from "../Logo";

import { GiGymBag } from "react-icons/gi";
import { GrPlan } from "react-icons/gr";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoAlbums } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";


class Home extends React.Component{

  constructor(props){
        super(props);
        this.cookies = new Cookies();
      

        this.state = {
            Bricks: [],
            ModalIndex: 0,
            GymName: "",
            AccountUserName: ""
        };
    }

    ModalHide(){
      document.getElementById("MainModal").style.display = "none";
      window.location.reload();
    }


    ModalShow(e){
      this.setState({ModalIndex: e});
      document.getElementById("MainModal").style.display = "flex";
      
    }


    LoadPage(e){
      window.location = e;
    }

     componentDidMount(){
        
        var AccountDocID = this.cookies.getcookie("AccountDocID");
        console.log(AccountDocID);
        
        if(this.state.AccountDocID == "")
        {
          console.log(AccountDocID + " <==");
            window.location.href="/Login";
        }
        else{
          console.log(AccountDocID + " <G==");
          this.LoadAccount(AccountDocID);
          this.loadGYM();
        }
    }

    

    loadGYM = async ()=>{
      var GymName = await this.cookies.getcookie("GymName");
      console.log("|" + GymName + "|");
      if(GymName === undefined || GymName == ""){
        var GymDocID = await this.cookies.getcookie("GymDocID");
        var gym = await fetch('https://us-central1-carte-gym.cloudfunctions.net/app/GetGym', {
            method: 'POST',
            body: JSON.stringify({
                "GymDocID": GymDocID
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        });
        var response = await gym.json();
        document.cookie = "GymName=" + response._fieldsProto.GymName.stringValue;
        this.setState({GymName: response._fieldsProto.GymName.stringValue});
      }
      else{
         this.setState({GymName: GymName});
      }
    }

    LoadAccount = async (accountDocID) => {
      var UserName = await this.cookies.getcookie("UserName");
      if(UserName === undefined || UserName == ""){
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
          document.cookie = "UserName=" + jsondata._fieldsProto.FullName.stringValue;
          this.setState({AccountUserName: jsondata._fieldsProto.FullName.stringValue});
      }
      else{
        this.setState({AccountUserName: UserName});
      }
    }


    logout = ()=>{
      var allCookies = document.cookie.split(';'); 
                
                // The "expire" attribute of every cookie is  
                // Set to "Thu, 01 Jan 1970 00:00:00 GMT" 
                for (var i = 0; i < allCookies.length; i++) 
                    document.cookie = allCookies[i] + "=;expires=" 
                    + new Date(0).toUTCString(); 
  
                    window.location.href="/Login";
    }

    render(){
        return (
            <>
            <div className="Background">
              <div className="Header">
                <div className="LeftSideArea">

                </div>
                <div className="LogoPart">
                {<Logo></Logo>} <div className="LogoText">Carte Fitness App<br/><span className="TagLine">Ultimate Gym Tool</span></div>
                </div>
                <div className="AccountControls">
                  <div className="Logout" onClick={this.logout}><IoMdLogOut /> Logout</div>
                </div>
              </div>
              <div className="MainBox">
                  <div className="CBLeft">
                    <div className="CBLeftButtons">
                      {
                        this.cookies.getcookie("AccountDocID") != "" ? 
                        <>
                        <div className="CBLeftButton" onClick={()=>this.ModalShow(0)}>
                          <b>{this.state.AccountUserName}</b>
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.ModalShow(0)}>
                            <GiGymBag  /> New Gym
                        </div>
                        <div className="CBLeftButtonDivider"></div>
                        </>
                        : <></>

                      }
                      {
                        this.cookies.getcookie("GymDocID") != "" ? 
                        <>
                        <div className="CBLeftButton" onClick={()=>this.LoadPage("/Home")}>
                          <b>{this.state.GymName}</b> 
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.LoadPage("/Home")}>
                          <IoHome /> Home
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.LoadPage("/GymDashboard")}>
                          <MdSpaceDashboard /> Dashboard
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.ModalShow(1)}>
                          <GrPlan /> New Plan
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.ModalShow(2)}>
                          <FaPersonCirclePlus /> New Subscription
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.LoadPage("/GymPlans")}>
                          <IoAlbums  /> Plans & Subs...
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.LoadPage("/Subscribers?SearchAll=YES")}>
                          <MdOutlineLocalFireDepartment   /> All Subscribers
                        </div>
                        <div className="CBLeftButtonDivider"></div>
                        </>
                        : <></>
                      }
                    </div>
                  </div>
                  <div className="CBRight">
                  <BrowserRouter>
                  <Routes>
                          <Route path="/" element={<ManageGym  />} />
                          <Route path="/Home" element={<ManageGym  />} />
                          <Route path="/GymDashboard" element={<GymDashboard  />} />
                          <Route path="/GymPlans" element={<GymPlans  />} />
                          <Route path="/Subscribers" element={<Subscribers  />} />
                          <Route path="/Person" element={<Person  />} />
                          <Route path="/Login" element={<Login />} />
                          <Route path="/Signup" element={<SignUp />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </div>
            </div>
            <div id="MainModal" className="MODAL">
              {
                this.state.ModalIndex == 0 ? <CreateGym onSubmit={this.ModalHide}/>
                  : this.state.ModalIndex == 1 ? <CreateSubscription onSubmit={this.ModalHide}/> 
                  : <SubscriptionOrder onSubmit={this.ModalHide}/>
              }
            </div>
            </>
        );
    }
}

export default Home;