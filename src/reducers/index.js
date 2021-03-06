import { ADD_GUESS } from '../actions';

const initialState = {
    guesses: [],
    correctAnswer: Math.round(Math.random() * 100) + 1,
    feedback: 'Make your guess!',
    auralStatus: ''
};

const makeGuess = function(guess) {
    const difference = Math.abs(guess - initialState.correctAnswer);
    let feedback;
    if (difference >= 50) {
      feedback = 'You\'re Ice Cold...';
    } else if (difference >= 30) {  
      feedback = 'You\'re Cold...';
    } else if (difference >= 10) {
      feedback = 'You\'re Warm.';
    } else if (difference >= 1) {
      feedback = 'You\'re Hot!';
    } else {
      feedback = 'You got it!';
    }
    return feedback;
}

const generateAuralUpdate = function(guesses, feedback) {
    // const { guesses, feedback } = initialState;

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
    }
    return auralStatus;
  }

export const guessReducer = (state = initialState, action) => {
    if (action.type === ADD_GUESS) {
        let guesses = [...state.guesses, action.guess];
        let feedback = makeGuess(action.guess)
        return Object.assign({}, state,
             { guesses,
               feedback,
               auralStatus: generateAuralUpdate(guesses, feedback)
            })
    }
}