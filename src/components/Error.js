import React from "react";

export class Error extends React.Component{  
    render(){
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <p className="error">{this.props.error}</p>
                </div>
            </div>
        );
    };
};