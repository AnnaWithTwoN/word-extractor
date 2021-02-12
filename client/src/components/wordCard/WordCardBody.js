import React from 'react'
import { WordDefinition } from './WordDefinition.js'
import { WordTranslation } from './WordTranslation.js'
import { isEmpty } from '../../utils/utils.js'

export class WordCardBody extends React.Component {

    // props: { translation: string, definition: object}
    render(){
        if( this.props.translation === '' &&
            isEmpty(this.props.definition)) 
            return ''
        else
            return (
                <div className="card-body">

                    {/* Definition */}
                    <WordDefinition definition={ this.props.definition } />

                    {/* Line separator */}
                    { this.props.translation !== '' && !isEmpty(this.props.definition) && 
                    <hr></hr> }

                    {/* Translation */}
                    <WordTranslation translation={ this.props.translation } />

                </div>
            );
    }
  
}
