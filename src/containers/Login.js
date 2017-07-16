import React from "react";

export class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: 'jarda',
            password: 'jarda'
        };
    }
    handleChange(event) {
        var data = {};
        data[event.target.name] = event.target.value;
        this.setState(data);
    }
    handleSubmit(event) {
        this.props.login(this.state);
        this.setState({password: ''});
    }
    
    render(){
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Please Sign In</h3>
                        </div>
                        <div className="panel-body">
                            <form>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" onChange={this.handleChange.bind(this)} placeholder="Username" name="username" type="text" value={this.state.username} autoFocus />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" onChange={this.handleChange.bind(this)} placeholder="Password" name="password" type="password" value={this.state.password}/>
                                    </div>
                                    <a className="btn btn-lg btn-success btn-block" onClick={this.handleSubmit.bind(this)}>Login</a>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};