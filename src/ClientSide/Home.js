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

import { GiGymBag } from "react-icons/gi";
import { GrPlan } from "react-icons/gr";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";





class Home extends React.Component{

  constructor(props){
        super(props);
        this.cookies = new Cookies();
      

        this.state = {
            Bricks: [],
            ModalIndex: 0,
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
          console.log(AccountDocID + " <==");
        }
    }

    render(){
        return (
            <>
            <div className="Background">
              <div className="Header">
                {/* <NavMenu Bricks={this.state.Bricks}></NavMenu> */}
              </div>
              <div className="MainBox">
                  <div className="CBLeft">
                    <div className="CBLeftButtons">
                      {
                        this.cookies.getcookie("AccountDocID") != "" ? 
                        <>
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
                          <IoHome /> Home
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.LoadPage("/GymPlans")}>
                          <MdSpaceDashboard /> Dashboard
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.ModalShow(1)}>
                          <GrPlan /> New Plan
                        </div>
                        <div className="CBLeftButton" onClick={()=>this.ModalShow(2)}>
                          <FaPersonCirclePlus /> New Subscription
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