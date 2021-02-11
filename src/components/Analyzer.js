import React from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext.js'
import TextInput from './TextInput'
import WordsOutput from './WordsOutput'
import Instruction from  './Instruction.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../utils/wordsExtractor.js"

class Analyzer extends React.Component {
    static contextType = UserContext

    wordExtractorWorker = new Worker()
    state = {
        // new_known_words: list<string>
        new_known_words: [],
        // unknown_words: list<object>
        unknown_words: [],
        progress: 0
    }

    process = (text) => {
        if(text === '') 
            return
            
        if(this.state.new_known_words.length !== 0){
            this.saveNewWords()
            this.setState({ new_known_words : [] })
        }

        this.wordExtractorWorker.onmessage = (event) => {
            if(event.data[0] === 'prog'){
                //console.log('progress:', event.data[1])
                this.setState({ progress: event.data[1] })
            }
            else if(event.data[0] === 'res'){
                this.setState({ unknown_words: event.data[1], progress: 0})
            }
        }
        this.wordExtractorWorker.postMessage([text, this.context.user.known_words])
    }
    
    markKnown = (word) => {
        this.setState({ 
            new_known_words: [...this.state.new_known_words, word],
            unknown_words: this.state.unknown_words.filter(w => { return w.infinitive !== word })
        })

        this.context.updateUser({ known_words: [...this.context.user.known_words, word],  })
    }

    hide = (word) => {
        this.setState({ unknown_words: this.state.unknown_words.filter(w => { return w.infinitive !== word })})
    }

    componentDidMount(){
        // add the event handler to catch page leave or refresh 
        // to save new words that were added to known
        window.addEventListener('beforeunload', this.saveNewWords)
    }
  
    componentWillUnmount() {
        this.saveNewWords()
        this.wordExtractorWorker.terminate()

        // remove the event handler for normal unmounting
        window.removeEventListener('beforeunload', this.saveNewWords);
    }

    saveNewWords = () => {
        if(this.context.user.username !== undefined){
            console.log(this.state.new_known_words)
            axios.post(`http://localhost:4000/users/addknown/${this.context.user._id}`, {
                checked_known_words: this.state.new_known_words
            }, { withCredentials: true })
            .then((user) => {
                //this.context.setUser({ user })
            })
            .catch((err) => {
                // handle error - maybe try again or refuse to leave the page
                console.log(err)
            })
        }
        return true
    }

    render() {
        return (
        <div>
            <h2 className="mt-4 mb-4">Analyze your text</h2>
            <p>Upload file or paste text in the text field below
                (it can be an article or a subtitles file, for example) and click "Send"<br/>
                If you are new here, <a href="#instruction" data-toggle="collapse">see the instruction</a></p>

            <div id="instruction" className="collapse">
                <Instruction />
            </div>

            <TextInput process={ this.process } />
            { !!this.state.progress && 
                <div>
                    <span className="spinner-border text-primary"></span>
                    <span className="ml-2">{ this.state.progress + '%' }</span>
                </div> }


            <WordsOutput 
                words={ this.state.unknown_words } 
                markKnown={ this.markKnown }
                known={false}
                hide={ this.hide }
            />
        </div>
        );
    }
  
}

export default Analyzer;
