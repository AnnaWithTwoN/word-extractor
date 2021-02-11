import React from 'react'

export class WordTranslation extends React.Component {

    // props: { translation: string }
    render(){
        if(this.props.translation === '')
            return ''
        else
            return (
                <div className="card-translation" >
                    <h6>
                        <small className="text-muted">рус. </small>
                        { this.props.translation }
                    </h6>
                </div>
            );
    }
  
}
