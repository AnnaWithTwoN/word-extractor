import React from 'react';
import TextInput from './TextInput';
import WordsOutput from './WordsOutput';

class Analyzer extends React.Component {
    state = {
        words: [],
        unknown_words: []
    }

    process = (text) => {
        console.log(text)
        let array = text.split(' ')
        console.log(array)
        this.setState({ words: array})
    }

    render(){
        return (
        <div>
            <p>Hello from analyzer</p>
            <TextInput process={ this.process } />
            <WordsOutput words={ this.state.words } />
        </div>
        );
    }
  
}

export default Analyzer;
