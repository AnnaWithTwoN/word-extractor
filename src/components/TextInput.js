import React from 'react';

class TextInput extends React.Component {
    state = {
        text : ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) =>{
        e.preventDefault()
        this.props.process(this.state.text)
    }

    render(){
        return (
        <form onSubmit={ this.onSubmit }>
            <input type="text" name="text" value={ this.state.text } onChange={ this.onChange } />
            <input type="submit" name="submit" />
        </form>
        );
    }
  
}

export default TextInput;
