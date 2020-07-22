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
            <textarea className="form-control mb-3" rows="5" name="text" value={ this.state.text } onChange={ this.onChange }></textarea>
            <div className="form-group">
                <label className="mr-3">Or select a file:</label>
                <input type="file" name="subtitles_file"/>
            </div>
            <input className="btn btn-primary" type="submit" name="submit" />
        </form>
        );
    }
  
}

export default TextInput;
