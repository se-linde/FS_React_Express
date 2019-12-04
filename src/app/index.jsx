//console.log("Hello, World!");

// importing the Redux store.

import { store } from './store'

import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/Main';

// Kick the application off and render the React:

ReactDOM.render(

	<Main/>,
	document.getElementById("app")
);

// console.log(store.getState());
