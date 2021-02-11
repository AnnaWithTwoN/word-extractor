import React from 'react'
import { WordMeaning } from './WordMeaning.js'
import { WordExtras } from './WordExtras.js'
import { isEmpty } from '../../utils/utils.js'

export class WordDefinition extends React.Component {

    // props: { definition: object}
    render(){ //check for error
        if(isEmpty(this.props.definition))
            return ''
        else if (this.props.definition.error)
            return (
                <div>
                    <h6>{ this.props.definition.error }</h6>
                    <h6>Try to
                        <a 
                            className="ml-2" 
                            href={ `https://dictionary.cambridge.org/dictionary/english/${this.props.definition.word}` } 
                            target="_blank"
                            rel="noopener noreferrer">look up in Cambridge dictionary</a>
                    </h6>
                </div>
            )
        else
            return (
                <div className="card-definition">
                    { Object.keys(this.props.definition.meanings).length === 0 ? 
                        <h6>No definitions found</h6> :
                        Object.values(this.props.definition.meanings).map((meaning, index) => (
                            <WordMeaning 
                                key={ index } 
                                meaning={ meaning } 
                                index={ index }/>
                        )) }
                    
                    <WordExtras 
                        name="synonyms"
                        extras={ this.props.definition.synonyms } />

                    <WordExtras 
                        name="antonyms"
                        extras={ this.props.definition.antonyms } />

                </div>
            );
    }
  
}
