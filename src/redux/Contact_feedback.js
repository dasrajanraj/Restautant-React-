import * as ActionType from "./ActionType";

const Feedback = (state = {
                         errMessage : null,
                         feedback : {}
                        } , action)=>{
    switch(action.type){
        case ActionType.ADD_FEEDBACK :return {...state ,errMessage: null , feedback :action.payload};

        case ActionType.FAILED_FEEDBACK: return {...state ,errMessage: action.payload }
       
        default : return state;
    }
}

export default Feedback;