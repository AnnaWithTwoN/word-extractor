import React from 'react';
import WordCard from './WordCard'

class WordsOutput extends React.Component {

    render(){
        return this.props.words.map((word) => (
            <WordCard 
                word={ word }
                key={ word.original } 
                //translate={ this.props.translate }
                markKnown={ this.props.markKnown }
                delete={ this.props.delete }
                known={ this.props.known }
            />
        ));
    }
  
}

export default WordsOutput;
