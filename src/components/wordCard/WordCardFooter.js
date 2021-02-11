import React from 'react'
import { UserContext } from '../../contexts/UserContext'

export class WordCardFooter extends React.Component {
    static contextType = UserContext

    /* props: { 
        getDefinition: function, 
        translate: function, 
        hide: function,
        markKnown: function,
        markUnknown: function,
        known: boolean
        infinitive: string } */
    render(){
        return (
            <div className="card-footer">

                <button 
                    className="btn btn-success btn-sm mr-2" 
                    onClick={ this.props.getDefinition.bind(this, this.props.infinitive) }>
                        Definition
                </button>

                <button 
                    className="btn btn-success btn-sm mr-2" 
                    onClick={ this.props.translate.bind(this, this.props.infinitive) }>
                        Translation
                </button>

                { this.context.user.username !== undefined &&
                    (!this.props.known ? 
                    <button 
                        className="btn btn-warning btn-sm mr-2" 
                        onClick={ this.props.markKnown.bind(this, this.props.infinitive) }>
                            I know this word
                    </button> :
                    <button 
                        className="btn btn-warning btn-sm mr-2" 
                        onClick={ this.props.markUnknown.bind(this, this.props.infinitive) }>
                            I don't know this word
                    </button>)  }

                <button 
                    className="btn btn-danger btn-sm mr-2" 
                    onClick={ this.props.hide.bind(this, this.props.infinitive) }>
                        Hide
                </button>
            
            </div>
        );
    }
  
}
