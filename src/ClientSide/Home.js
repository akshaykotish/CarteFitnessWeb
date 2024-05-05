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

class Home extends React.Component{

  constructor(props){
        super(props);
        this.cookies = new Cookies();
      

        this.state = {
            Bricks: [],
        };
    }

    ModalHide(){
      document.getElementById("MainModal").style.display = "none";
      window.location.reload();
    }


    ModalShow(){
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
                    <div onClick={this.ModalShow}>
                      New Subscription
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
                <CreateSubscription onSubmit={this.ModalHide}/>
            </div>
            </>
        );
    }
}

export default Home;