import React from "react";
import "./Home.css";
import ManageGym from "../AdminSide/ManageGym";
import GymPage from "../AdminSide/GymPage";
import Subscribers from "../AdminSide/Subscribers";
import CreateSubscription from "../AdminSide/CreateSubscription";
import Person from '../AdminSide/Person';
import NavMenu from "../AdminSide/NavMenu";
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

class Home extends React.Component{

  constructor(props){
        super(props);
        this.cookies = new Cookies();
      

        this.state = {
            Bricks: [],
            ModalIndex: 0
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
                    <div className="CBLeftButton" onClick={()=>this.ModalShow(0)}>
                      New Gym
                    </div>
                    <div className="CBLeftButton" onClick={()=>this.ModalShow(1)}>
                      New Plan
                    </div>
                    <div className="CBLeftButton" onClick={()=>this.ModalShow(1)}>
                      New Client
                    </div>
                    <div className="CBLeftButton" onClick={()=>this.ModalShow(1)}>
                      New Subscription
                    </div>
                    </div>
                  </div>
                  <div className="CBRight">
                  <BrowserRouter>
                  <Routes>
                          <Route path="/Home" element={<ManageGym />} />
                          <Route path="/GymPage" element={<GymPage />} />
                          <Route path="/Subscribers" element={<Subscribers />} />
                          <Route path="/Person" element={<Person />} />
                          <Route path="/Login" element={<Login />} />
                          <Route path="/Signup" element={<SignUp />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </div>
            </div>
            <div id="MainModal" className="MODAL">
              {
                this.state.ModalIndex == 0 ?
                <CreateGym onSubmit={this.ModalHide}/>
                  : <CreateSubscription onSubmit={this.ModalHide}/>
              }
            </div>
            </>
        );
    }
}

export default Home;