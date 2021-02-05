import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';
import axios from 'axios';
import { Prompt } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.js';
import { Lemmatizer } from '../javascript-lemmatizer/js/lemmatizer.js';

class Analyzer extends React.Component {
    static contextType = UserContext
    state = {
        // new_known_words: list<string>
        new_known_words: [],
        // unknown_words: list<object>
        unknown_words: []
    }

    process = (text) => {
        if(text == '') return
        if (this.state.new_known_words.length !== 0){
            this.onLeave()
            this.setState({ new_known_words : [] })
        }
        /*let array = []
        let pattern = /[a-zA-Z']+/g
        do {
            var match = pattern.exec(text)
            if(match){
                var word = {
                    heading: match[0],
                    translation: ''
                }
            }
            array.push(word)
        } while(match)*/

        // source: https://github.com/takafumir/javascript-lemmatizer

        let array = text
            //.replace(/<[a-zA-Z']+>/g, '')
            .replace(/<[^<>]+>/g, '')
            .match(/[a-zA-Z']+/g)
            .filter((value, index, self) => { return self.indexOf(value) === index; }) // remove dublicats
        
        /*let unique_array = array.filter(w => {
            return this.state.known_words.find(e => { return e.toLowerCase() === w.toLowerCase() }) === undefined
        })*/

        let lemmatizer = new Lemmatizer();
        let unkn = []
        array.forEach(word => {
            let lemmas = lemmatizer.lemmas(word.toLowerCase())
            if(lemmas.length === 0) return
            let infinitive = lemmas[0][0]
            if (this.context.user.known_words.find(e => { return e === infinitive }) !== undefined) return
            let word_obj = {
                original: word,
                infinitive: infinitive,
                part_of_speech: lemmas[0][1]
            }
            unkn.push(word_obj)
        })
        this.setState({ unknown_words: unkn })
        console.log(unkn)
    }
    
    markKnown = (word) => {
        console.log(word)

        //change state
        this.setState({ 
            new_known_words: [...this.state.new_known_words, word],
            unknown_words: this.state.unknown_words.filter(w => { return w.infinitive !== word })
        })

        this.context.setUser({ known_words: [...this.context.user.known_words, word],  })
    }

    delete = (word) => {
        this.setState({ unknown_words: this.state.unknown_words.filter(w => { return w.infinitive !== word })})
    }

    onLeave = () => {
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
            <Prompt message={ this.onLeave } />
            <h2 className="mt-4 mb-4">Analyze your text</h2>
            <TextInput process={ this.process } />
            <WordsOutput 
                words={ this.state.unknown_words } 
                //translate={ this.translate }
                markKnown={ this.markKnown }
                known={false}
                delete={ this.delete }
            />
        </div>
        );
    }
  
}

export default Analyzer;
