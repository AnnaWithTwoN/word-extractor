import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';
import axios from 'axios';
import { Prompt } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.js';

class Analyzer extends React.Component {
    static contextType = UserContext
    state = {
        words: [],
        known_words: this.context.user.username === undefined ? ["one"] : this.context.user.known_words,
        new_known_words: [],
        unknown_words: []
    }

    process = (text) => {
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

        let array = text
            .replace(/<[a-zA-Z']+>/g, '')
            .match(/[a-zA-Z']+/g)
            .filter((value, index, self) => { return self.indexOf(value) === index; })
        
        //this.setState({ words })
        let unique_array = array.filter(w => {
            return this.state.known_words.find(e => { return e.toLowerCase() === w.toLowerCase() }) === undefined
        })
        let unkn = []
        unique_array.forEach(word => {
            unkn.push(word)
        })
        this.setState({ unknown_words: unkn })
        console.log(unkn)
    }
    
    markKnown = (word) => {
        console.log(word)
        word = word.toLowerCase()

        //change state
        this.setState({ 
            known_words: [...this.state.known_words, word], 
            new_known_words: [...this.state.new_known_words, word],
            unknown_words: this.state.unknown_words.filter(w => { return w.toLowerCase() !== word })
        })

        this.context.setUser({ known_words: [...this.context.user.known_words, word],  })
    }

    delete = (word) => {
        this.setState({ unknown_words: this.state.unknown_words.filter(w => { return w !== word })})
    }

    /*translate = (word) => {
        console.log('sending request for', word)
        axios.get(`http://localhost:4000/dictionary/${word.toLowerCase()}`)
        .then(responce => {
            console.log(responce.data)
            this.setState({ 
                unknown_words: this.state.unknown_words.map(w => {
                    if(w.heading === word){
                        w.translation = responce.data.Translation
                    }
                    return w;
                })
            
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({ 
                unknown_words: this.state.unknown_words.map(w => {
                    if(w.heading === word){
                        w.translation = "Can't find this word in dictionary or other dictionary error occured"
                    }
                    return w;
                })
            
            })
        })
        
    }*/

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
        console.log("rendering analyzer for new", this.state.known_words);
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
