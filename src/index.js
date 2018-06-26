import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Must import createStore to begin redux store build
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'; // Makes development easier

const counterReducer = (state = 0, action) => {
    // Filter down 
    if(action.type === 'ADD'){
    console.log('Hey, I\'m a reducer!', action, state);
        return state + 1;
    } else if(action.type === 'SUBTRACT'){
        return state - 1;
    }
    return state;
}

const nameChanger = (state, action) => {
    console.log('Second to the party, last to leave!');
    console.log(action, state);
    if(action.type === 'NAME'){
        return {name: action.payload};
    }
    return {name: "Nope"};
}

const colorChanger = (state = [], action) => {
    if(action.type === 'COLOR'){
        return [...state, action.payload];
    } else if(action.type === 'DELETE_COLORS'){
        return [];
    }
    return state;
}

const storeInstance = createStore(
    // This is a reducer.
    combineReducers({
        counterReducer,
        nameChanger,
        colorChanger
    }),
    applyMiddleware(logger)
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
