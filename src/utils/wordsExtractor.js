import { Lemmatizer } from '../javascript-lemmatizer/js/lemmatizer.js';

onmessage = (event) => {
    if (!event) return;

    let text = event.data[0]
    let known_words = event.data[1]

    let array = text
        //.replace(/<[a-zA-Z']+>/g, '')
        .replace(/<[^<>]+>/g, '')
        .match(/[a-zA-Z']+/g)
        .filter((value, index, self) => { return self.indexOf(value) === index; }) // remove dublicats

    postMessage(['prog', 10])
    let size = array.length
    let currentProgress = 0.1

    let lemmatizer = new Lemmatizer();
    let unkn = []
    array.forEach((word, index) => {
        if(index/size >= currentProgress){
            currentProgress += 0.25
            postMessage(['prog', 10 + (index/size*90 | 0)])
        }
        let lemmas = lemmatizer.lemmas(word.toLowerCase())
        //let lemmas = [word.toLowerCase(), 'noun']
        if(lemmas.length === 0) return
        let infinitive = lemmas[0][0]
        if (known_words &&
            known_words.find(e => { return e === infinitive }) !== undefined) return
        let word_obj = {
            original: word,
            infinitive: infinitive,
            part_of_speech: lemmas[0][1]
        }
        unkn.push(word_obj)
    })
    
    postMessage(['res', unkn])
}