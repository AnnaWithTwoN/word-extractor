import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';
import axios from 'axios';

class Analyzer extends React.Component {
    state = {
        words: [],
        known_words: localStorage.getItem('known_words') === null ? [] : JSON.parse(localStorage.getItem('known_words')),
        unknown_words: []
    }

    process = (text) => {
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
            unkn.push({
                heading: word,
                translation: ''
            })
        })
        this.setState({ unknown_words: unkn })
        console.log(unkn)
    }
    
    markKnown = (word) => {
        console.log(word)
        //change state
        this.setState({ 
            known_words: [...this.state.known_words, word], 
            unknown_words: this.state.unknown_words.filter(w => { return w !== word })
        })
        //console.log(this.state.unknown_words)

        //change backend
        localStorage.setItem('known_words', JSON.stringify(this.state.known_words))
    }

    delete = (word) => {
        this.setState({ unknown_words: this.state.unknown_words.filter(w => { return w !== word })})
    }

    translate = (word) => {
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
        
    }

    render() {
        return (
        <div>
            <div className="header" style={{ backgroundColor: "#c4c4c4", padding: "20px", marginBottom: "10px"}}>
                <div className="conainer-fluid">
                    <h1> Hello from analyzer</h1>
                </div>
            </div>
            <TextInput process={ this.process } />
            <WordsOutput 
                words={ this.state.unknown_words } 
                translate={ this.translate }
                markKnown={ this.markKnown }
                delete={ this.delete }
            />
        </div>
        );
    }
  
}

export default Analyzer;
