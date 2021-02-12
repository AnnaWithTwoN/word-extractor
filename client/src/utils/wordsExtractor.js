import { Lemmatizer } from '../javascript-lemmatizer/js/lemmatizer.js'

onmessage = (event) => {
    if (!event) 
        return;

    const text = event.data[0]
    const known_words = event.data[1]

    const array = text
        .replace(/<[^<>]+>/g, '')
        .match(/[a-zA-Z']+/g)
        .filter((value, index, self) => { return self.indexOf(value) === index; }) // remove dublicats

    postMessage(['prog', 10])
    const size = array.length
    let currentProgress = 0.1

    const lemmatizer = new Lemmatizer();
    const unkn = []
    array.forEach((word, index) => {
        if(index/size >= currentProgress){
            currentProgress += 0.25
            postMessage(['prog', 10 + (index/size*90 | 0)])
        }
        const lemmas = lemmatizer.lemmas(word.toLowerCase())
        if(lemmas.length === 0) 
            return

        const infinitive = lemmas[0][0]
        if(known_words &&
            known_words.find(e => { return e === infinitive }) !== undefined) 
            return

        const word_obj = {
            original: word,
            infinitive: infinitive,
            part_of_speech: lemmas[0][1]
        }
        unkn.push(word_obj)
    })
    
    postMessage(['res', unkn])
}