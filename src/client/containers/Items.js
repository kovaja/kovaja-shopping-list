import React from "react";
import moment from 'moment';

import {apiUrls} from '../apiUrls';
import {ApiCalls} from '../apiCalls';

import {Loading} from '../components/Loading';

import {Item} from './Item';

export class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            items: [],
            categories: []
        };
    }
    componentDidMount() {
        ApiCalls.callApiGet(apiUrls.getCategories)
                .then((data) => {
                    this.setState({categories: data});
                    this.getAllItems();
                })
                .catch(() => {
                    this.setState({loading: false});
                    this.props.error('There was an error on server.', false);
                });
    }
    getAllItems() {
        ApiCalls.callApiPost(apiUrls.allItems, {list_id: this.props.list._id})
                .then((data) => {
                    this.setState({items: data, loading: false});
                }).catch(() => {
                    this.setState({loading: false});
                    this.props.error('There was an error on server.', false);
                });
    }
    updateItem(id, newName, newAmount, newCategory, isAddItem) {
        var url = isAddItem ? apiUrls.newItem : apiUrls.updateItem;
        var data = {name: newName, category_id: newCategory._id, amount: newAmount};
        if (isAddItem) {
            data['list_id'] = this.props.list._id;
        }
        if (!isAddItem) {
            data['item_id'] = id;
        }
        ApiCalls.callApiPost(url, data)
                .then(() => {
                    this.getAllItems();
                })
                .catch((error) => {
                    console.log('update error', error);
                    this.props.error('There was an error on server.', false);
                });
    }
    deleteItem(id) {
        ApiCalls.callApiPost(apiUrls.deleteItem, {item_id: id})
                .then(() => {
                    this.getAllItems();
                })
                .catch(() => {
                    this.props.error('There was an error on server.', false);
                });
    }
    renderLoading() {
        if (this.state.loading) {
            return <Loading />;
        }
        return null;
    }
    renderHeading() {
        if (this.state.loading) {
            return null;
        }
        return (
            <div className="panel-heading">
                <div className="panel-label">{moment(this.props.list.date).format('MMMM Do YYYY') + ' in ' +this.props.list.shop}</div>
                <span className="back right"><i onClick={this.props.close} className="glyphicon glyphicon-chevron-left"></i></span>
            </div>
        );
    }
    renderItems() {
        if (this.state.loading || this.state.items.legth === 0) {
            return null;
        }
        return this.state.items
                .map((item) => {
                    return (
                        <Item 
                            key={item._id}
                            data={item}
                            delete={this.deleteItem.bind(this)}
                            update={this.updateItem.bind(this)}
                            categories={this.state.categories}
                            isAddItem={false}
                        />
                    );
                });
    }
    renderAddItem() {
        if (this.state.loading) {
            return null;
        }
        return (
            <Item 
                key={-99}
                data={{}}
                delete={this.deleteItem.bind(this)}
                update={this.updateItem.bind(this)}
                categories={this.state.categories}
                isAddItem={true}
            />
        );
    }
        renderPanel() {
            if (this.state.loading) {
                return null;
            }
        return (
            <div className="panel panel-default">
                {this.renderHeading()}
                <div className="panel-body">
                    {this.renderItems()}
                    {this.renderAddItem()}
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.renderLoading()}
                {this.renderPanel()}
            </div>
        );
    }
}
