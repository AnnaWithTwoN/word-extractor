import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../utils/wordsExtractor.js";

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
        if(text === '') return
        if (this.state.new_known_words.length !== 0){
            this.saveNewWords()
            this.setState({ new_known_words : [] })
        }

        this.wordExtractorWorker.onmessage = (event) => {
            if(event.data[0] == 'prog'){
                console.log('progress:', event.data[1])
                this.setState({ progress: event.data[1] })
            }
            else if(event.data[0] == 'res'){
                this.setState({ unknown_words: event.data[1], progress: 0})
            }
        }
        this.wordExtractorWorker.postMessage([text, this.context.user.known_words])
    }
    
    markKnown = (word) => {
        console.log(word)

        //change state
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
        window.addEventListener('beforeunload', this.saveNewWords)
    }
  
    componentWillUnmount() {
        this.saveNewWords()
        this.wordExtractorWorker.terminate()
        window.removeEventListener('beforeunload', this.saveNewWords); // remove the event handler for normal unmounting
    }

    saveNewWords = () => {
        console.log("trying to save user's new words")
        
        if(this.context.user.username !== undefined){
            //var rep = true;
            //while(rep){
                console.log(this.state.new_known_words)
                axios.post(`http://localhost:4000/users/addknown/${this.context.user._id}`, {
                    checked_known_words: this.state.new_known_words
                }, { withCredentials: true })
                .then((user) => {
                    //this.context.setUser({ user })
                })
                .then(() => {
                    //rep = false
                })
                .catch((err) => {
                    console.log("we are dammed")
                })
            //}
        }
        return true
    }

    render() {
        return (
        <div>
            <h2 className="mt-4 mb-4">Analyze your text</h2>
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
