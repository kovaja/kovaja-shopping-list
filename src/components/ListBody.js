import React from "react";

export const BODY_TYPES = {
    UPDATE: 'update_type',
    SHOW: 'show_type',
    ADD: 'add_type'
};
export class ListBody extends React.Component {
    render() {
        if (this.props.type === BODY_TYPES.SHOW) {
            return (
                <div onClick={() => {this.props.open();}} className="col-xs-12 list-body">
                    <div className="col-xs-3">
                        <i className="glyphicon glyphicon-shopping-cart"></i>
                    </div>
                    <div className="col-xs-9 items">
                        <div className="items-number">{this.props.items}</div>
                        <div className="items-label">Items to buy</div>
                    </div>
                </div>
            );
        }
        var icon = this.props.type === BODY_TYPES.ADD ? 'plus' : 'ok';
        if (this.props.type === BODY_TYPES.ADD || this.props.type === BODY_TYPES.UPDATE) {
            return (
                <div onClick={() => {this.props.updateDone();}} className="col-xs-12">
                    <i className={'glyphicon glyphicon-'+icon}></i>
                </div>
            );
        }
    }
};