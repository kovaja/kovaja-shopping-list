import React from "react";

export class Error extends React.Component {  
    render(){
        return (
            <div className="row">
                <div className="col-xs-12 error">
                    <p>{this.props.error}</p>
                </div>
            </div>
        );
    };
};