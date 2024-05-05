import React from "react";


class ClientCard extends React.Component{


    ClickOnPerson = ()=>{
        localStorage.setItem('AccountData', JSON.stringify(this.props.AccountData));
        localStorage.setItem('OrderData', JSON.stringify(this.props.OrderData));
        document.cookie = "PersonDocID=" + this.props.AccountData._ref._path.segments[1];
        window.open("/Person", "_blank");
    }

    render(){
        return (
            <>
                <div className="ClientCard" onClick={this.ClickOnPerson}>
                    <div className="PersonalDetails">
                        <table>
                            <tr>
                                <td>
                                    <div className="ClientName">
                                        {this.props.ClientName}
                                    </div>
                                </td>
                                <td>
                                    <div className="ClientPhone">
                                        {this.props.Phone}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="SubscriptionDetails">
                        <table>
                            <tr>
                                <th>
                                    Expiry Date
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    {this.props.ExpiryDate}
                                </td>
                            </tr>
                            <h4>Payment</h4>
                            <tr>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Recieved
                                </th>
                                <th>
                                    Method
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    {this.props.PaymentStatus}
                                </td>
                                <td>
                                    {this.props.PaymentRecieved}
                                </td>
                                <td>
                                    {this.props.PaymentMehthod}
                                </td>
                            </tr>
                        </table>
                    </div>
                
                <br/>
                
                </div>
            </>
        );
    }
}


export default ClientCard;