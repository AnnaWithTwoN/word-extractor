import React from 'react';
import axios from 'axios';

class WordCard extends React.Component {
    state = {
        translation: ''
    }

    translate = (word) => {
        console.log('sending request for', word)
        axios.get(`http://localhost:4000/dictionary/${word.toLowerCase()}`)
        .then(responce => {
            console.log(responce.data)
            this.setState({ 
                translation: responce.data.Translation,
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({ 
                translation: "Can't find this word in dictionary or other dictionary error occured",
            })
        })
        
    }

    render(){
        return (
            <div className="card bg-light mt-4 mb-4">
                <div className="card-header">
                    <h3 className="card-title">{ this.props.word }</h3>
                </div>
                <div className="card-body"
                    style={{ display: this.state.translation === '' ? "none" : "block"}}>
                    <h5>{ this.state.translation }</h5>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success btn-sm mr-2" onClick={ this.translate.bind(this, this.props.word) }>Show translation</button>
                    <a className="btn btn-success btn-sm mr-2" href={ `https://dictionary.cambridge.org/dictionary/english/${this.props.word}` }>Look up in Cambridge dictionary</a>
                    { !this.props.known ? <button className="btn btn-warning btn-sm mr-2" onClick={ this.props.markKnown.bind(this, this.props.word) }>I know this word</button>
                    : <button className="btn btn-warning btn-sm mr-2" onClick={ this.props.markUnknown.bind(this, this.props.word) }>I don't know this word</button> }
                    <button className="btn btn-danger btn-sm mr-2" onClick={ this.props.delete.bind(this, this.props.word) }>Delete</button>
                </div>
            </div>
        );
    }
  
}

export default WordCard;
