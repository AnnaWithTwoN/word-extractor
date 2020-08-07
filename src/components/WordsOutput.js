import React from 'react';
import WordCard from './WordCard'

class WordsOutput extends React.Component {

    render(){
        //console.log("rendering word output for new", this.props.words);
        return this.props.words.map((word) => (
            <WordCard 
                word={ word }
                key={ word } 
                //translate={ this.props.translate }
                markKnown={ this.props.markKnown }
                delete={ this.props.delete }
                known={ this.props.known }
            />
        ));
    }
  
}

export default WordsOutput;
