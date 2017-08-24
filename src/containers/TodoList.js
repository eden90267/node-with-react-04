import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatButton, List} from "material-ui";
import {bindActionCreators} from "redux";
import actions from "../redux/actions/todoActions";

class TodoList extends Component {

  constructor() {
    super(...arguments);
  }

  send = () => {
    let text = this.inputFiled.value;
    this.props.addTodo(text);
  };

  sendAsync = () => {
    this.props.asyncAction();
  };

  itemClick = () => {
    this.props.itemClick();
  };

  render() {
    return (
      <div>
        <input ref={(c) => this.inputFiled = c}/>
        <button onClick={() => this.send()}>Add</button>
        <button onClick={() => this.sendAsync()}>Async</button>
        <List list={this.props} itemClick={(id) => this.itemClick(id)}>
        </List>
        <FlatButton label="Primary" primary={true} />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTodo: actions.addTodo,
    toggleTodo: actions.toggleTodo,
    asyncAction: actions.asyncAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);