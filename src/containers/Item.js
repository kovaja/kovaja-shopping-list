import React from "react";

import {Dropdown} from '../components/Dropdown'

export class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = this.getClearState(props);
    }
    getClearState(props){
        return {
            updating: false,
            name: props.data.name ? props.data.name : '',
            amount: props.data.amount ? props.data.amount : '',
            category: props.data.category ? props.data.category : null
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState(this.getClearState(nextProps));
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
    update(){
        this.setState({updating: true});
    }
    updateDone(){
        var newName = this.state.name;
        var newAmount = this.state.amount;
        var newCategory = this.state.category;
        //ADD ITEM CLICKED
        if(this.props.isAddItem && !this.state.updating){
            this.setState({updating:true});
            return;
        }
        //SAME VALUES
        if(newName === this.props.data.name &&
                newAmount === this.props.data.amount &&
                newCategory._id === (this.props.data.category ? this.props.data.category._id : null))
        {
            this.setState(this.getClearState(this.props));
            return;
        }
        //INVALID VALUES
        if(!newCategory){
            newCategory = {};
            this.props.categories.forEach((cat) => {
               if(cat.name === 'others'){
                   newCategory = cat;
               } 
            });
        }
        if(!newName) {
            newName = 'Something ' + (newCategory.default ? ('from '+newCategory.default) : '');
        }
        if(!newAmount) {
            newAmount = 'At least a little bit';
        }
        this.props.update(this.props.data._id, newName, newAmount, newCategory, this.props.isAddItem);
    }
    deleteClicked(){
        if(this.props.isAddItem){
            this.setState({updating: false});
            return;
        }
        if(this.state.updating){
            this.updateDone();
            return;
        }
        this.props.delete(this.props.data._id);
    }
    renderName(){
        if(this.state.updating){
            return <input
                        className="form-control" onChange={this.handleChange.bind(this)}
                        placeholder="What ?" name="name"  value={this.state.name}
                        type="text"
                   />;
        }
        if(this.props.isAddItem){
            return 'Add new...';
        }
        return this.state.name;
    }
    renderAmount(){
        if(this.state.updating){
            return <input
                        className="form-control" onChange={this.handleChange.bind(this)}
                        placeholder="How much ?" name="amount"  value={this.state.amount}
                        type="text"
                   />;
        }
        if(this.props.isAddItem){
            return null;
        }
        return this.state.amount;
    }
    selectCategory(newCategory){
        this.setState({category: newCategory});
    }
    renderCategory(){
        if(this.state.updating){
            return ( 
                <Dropdown 
                    category={this.state.category ? this.state.category.default : 'Category'}
                    categories={this.props.categories}
                    select={this.selectCategory.bind(this)}
                />
            );
        }
        if(this.props.isAddItem){
            return null;
        }
        return (
            <div className="col-xs-12 col-sm-4">
                {this.state.category.default}
            </div>
        );
    }
    renderControl() {
        var btns = [];

        var update = this.state.updating;
        var add = this.props.isAddItem;

        if(update){
            btns.push(<i key="ok" onClick={this.updateDone.bind(this)} className="glyphicon glyphicon-ok"></i>);
        }
        if (!add && !update) {
            btns.push(<i key="update" onClick={this.update.bind(this)} className="glyphicon glyphicon-pencil"></i>);            
        }
        if(!add || update) {
            btns.push(<i key="remove" onClick={this.deleteClicked.bind(this)} className="glyphicon glyphicon-remove"></i>);
        }
        if(add && !update){
            btns.push(<i key="plus" className="glyphicon glyphicon-plus"></i>);
        }
        
        return btns;
    }
    getItemClassName() {
        var result = 'alert alert-';
        if (!this.props.isAddItem) {
            result += 'info';
        }
        if (this.props.isAddItem) {
            result += 'success';
            if (!this.state.updating) {
                result += ' new-item';
            }
        }
        return result;
    }
    render(){
        return (
            <div
                className={this.getItemClassName()}
                onClick={this.props.isAddItem && !this.state.updating ? this.updateDone.bind(this) : null}
            >
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        {this.renderName()}
                    </div>
                    <div className="col-xs-12 col-sm-2">
                        {this.renderAmount()}
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        {this.renderCategory()}
                    </div>
                    <div className="col-xs-12 col-sm-2">
                        <span className="right">
                            {this.renderControl()}
                        </span>
                    </div>
                </div>
            </div>
        );
    };
};