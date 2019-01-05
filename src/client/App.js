import React, { Component }
from 'react';


import {apiUrls} from './apiUrls';
import {ApiCalls} from './apiCalls';


import {Login} from './containers/Login';
import {Dashboard} from './containers/Dashboard';

import {Error} from './components/Error';
import {Loading} from './components/Loading';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true,
            error: ''
        };
    }
    componentDidMount() {
        this.setState({error: '', loading: true});
        ApiCalls.callApiGet(apiUrls.init)
                .then((data) => {
                    this.setState({loading: false});
                })
                .catch( () => {
                    this.handleError('We are sorry but API is not ready, try to refresh the page', true);
                });
    }
    login(data) {
        this.setState({error: '', loading: true});
        ApiCalls.callApiPost(apiUrls.login, data)
                .then((data) => {
                    this.setState({user: data, errors: ''});
                })
                .catch(() => {
                    this.handleError('You were not authenticated, please try again', true);
                })
                .then(() => {
                    this.setState({loading: false});
                });
    }
    handleError(message, permanent){
        this.setState({error: message});
        if(permanent){
            return;
        }
        setTimeout(() => {
            this.setState({error: ''});
        }, 5000)
    }
    logout(){
        this.setState({
            user: null,
            error: ''
        });
    }
    renderHeader(){
        if(this.state.user){
            return (
                <div className="col-xs-12 page-header">
                    <div className="col-xs-2 right">
                        <h1>
                            <span className="logout"><i onClick={this.logout.bind(this)} className="glyphicon glyphicon-off"></i></span>
                        </h1>
                    </div>
                    <div className="col-xs-10">
                        <div id="logo-small"></div>
                        <h3>
                            {'Lists for ' + this.state.user.name}
                        </h3>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-xs-12 page-header">
                <div className="col-xs-12">
                    <center><div id="logo"></div></center>
                    <h3>
                        <center>Your shopping lists</center>
                    </h3>
                </div>
            </div>
        );
    }
    renderLoading(){
        if(this.state.loading){
            return <Loading />;
        }
        return null;
    }
    renderContent(){
        if (!this.state.loading) {
            if (this.state.user) {
                return <Dashboard user={this.state.user} error={this.handleError.bind(this)}/>;
            }
            return <Login login={(data) => {this.login(data)}} />;
        }
        return null;
    }
    render() {
        return (
                <div className="container">
                    <div className="row">
                    {this.renderHeader()}
                    </div>
                    <Error error={this.state.error} />
                    {this.renderLoading()}
                    {this.renderContent()}
                </div>
        );
    }
}
