import React from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { WordCardBody } from './WordCardBody.js';

// dictionary taken from https://github.com/tusharlock10/Dictionary

class WordCard extends React.Component {
    static contextType = UserContext
    state = {
        translation: '',
        definition: {}
    }

    translate = (word) => {
        //if(this.state.translation !== '') return

        console.log('sending request for', word)
        axios.get(`http://localhost:4000/dictionary/translation/${word}`)
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

    getDefinition = (word) => {
        //if(this.state.definition.meanings) return

        console.log('requesting definition for', word)

        axios.get(`http://localhost:4000/dictionary/definition/${word}`)
        .then(responce => {
            console.log(responce.data)
            this.setState({ 
                definition: responce.data,
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                definition: {
                    error: "Can't find definition in dictionary or other dictionary error occured",
                    word: word
                }
            })
        })
    }

    render(){
        
        return (
            <div className="card bg-light mt-4 mb-4">
                <div className="card-header">
                    <span className="h3 card-title">
                        { this.props.word.original } 
                        <span className="h6 ml-2 text-muted">
                            <small>inf. </small>
                            { this.props.word.infinitive },
                        </span>
                        <span className="h6 ml-1 text-muted font-italic">
                            { this.props.word.part_of_speech }
                        </span>
                    </span>
                    <button 
                        id="dropdownMenuButton"
                        className="btn float-right" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                            <i className="fas fa-ellipsis-h" style={{color: "grey"}}></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href={ `https://dictionary.cambridge.org/dictionary/english/${this.props.word.infinitive}` } target="_blank">Look up in Cambridge dictionary</a>
                    </div>
                </div>

                <WordCardBody 
                    translation={ this.state.translation }
                    definition={ this.state.definition }/>

                <div className="card-footer">
                    <button className="btn btn-success btn-sm mr-2" onClick={ this.getDefinition.bind(this, this.props.word.infinitive) }>Definition</button>
                    <button className="btn btn-success btn-sm mr-2" onClick={ this.translate.bind(this, this.props.word.infinitive) }>Translation</button>
                    { this.context.user.username !== undefined &&
                        (!this.props.known ? 
                        <button className="btn btn-warning btn-sm mr-2" onClick={ this.props.markKnown.bind(this, this.props.word.infinitive) }>I know this word</button> :
                        <button className="btn btn-warning btn-sm mr-2" onClick={ this.markUnknown.bind(this, this.props.word.infinitive) }>I don't know this word</button>)  }
                    <button className="btn btn-danger btn-sm mr-2" onClick={ this.props.hide.bind(this, this.props.word.infinitive) }>Hide</button>
                </div>
            </div>
        );
    }
  
}

export default WordCard;
