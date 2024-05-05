import React from "react";

class NavMenu extends React.Component{


    loadNavMenuses = ()=>{
        var bricks = this.props.Bricks;
        return bricks.map((brick)=>{
            var parts = brick.split(";");
            return (
                <a href={parts[1]} className="NMBarClick">{parts[0]}</a>
            );
        });
    }

    render()
    {
        return (
            <>
            <div className="NavMenu">
                <div className="NMLogo"></div>
                <div className="NMBar">
                    {this.loadNavMenuses()}
                    <a href="/Home" className="NMBarClick">
                        Profile
                    </a>
                </div>
                <div className="NMBarBottom">
                    
                </div>
            </div> 
            </>
        );
    }
}

export default NavMenu;