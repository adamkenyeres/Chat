import React, { Component } from 'react';
import './Input.css'
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }
    render() {
        const {placeholder, buttonText} = this.props
        return (
            <div className="Input">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
                        value={this.state.text}
                        type="text"
                        placeholder={placeholder}//"Write message"
                        autoFocus="true" />
                    <button> {buttonText} </button>
                </form>
            </div>
        );
    }
    onChange(e) {
        this.setState({text: e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ""});
        this.props.onSendMessage(this.state.text);
    }
}

export default Input;
