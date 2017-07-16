import React from "react";
import moment from 'moment';

import {apiUrls} from '../apiUrls';
import {ApiCalls} from '../apiCalls';

import {List} from './List';
import {Items} from './Items';

import {Loading} from '../components/Loading';

export class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            adding: false,
            loading: true,
            lists: [],
            activeList: null 
        };
    }
    componentDidMount(){
        this.setState({loading: true});
        this.getAllLists();
    }
    getAllLists(){
        ApiCalls.callApiPost(apiUrls.allLists,{user_id: this.props.user._id})
                .then((data) => {
                    this.setState({lists: data, loading: false});
                })
                .catch(() => {
                    this.setState({loading: false});
                    this.props.error('There was an error on server.', false);
                });
    }
    deleteList(id) {
        ApiCalls.callApiPost(apiUrls.deleteList, {list_id: id})
                .then(() => {
                   this.getAllLists();
                })
                .catch(() => {
                    this.props.error('There was an error on server.', false);
                });
    }
    updateList(id, newDate, newShop, isAddList) {
        var url = isAddList ? apiUrls.newList : apiUrls.updateList;
        var data = {date: newDate, shop: newShop};
        if(isAddList) {
            data['user_id'] = this.props.user._id;
        }
        if(!isAddList) {
            data['list_id'] = id;
        }
        ApiCalls.callApiPost(url, data)
                .then(() => {
                   this.getAllLists();
                })
                .catch(() => {
                    this.props.error('There was an error on server.', false);
                });
    }
    openList(list){
        this.setState({activeList: list});
    }
    closeList(){
        this.setState({activeList: null, loading: true});
        this.getAllLists();
    }
    renderLoading(){
        if(this.state.loading){
            return <Loading />;
        }
        return null;
    }
    renderLists() {
        if(this.state.loading || this.state.activeList){
            return null;
        }
        return this.state.lists
                .sort((a,b) => {
                    return moment(a.date) > moment(b.date);
                })
                .map((list) =>{
                    return (
                        <List 
                            key={list._id}
                            data={list}
                            delete={this.deleteList.bind(this)}
                            update={this.updateList.bind(this)}
                            isAddList={false}
                            open={this.openList.bind(this)}
                        />
                    );
                });
    }
    renderAddList() {
        if(this.state.loading || this.state.activeList){
            return null;
        }
        return (
            <List 
                key={ - 99}
                data={{_id: - 99, shop: '', date: null}}
                delete={null}
                update={this.updateList.bind(this)}
                isAddList={true}
            />
        );
    }
    renderItems(){
        if(this.state.loading || !this.state.activeList){
            return null;
        }
        return (
            <Items
                list={this.state.activeList}
                close={this.closeList.bind(this)}
                error={this.props.error}
                />
        );
    }
    render(){
        return (
            <div id="dashboard-wrapper">
                <div className="row">
                    {this.renderLoading()}
                    {this.renderLists()}
                    {this.renderAddList()}
                    {this.renderItems()}
                </div>
            </div>
        );
    };
};