import React from 'react';
import WordsOutput from './WordsOutput';
import { UserContext } from '../contexts/UserContext.js'

class Profile extends React.Component {
    static contextType = UserContext // ~ useContext
    state = {
        user: this.context
    }
  
    markUnknown = (word) => {
        //change state
        //this.setState({ 
        //    known_words: [...this.state.known_words, word], 
        //    unknown_words: this.state.unknown_words.filter(w => { return w !== word })
        //})
        //console.log(this.state.unknown_words)

        //change backend
        //localStorage.setItem('known_words', JSON.stringify(this.state.known_words))
    }

    delete = (word) => {
        //this.setState({ unknown_words: this.state.unknown_words.filter(w => { return w !== word })})
    }

    render() {
        console.log(this.context.user)
        return (
        <div className="container">
            <h2 className="mt-4 mb-4">Profile page</h2>
            <h3>Welcome, { this.context.user.username } </h3>
            <WordsOutput 
                words={ this.context.user.known_words }
                markUnknown={ this.markUnknown }
                delete={ this.delete }
                known={ true }
            />
        </div>
        );
    }
  
}

export default Profile;
