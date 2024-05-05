import React from "react";
import "./PrivacyPolicy.css";

class RequestDateDeletion extends React.Component{

    onClickMsg(){
        document.getElementById("msg").innerText = "Thanks! Our team will connect you.";
    }

    render(){
        return (
            <>
            <div className="PrivacyPolicy">
            <label>Enter Your Phone Number to Request Data Deletion.</label><br/>
            <input type="input" placeholder="PhoneNumber" /><br/>
            <input type="submit" onClick={this.onClickMsg} value="Submit" />
            <div id="msg"></div>
            </div>
            </>
        );
    }
}


export default RequestDateDeletion;