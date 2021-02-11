import React from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import { WordCardHeader } from './WordCardHeader.js'
import { WordCardBody } from './WordCardBody.js'
import { WordCardFooter } from './WordCardFooter.js'

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
            console.log(error.message)
            this.setState({ 
                translation :
                    error.response ? 
                    error.response.data.message :
                    error.message, 
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
                    error: 
                        error.response ? 
                        error.response.data.message :
                        error.message,
                    word: word
                }
            })
        })
    }

    render(){
        
        return (
            <div className="card bg-light mt-4 mb-4">
                <WordCardHeader 
                    word={ this.props.word } />

                <WordCardBody 
                    translation={ this.state.translation }
                    definition={ this.state.definition }/>

                <WordCardFooter 
                    getDefinition={ this.getDefinition }
                    translate={ this.translate }
                    hide={ this.props.hide }
                    markKnown={ this.props.markKnown }
                    known={ this.props.known }
                    infinitive={ this.props.word.infinitive } />
            </div>
        );
    }
  
}

export default WordCard;
