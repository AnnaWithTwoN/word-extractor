import React from 'react';
import WordCard from './WordCard'
import { Lemmatizer } from '../javascript-lemmatizer/js/lemmatizer.js';

class WordsOutput extends React.Component {

    render(){
        let lemmatizer = new Lemmatizer();
        //console.log("rendering word output for new", this.props.words);
        return this.props.words.map((word) => (
            <WordCard 
                word={ word }
                word_infinitive = { lemmatizer.lemmas(word).length !== 0 ?  lemmatizer.lemmas(word)[0] : ['', '']}
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
