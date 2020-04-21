import * as ActionType from "./ActionType";

const Dishes = (state = {isLoading : true,
                         errMessage : null,
                         dishes : []
                        } , action)=>{
    switch(action.type){
        case ActionType.ADD_DISHES :return {...state , isLoading :false , errMessage: null , dishes : action.payload}

        case ActionType.DISHES_FAILED:return {...state , isLoading :false , errMessage: action.payload}
        
        case ActionType.DISHED_LOADING:return {...state , isLoading :true , errMessage: null , dishes :[]}

        default : return state;
    }
}

export default Dishes;