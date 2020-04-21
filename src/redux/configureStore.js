import {createStore, combineReducers,applyMiddleware} from 'redux';
import Dishes from './dishes';
import {Promotions} from './promotions';
import Leaders from './leaders';
import {Comments} from './comments';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './form';
import {createForms} from 'react-redux-form';
import Feedback from './Contact_feedback';



export const configureStore = ()=>{
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            promotions:Promotions,
            leaders:Leaders,
            comments:Comments,
            contact_feedback : Feedback,
            ...createForms({feedback:InitialFeedback})
        }),
            applyMiddleware( thunk, logger)
            );
    return store;
}

