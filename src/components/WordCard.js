import React from 'react';

class WordCard extends React.Component {

    render(){
        return (
            <div>
                { this.props.word }
            </div>
        );
    }
  
}

export default WordCard;
