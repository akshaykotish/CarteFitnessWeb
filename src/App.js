import './App.css';
import './Common.css';
import './Form.css';
import './Card.css';
import Signup from './Account/Signup';
import Login from './Account/Login';
import Home from './ClientSide/Home';
import CreateGym from './AdminSide/CreateGym';
import GymPage from './AdminSide/GymPage';
import CreateSubscription from './AdminSide/CreateSubscription';
import SubscriptionOrder from './AdminSide/SubscriptionOrder';
import PrivacyPolicy from './ClientSide/PrivacyPolicy';
import RequestDateDeletion from './ClientSide/RequestDateDeletion';
import Subscribers from './AdminSide/Subscribers';
import Person from './AdminSide/Person';

import {
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";


function getcookie(cname) {
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


function App() {
  var AccountDocID = getcookie("AccountDocID");
        
  let url = window.location.href;
  if(AccountDocID == "" && url.toString().toLocaleLowerCase().includes("login") == false &&  url.toString().toLocaleLowerCase().includes("signup") == false)
  {
      window.location.href="/Login";
  }
      return (
        <div className="App">
        {/* <BrowserRouter>
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/CreateGym" element={<CreateGym />} />
                <Route path="/GymPage" element={<GymPage />} />
                <Route path="/CreateSubscription" element={<CreateSubscription />} />
                <Route path="/SubscriptionOrder" element={<SubscriptionOrder />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/RequestDateDelete" element={<RequestDateDeletion />} />
                <Route path="/Subscribers" element={<Subscribers />} />
                <Route path="/Person" element={<Person />} />
          </Routes>
        </BrowserRouter> */}
        <Home></Home>
        </div>
      );
  
}

export default App;
