import React from 'react';
import WordCard from './WordCard'

class WordsOutput extends React.Component {

    render(){
        return this.props.words.map((word) => (
            <WordCard 
                word={ word } 
                translate={ this.props.translate }
                markKnown={ this.props.markKnown }
                delete={ this.props.delete }
            />
        ));
    }
  
}

export default WordsOutput;
