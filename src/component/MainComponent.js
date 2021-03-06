import React, { Component } from 'react';
import Menu from './Menu';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DetailedDish from './DetailedDish';
import {Switch,Route, Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchLeader,postFeedback, fetchDishes,fetchComments,fetchPromos } from '../redux/ActionCreator';
import {actions} from'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

const mapDispatchToProps = dispatch => ({  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes : ()=> {dispatch(fetchDishes())},
  resetFeedbackForm : ()=>{dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeader: () => dispatch(fetchLeader()),
  postFeedback : (firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))
}); // I have to understand this//


const mapStateToProps= state =>{
  return {
    dishes : state.dishes,
    promotions : state.promotions,
    comments : state.comments,
    leaders : state.leaders,
  }

}

class Main extends Component {
  
componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  this.props.fetchLeader();
}
    

  render(){
    const HomePage =()=>{
      return(
        <Home dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                dishesLoading = { this.props.dishes.isLoading } 
                dishesErr = {this.props.dishes.errMessage}
                promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter(ldr => ldr.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}
        />
      );
    }
    const DishDetail =({match})=>{
      return(
        <DetailedDish dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = { this.props.dishes.isLoading } 
          errMess = {this.props.dishes.errMessage}
          comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          dishId = {parseInt(match.params.dishId,10)}
        />
      );
    }

    return (
      <div className="App">
        <Header/>
        <TransitionGroup>
          <CSSTransition  key={this.props.location.key} classNames="page" timeout={300}>
            <Switch  location={this.props.location}>
              <Route path='/home' component={HomePage}/>
              <Route exact path ='/aboutus' component ={()=> <About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>}/>
              <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>}/>
              <Route path ='/menu/:dishId' component={DishDetail}/>
              <Route exact path='/contactus'component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}  postFeedback={this.props.postFeedback} />} />
              <Redirect to='/home'/>      
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
