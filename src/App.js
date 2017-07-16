import React, { Component }
from 'react';


import {apiUrls} from './apiUrls';
import {ApiCalls} from './apiCalls';


import {Login} from './containers/Login';
import {Dashboard} from './containers/Dashboard';

import {Error} from './components/Error';
import {Loading} from './components/Loading';

import './css/style.css';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true,
            error: ''
        };
        this.uiStates = {
            LOADING: 1,
            LOGIN: 2,
            DASHBOARD: 3
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
                        <div className="col-xs-12 page-header">
                            <div className="col-xs-12 col-md-6">
                                <h1>
                                    {this.state.user ? <span className="logout"><i onClick={this.logout.bind(this)} className="glyphicon glyphicon-off"></i></span> : null}
                                </h1>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <h3>
                                    {this.state.user ? 'Lists for ' + this.state.user.name : 'Your shopping lists'}
                                </h3>
                            </div>
                            
                        </div>
                    </div>
                    <Error error={this.state.error} />
                    {this.renderLoading()}
                    {this.renderContent()}           
                </div>
        );
    }
}
