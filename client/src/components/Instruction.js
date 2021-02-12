import React from 'react'

export default class Instruction extends React.Component {

    render(){
        return (
                <ol>
                    <li>Upload a file or paste text you want to work on in the text field
                        (it can be an article or subtitles file, for example) and click "Send"</li>
                    <li>The program will extract every word in the text, find its infinitive form and part of speech 
                        {/*and filter them according to your level of language (soon to come)*/}</li>
                    <li>If you are registered, words are filtered not to contain any word you have previously
                        checked as known</li>
                    <li>For each word you can: see the definition, translation (currently only to Russian) 
                        and delete (hide) it from the list. You can also go to see the definition in 
                        Cambridge dictionary by clicking the three dots<i className="fas fa-ellipsis-h mx-2" style={{color: "grey"}}></i>
                        and choosing the relevant option in the dropdown menu</li>
                    <li>If you are registered, you can save the word to the list of known word 
                        by clicking "I know this word" for it not to be shown the next time</li>
                </ol>
        );
    }
  
}

