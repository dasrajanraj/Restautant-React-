import * as ActionType from './ActionType';

import { baseUrl } from '../shared/baseUrl';



export const addComment = (comment)=>({
    type: ActionType.ADD_COMMENT,
    payload: comment 
   
});

export const postComment =(dishId,rating,author,comment)=>(dispatch)=>{
    var newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl+'comments',{
                method: "POST",
                body: JSON.stringify(newComment),
                headers: {
                "Content-Type": "application/json"
                },
                credentials: "same-origin"
            }
        )
            .then( response=>{
                    if(response.ok){
                        return response;
                    }else{
                        var error = new Error("Error message"+response.status+ response.statusText);
                        error.response= response;
                        return error;
                    }
                },
                error => {
                    throw error;
                }
            )
            .then(response =>{
                    return response.json();
            })
            .then(comment =>{
                    return dispatch(addComment(comment));
            })
            .catch(error=>{
                    return dispatch(commentsFailed(error));
                }
            )
            

}

export const fetchDishes =()=>(dispatch)=>{
                dispatch(dishesLoading(true))

                return  fetch(baseUrl + 'dishes')
                        .then(response => {
                            if (response.ok) {
                            return response;
                            } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                            }
                        },
                        error => {
                                var errmess = new Error(error.message);
                                throw errmess;
                        })
                        .then(response => response.json())
                        .then(dishes => dispatch(addDishes(dishes)))
                        .catch(error => dispatch(dishesFailed(error.message)));
            }
    

export const dishesLoading =()=>({
    type : ActionType.DISHED_LOADING
});

export const dishesFailed =(errMessage)=>({
    type : ActionType.DISHES_FAILED,
    payload : errMessage
});

export const addDishes = (dishes)=>({
        type : ActionType.ADD_DISHES,
        payload : dishes
});

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionType.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionType.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionType.ADD_PROMOS,
    payload: promos
});


export const fetchLeader =()=>(dispatch)=>{ 
    dispatch(loadingLeader());
    return fetch(baseUrl+'leaders')
            .then(response=>{
                if(response.ok){
                    return response;
                }else{
                    var err = new Error("Error Message" + response.status + response.statusText );
                    err.response = response;
                    return err;
                }
            },
                error =>{
                    var errmess = new Error(error.message);
                        throw errmess;
                }
            )
            .then(response=>{
                return response.json();
            })
            .then(leaders=>{
                return dispatch(addLeaders(leaders));
            })
            .catch(error =>{
                    return dispatch(failedLeaders(error));
                }
            );
}

export const addLeaders=(leaders)=>({
    type : ActionType.ADD_LEADERS,
    payload : leaders 
})

export const failedLeaders=(errormess)=>({
    type : ActionType.LEADER_FAILED,
    payload : errormess
})

export const loadingLeader = ()=>({
    type: ActionType.LEADER_LOADING
})

export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message)=>(dispatch)=>{

    const newFeedback ={
        firstname:firstname,
        lastname: lastname,
        telnum : telnum,
        email : email,
        agree : agree,
        contactType : contactType,
        message : message
    }
    newFeedback.date = new Date().toISOString();
    return (
        fetch(baseUrl + 'feedback',{
            method: "POST",
            body: JSON.stringify(newFeedback),
            headers: {
                "Content-Type": "application/json"
                },
                credentials: "same-origin"
            }
        )
        .then(
            response=>{
                if(response.ok){
                    return response;
                }else{
                    var error = new Error("Error Message" + response.status + response.statusText );
                    error.response = response;
                    return error;
                }
            },
                error =>{
                    var errmess = new Error(error.message);
                    throw errmess;
                }
        )
        .then(response=>{
            return response.json();
        })
        .then(feedback =>{
            alert("Thank you for your Feedback !" + JSON.stringify(feedback));
            return dispatch(addFeedback(feedback));
        })
        .catch(error=>{
            return dispatch(failedFeedback(error));
        })
    )
}

export const addFeedback =(feedback) =>({
    type : ActionType.ADD_FEEDBACK
});
export const failedFeedback =(error) => ({
    type : ActionType.FAILED_FEEDBACK,
    payload : error
});

