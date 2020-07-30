import React from 'react';

class WordCard extends React.Component {

    render(){
        return (
            <div className="card bg-light mt-4 mb-4">
                <div className="card-header">
                    <h3 className="card-title">{ this.props.word.heading }</h3>
                </div>
                <div className="card-body"
                    style={{ display: this.props.word.translation === '' ? "none" : "block"}}>
                    <h5>{ this.props.word.translation }</h5>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success btn-sm mr-2" onClick={ this.props.translate.bind(this, this.props.word.heading) }>Show translation</button>
                    <button className="btn btn-warning btn-sm mr-2" onClick={ this.props.markKnown.bind(this, this.props.word) }>I know this word</button>
                    <button className="btn btn-danger btn-sm mr-2" onClick={ this.props.delete.bind(this, this.props.word) }>Delete</button>
                </div>
            </div>
        );
    }
  
}

export default WordCard;
