# Word Extractor
The project is made to allow English learners to improve their listening or reading skills by working through unknown words beforehand.

## Why
The traditional approach of looking up a new word when seeing it for the first time in a text has a weakness - it breaks the flow and shifts attention from mastering the skill to keeping up with a story. This solution allows learners to see and remember unknown words before listening or reading, so they do not have to interrupt later. This results in higher productivity and easier word memorizing.

## How it works
1. User uploads file or pastes text he wants to work on (it can also be subtitles file) and clicks "Send"
2. Client-side JavaScrips processes the text, extracting every word with regex and finds the infinitive form of it using a lemmatizer
3. If a user is logged in, the words are filtered not to contain any word already known to the user
4. For each word user can: see the definition, translation (currently only to Russian) or delete (hide) it from list
5. Registered users can save the word to a list of known words for it not to be shown the next time

## Preview
![Interface](/examples/interface.png)
![Card Example](/examples/card_example.png)


## What is done
- [x] Show infinitive of a word and part of speech
- [x] Provide definition
- [x] Provide translation to Russian
- [x] Option to save a word to known for registered users
- [x] Option to see a word in online Cambridge Dictionary

## More to go
- [ ] Handle contractions and interjections properly
- [ ] Add filtering words based on the chosen level of English knowledge
- [ ] Add user profile
- [ ] Option to add a word to learning set
- [ ] Export the set of unknown words for using in word learning application
- [ ] Deploy this project
- [ ] Add support for offline usage


## Used solutions
1. [English dictionary with words definitions](https://github.com/tusharlock10/Dictionary) by [tusharlock10](https://github.com/tusharlock10), started from [Stackoverflow issue](https://stackoverflow.com/questions/41768215/english-json-dictionary-with-word-word-type-and-definition)
2. [JavaScript Lemmatizer](https://github.com/takafumir/javascript-lemmatizer) by [Takafumi Yamano](https://github.com/takafumir)
3. [ABBYY Lingvo dictionaries API](https://developers.lingvolive.com/en-us/) for translating to the Russian language


# Usage

```sh
$ git clone https://github.com/AnnaWithTwoN/words-extractor.git
```
 or download and extract files
```
$ cd words-extractor/server
$ npm install 
$ npm start
```
and
```
$ cd words-extractor/client
$ npm install 
$ npm start
```
Then open [http://localhost:3000](http://localhost:3000) in the browser to start using it
