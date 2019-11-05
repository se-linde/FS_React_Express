

import { createStore } from 'redux';
import { defaultState } from '../../server/defaultState'

export const store = createStore(
	
	function reducer(state = defaultState, action){
	
		// Will eventually be a switch statement. 
		return state; 
	
	}	
)