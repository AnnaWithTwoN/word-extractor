import React from 'react';

export class WordExtras extends React.Component {

    // props: { extras: array<object>, name: string}
    render(){
        if(!this.props.extras)
            return ''
        else
            return (
                <div className={this.props.name}>
                    <span className="h6">{this.props.name}: </span>
                    { (this.props.extras.length === 0 ? <span>-</span> :
                    this.props.extras.map((extra, index) => (
                        <span key={ extra }>
                            <span>{ extra }</span>
                            <span>{ index === this.props.extras.length - 1 ? ' ' : ', '}</span>
                        </span>
                    )))}
                </div>
            );
    }
  
}

