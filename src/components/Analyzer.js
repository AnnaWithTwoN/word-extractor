import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';

class Analyzer extends React.Component {
    state = {
        words: [],
        known_words: [ "apples"],
        unknown_words: []
    }

    process = (text) => {
        console.log(text)
        let array = text.replace(/[^a-zA-Z' ]+/g, '').replace(/\s\s+/g, ' ').split(' ')
        this.setState({ words: array })
        let unkn = array.filter(w => {
            return this.state.known_words.find(e => { return e === w }) === undefined
        })
        this.setState({ unknown_words: unkn })
    }

    render() {
        return (
        <div>
            <p>Hello from analyzer</p>
            <TextInput process={ this.process } />
            <WordsOutput words={ this.state.unknown_words } />
        </div>
        );
    }
  
}

export default Analyzer;
