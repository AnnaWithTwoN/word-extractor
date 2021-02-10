import React from 'react';

class TextInput extends React.Component {
    state = {
        text : '',
        file: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onFileChosen = (e) => {
        let file = e.target.files[0]

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            //console.log(event.target.result);
            this.setState({ text: event.target.result })
        });
        reader.readAsText(file);
    }

    onSubmit = (e) =>{
        e.preventDefault()
        this.props.process(this.state.text)
    }

    render(){
        return (
        <form onSubmit={ this.onSubmit }>
            <textarea className="form-control mb-3" rows="5" name="text" 
                value={ this.state.text } onChange={ this.onChange }></textarea>
            <div className="form-group">
                <label className="mr-3">Or select a file:</label>
                <input type="file" name="subtitles_file" 
                    value={ this.state.file } onChange={ this.onFileChosen }
                    accept=".srt, .ssa, .ttml, .sbv, .dfxp, .vtt, .txt"/>
            </div>
            <input className="btn btn-primary mb-2" type="submit" name="submit" />
        </form>
        );
    }
}

export default TextInput;
