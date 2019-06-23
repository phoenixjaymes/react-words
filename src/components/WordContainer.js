import React from 'react';
import PropTypes from 'prop-types';
import Words from './Words';

class WordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: '',
      errorMsg: '',
      type: 'words',
      msgTypeMax: 'Max words are 400',
      quantity: 5,
      maxWords: 400,
      maxSentences: 100,
      maxParagraphs: 15,
    };
  }

  // Fisher–Yates Shuffle
  shuffle = (array) => {
    const newArray = array;
    let m = newArray.length;
    let t;
    let i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * (m -= 1));

      // And swap it with the current element.
      t = newArray[m];
      newArray[m] = newArray[i];
      newArray[i] = t;
    }

    return newArray;
  };

  // Increase the number of words until grater than quantity
  increaseArrayLength = (arrWords, qty) => {
    let newArray = arrWords;
    // Double amount of words
    newArray = newArray.concat(newArray);

    while (newArray.length < qty) {
      // Increase words again if needed
      newArray = this.increaseArrayLength(newArray, qty);
    }

    return newArray;
  };

  // Make words array
  getWordsArray = (data) => {
    const cleanData = data.replace(/,|\.|\?|!/g, '');
    const output = cleanData.split(' ');
    return output;
  };

  // Make list of words
  makeWordsList = () => {
    const { quantity, maxWords } = this.state;
    const { data } = this.props;
    let output = '';
    let outputMsg = '';
    let arrWords = this.getWordsArray(data.words);
    const shuffledWords = this.shuffle(arrWords);

    if (quantity > maxWords) {
      outputMsg = 'Your tried to go over the limit, shame on you';
    }

    // Check if quantity is larger than number of words, double if needed.
    if (arrWords.length < quantity) {
      arrWords = this.increaseArrayLength(arrWords, quantity);
    }

    for (let i = 0; i < quantity; i += 1) {
      if (i === maxWords) {
        break;
      }
      output += `${shuffledWords[i]} `;
    }

    this.setState({
      words: output,
      errorMsg: outputMsg,
    });
  };

  // Make sentences array
  getSentencesArray = (words) => {
    let newWords = words;
    let posEndSlice;
    const sentences = [];

    // Loop while there are words
    while (newWords.length !== 0) {
      const indexes = [];
      indexes.push(newWords.indexOf('.'));
      indexes.push(newWords.indexOf('!'));
      indexes.push(newWords.indexOf('?'));
      indexes.sort((a, b) => a - b);

      // Loop through indexes and get the lowest number
      for (let j = 0; j < indexes.length; j += 1) {
        if (indexes[j] !== -1) {
          posEndSlice = indexes[j];
          break;
        } else {
          posEndSlice = indexes[j];
        }
      }

      // Break while loop if there is no (.!?)
      if (posEndSlice === -1) {
        break;
      }

      // Add sentence to sentences array
      sentences.push(newWords.slice(0, posEndSlice + 1));

      // Create new newWords string minus the sentence that was just removed.
      newWords = newWords.substr(posEndSlice + 1).trim();
    }

    return sentences;
  };

  // Make sentences
  makeSentencesList = () => {
    const { maxSentences, quantity } = this.state;
    const { data } = this.props;
    let output = '';
    let outputMsg = '';
    let arrSentences = this.getSentencesArray(data.words);
    const shuffledSentences = this.shuffle(arrSentences);

    if (quantity > maxSentences) {
      outputMsg = 'Your tried to go over the limit, shame on you';
    }

    // Check is qty is larger than number of words, double if needed.
    if (arrSentences.length < quantity) {
      arrSentences = this.increaseArrayLength(arrSentences, quantity);
    }

    // Loop and add sentence to the string
    for (let i = 0; i < quantity; i += 1) {
      if (i === maxSentences) {
        break;
      }

      output += `${shuffledSentences[i]} `;
    }

    this.setState({
      words: output,
      errorMsg: outputMsg,
    });
  };

  // Make paragraphs
  makeParagraphsList = () => {
    const { quantity, maxParagraphs } = this.state;
    const { data } = this.props;
    let output = [];
    let outputMsg = '';
    const arrSentences = this.getSentencesArray(data.words);

    if (quantity > maxParagraphs) {
      outputMsg = 'Your tried to go over the limit, shame on you';
    }

    // Loop and make paragraphs
    for (let i = 0; i < quantity; i += 1) {
      let strParagraph = '';
      const shuffledSentences = this.shuffle(arrSentences);

      if (i === maxParagraphs) {
        break;
      }

      for (let j = 0; j < 6; j += 1) {
        strParagraph += shuffledSentences[j];
      }

      output += `${strParagraph}-+-`;
    }

    this.setState({
      words: output,
      errorMsg: outputMsg,
    });
  };

  handleQuantity = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  }

  handleType = (e) => {
    const { maxWords, maxParagraphs, maxSentences } = this.state;
    if (e.target.value === 'words') {
      this.setState({
        type: e.target.value,
        words: '',
        errorMsg: '',
        msgTypeMax: `Max words are ${maxWords}`,
      });
    } else if (e.target.value === 'sentences') {
      this.setState({
        type: e.target.value,
        words: '',
        errorMsg: '',
        msgTypeMax: `Max sentences are ${maxSentences}`,
      });
    } else if (e.target.value === 'paragraphs') {
      this.setState({
        type: e.target.value,
        words: '',
        errorMsg: '',
        msgTypeMax: `Max paragraphs are ${maxParagraphs}`,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { type } = this.state;

    if (type === 'words') {
      this.makeWordsList();
    } else if (type === 'sentences') {
      this.makeSentencesList();
    } else if (type === 'paragraphs') {
      this.makeParagraphsList();
    }
  }

  render() {
    const { data } = this.props;
    const {
      quantity, msgTypeMax, type, errorMsg, words,
    } = this.state;

    return (
      <section>
        <h1>
          {data.title}
          Words
        </h1>
        <form className="main-form" onSubmit={this.handleSubmit}>

          <label htmlFor="txtQty">
            <input
              id="txtQty"
              className="main-form__qty"
              type="text"
              value={quantity}
              onChange={this.handleQuantity}
            />
            {`* ${msgTypeMax}`}
          </label>
          <br />

          <label className="main-form__label" htmlFor="radWords">
            <input
              id="radWords"
              type="radio"
              name="wordType"
              value="words"
              checked={type === 'words'}
              onChange={this.handleType}
            />
            &nbsp;Words
          </label>

          <label className="main-form__label" htmlFor="radParagraphs">
            <input
              id="radParagraphs"
              type="radio"
              name="wordType"
              value="sentences"
              checked={type === 'sentences'}
              onChange={this.handleType}
            />
            &nbsp;Sentences
          </label>

          <label className="main-form__label" htmlFor="radSentences">
            <input
              id="radSentences"
              type="radio"
              name="wordType"
              value="paragraphs"
              checked={type === 'paragraphs'}
              onChange={this.handleType}
            />
            &nbsp;Paragraphs
          </label>

          <button className="main-form__btn" type="submit">Generate Words</button>
        </form>
        <Words type={type} data={words} />
        <p className="error">{errorMsg}</p>
      </section>
    );
  }
}
WordContainer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    words: PropTypes.string,
  }),
};

export default WordContainer;
