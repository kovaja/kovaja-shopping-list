import React from "react";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {ListBody, BODY_TYPES} from '../components/ListBody';

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getClearState(props);
    }
    getClearState(props) {
        return {
            updating: false,
            date: props.data.date ? moment(props.data.date) : moment().add(1, 'days'),
            shop: props.data.shop
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState(this.getClearState(nextProps));
    }
    formatDate(str) {
        if (!str) {
            return 'At the right time...';
        }
        return 'On ' + moment(str).format('MMMM Do YYYY');
    }
    getBodyType() {
        if (this.props.isAddList && !this.state.updating) {
            return BODY_TYPES.ADD;
        }
        return this.state.updating ? BODY_TYPES.UPDATE : BODY_TYPES.SHOW;
    }
    handleChange(event) {
        if (event.target) {
            var data = {};
            data[event.target.name] = event.target.value;
            this.setState(data);
            return;
        }
        this.setState({
            date: event
        });
    }
    update() {
        this.setState({updating: true});
    }
    updateDone() {
        var newDate = this.state.date;
        var newShop = this.state.shop;
        //ADD LIST CLICKED
        if (this.props.isAddList && !this.state.updating) {
            this.setState({updating: true});
            return;
        }
        //SAME VALUES
        if (newDate.format('MMMM Do YYYY') === moment(this.props.data.date).format('MMMM Do YYYY') && newShop === this.props.data.shop) {
            this.setState(this.getClearState(this.props));
            return;
        }
        //INVALID VALUES
        if (!newDate || newDate.diff(moment(), 'days') < 0) {
            newDate = moment();
        }
        if (!newShop) {
            newShop = 'a nice shop';
        }
        //UPDATE
        this.props.update(this.props.data._id, newDate, newShop, this.props.isAddList);
    }
    deleteClicked() {
        if (this.props.isAddList) {
            this.setState({updating: false});
            return;
        }
        if (this.state.updating) {
            this.updateDone();
            return;
        }
        this.props.delete(this.props.data._id);
    }
    open() {
        this.props.open(this.props.data);
    }
    renderHeading() {
        var update = this.state.updating;
        var add = this.props.isAddList;
        if (update) {
            return (
                <div className="panel-heading">
                    <div style={ {float:'left'} }>
                        <DatePicker
                            dateFormat="MMMM Do YYYY"
                            className="form-control shopping-list-datepicker"
                            placeholderText="When ?"
                            selected={this.state.date}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div>
                        <span className="control">
                            <i onClick={this.deleteClicked.bind(this)} className="glyphicon glyphicon-remove"></i>
                        </span>
                    </div>
                </div>
            );
        }

        var label = add ? 'Add new list...' : this.formatDate(this.props.data.date);
        var btns = [];

        if(!add){
            btns.push(<i key="update" onClick={this.update.bind(this)} className="glyphicon glyphicon-pencil"></i>);
        }
        if(!add || update) {
            btns.push(<i key="remove" onClick={this.deleteClicked.bind(this)} className="glyphicon glyphicon-remove"></i>);
        }
        return (
            <div className="panel-heading">
                <div className="panel-label">{label}</div>
                <span className="control">
                    {btns}
                </span>
            </div>   
        );
    }
    renderFooter() {
        if (this.state.updating) {
            return <input className="form-control" onChange={this.handleChange.bind(this)} placeholder="Where ?" name="shop"  value={this.state.shop} type="text" />;
        }
        if(this.props.isAddList) {
            return <div>{'...and don\'t forget anything'}</div>;
        }
        return <div>{'In ' + (this.props.data.shop ? this.props.data.shop : 'some nice shop')}</div>;
    }
    renderBody() {
        var itemsLength = this.props.data.items ? this.props.data.items.length : 0;
        return <ListBody type={this.getBodyType()} items={itemsLength} updateDone={this.updateDone.bind(this)} open={this.open.bind(this)}/>;
    }
    render() {
        return (
            <div className={'col-lg-3 col-md-6 ' + (this.state.updating || this.props.isAddList ? 'edit-list' : '')}>
                <div className={'panel panel-' + (this.props.isAddList ? 'success' : 'primary' )}>
                    {this.renderHeading()}
                    <div className="panel-body">
                        {this.renderBody()}
                    </div>
                    <div className="panel-footer">
                        {this.renderFooter()}
                    </div> 
                </div>
            </div>
        );
    };
};