import React from "react";

export class Loading extends React.Component{  
    render(){
        return (
            <div className="row">
                <div className="col-xs-12">
                    <center>
                        <div className="loading"></div>
                    </center>
                </div>
            </div>
        );
    };
};