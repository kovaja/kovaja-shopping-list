import React from "react";

export class Dropdown extends React.Component {
    render() {
        return (
            <div className="dropdown semi-right">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    {this.props.category}
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {this.props.categories
                            .sort((a,b) => {
                                return a.order > b.order;
                            })
                            .map((category)=>{
                                return <li onClick={() => {this.props.select(category);}} key={category._id}><a>{category.default}</a></li>;
                            })}
                </ul>
            </div> 
        );
    }
};