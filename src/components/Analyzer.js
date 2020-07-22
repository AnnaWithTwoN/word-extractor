import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';

class Analyzer extends React.Component {
    state = {
        words: [],
        known_words: localStorage.getItem('known_words') === null ? [] : JSON.parse(localStorage.getItem('known_words')),
        unknown_words: []
    }

    process = (text) => {
        let array = text
                    .replace(/[^a-zA-Z' \n]+/g, '')
                    .replace(/\s\s+/g, ' ')
                    .replace(/^\s*/, '')
                    .replace(/\s*$/, '')
                    .toLowerCase()
                    .split(/\s/)
                    .filter((value, index, self) => { return self.indexOf(value) === index; })
        
        this.setState({ words: array })
        let unkn = array.filter(w => {
            return this.state.known_words.find(e => { return e === w }) === undefined
        })
        //console.log(unkn)
        this.setState({ unknown_words: unkn })
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
                markKnown={ this.markKnown }
                delete={ this.delete }
            />
        </div>
        );
    }
  
}

export default Analyzer;
