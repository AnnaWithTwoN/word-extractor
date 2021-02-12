import React from 'react'

export class WordCardHeader extends React.Component {

    /* props: { word: object} */
    render(){
        return (
            <div className="card-header">

                    <span className="h3 card-title">
                        { this.props.word.original } 
                        <span className="h6 ml-2 text-muted">
                            <small>inf. </small>
                            { this.props.word.infinitive },
                        </span>
                        <span className="h6 ml-1 text-muted font-italic">
                            { this.props.word.part_of_speech }
                        </span>
                    </span>

                    {/* Three dot button aka dropdown-menu button */}
                    <button 
                        id="dropdownMenuButton"
                        className="btn float-right" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                            <i className="fas fa-ellipsis-h" style={{color: "grey"}}></i>
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a 
                            className="dropdown-item" 
                            href={ `https://dictionary.cambridge.org/dictionary/english/${this.props.word.infinitive}` } 
                            target="_blank"
                            rel="noopener noreferrer">Look up in Cambridge dictionary</a>
                    </div>
                </div>
        );
    }
  
}
