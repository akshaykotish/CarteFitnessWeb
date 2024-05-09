import React, {Component} from "react";


class NavStripe extends React.Component{


    constructor(props){
        super(props);
    }

    render(){

        return (
            <>
            <div className="NavStripe">
                {
                    this.props.BackLinks.map((bl)=>{
                        return (
                            <div className="NavStripe-item">
                                <a href={bl.link}>{bl.name}</a>>>
                            </div>
                        );
                    })
                }
            </div>
            </>
        );
    }
}

export default NavStripe;