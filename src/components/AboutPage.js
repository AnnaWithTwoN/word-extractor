import React from 'react'
import Instruction from  './Instruction.js'

export default class AboutPage extends React.Component {

    render(){
        return (
            <div className='container'>
                <h2 className="mt-4">About</h2>

                <h4 className="mt-4">What is this?</h4>
                <p>This is the project made to give an opportunity for English learners 
                    to improve their listening or reading skills through working 
                    through unknown words beforehand.</p>

                <h4>Why?</h4>
                <p>Imagine yourself getting through some article or watching a series: 
                    you are in a flow when suddenly you stumble upon a word you don't
                    know the meaning of. Now you need to break the flow and look the word 
                    up in a dictionary. Ok, you got this one, now you reread the sentence 
                    and ready to move on. But after few seconds BUM - now what does this word mean? 
                    And you need to stop and repeat the whole procedure.</p>
                <p>Our solution allows you to work through unknown words BEFORE you get to paper 
                    or episode - you get the list of words sorted based on your English level 
                    (soon to appear) and already known words. You now can see and 
                    remember the meaning of all unknown words, so when you get to reading or 
                    watching, you do not break the flow while still understanding everything. 
                    This approach saves up time and turns out to be more effective than the one
                    described above - you can focus on mastering reading or listening while 
                    also learning new words.</p>

                <h4>Who can use it?</h4>
                <p>Everybody who wants to improve their English skills</p>

                <h4>How to use it?</h4>
                <Instruction />

                <h4>Contact</h4>
                <p>Contact anna.sidorova.feri@gmail.com for any information</p>
            </div>
        );
    }
  
}

