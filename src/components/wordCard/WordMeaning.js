import React from 'react'

export class WordMeaning extends React.Component {

    // props: { meaning: object}
    render(){
        return (
            <div>
                <h6>
                    <span>{ this.props.index + 1 }. </span>
                    <small className="font-italic">{ this.props.meaning[0] }, </small>
                    <span>{ this.props.meaning[1] }</span>
                    <span>{ this.props.meaning[3].length === 0 ? '' : ':'}</span>
                </h6>
                
                <ul>
                    { this.props.meaning[3].map((example, index) => (
                        <li key={ index } >{ example }</li>
                    )) }
                </ul>
            </div>
        );
    }
  
}

