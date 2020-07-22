import React from 'react';

class WordCard extends React.Component {

    render(){
        return (
            <div className="card bg-light mt-4 mb-4">
                <div className="card-body">
                    <h3 className="card-title">{ this.props.word }</h3>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success btn-sm mr-2">Show translation</button>
                    <button className="btn btn-warning btn-sm mr-2" onClick={ this.props.markKnown.bind(this, this.props.word) }>I know this word</button>
                    <button className="btn btn-danger btn-sm mr-2" onClick={ this.props.delete.bind(this, this.props.word) }>Delete</button>
                </div>
            </div>
        );
    }
  
}

export default WordCard;
