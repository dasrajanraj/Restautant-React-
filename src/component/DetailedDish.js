import React,{Component} from 'react';
import {Modal , ModalHeader , ModalBody , Label , Row ,Card,CardImg,CardBody,CardTitle,CardText,BreadcrumbItem,Breadcrumb , Button} from 'reactstrap';
import {Link} from  'react-router-dom';
import {LocalForm , Control , Errors} from 'react-redux-form';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Stagger,Fade} from 'react-animation-components';
const RenderComments=({comments,postComment , dishId})=>{
    
    if(comments != null){
        return(
            <div className="col-12 col-sm-5 mt-5">
                <h2>Comments</h2>
                <Stagger in>
                    {comments.map((comment)=>{
                    return(
                        <Fade in>
                            <div className="my-3" key={comment.id}>
                                <h5>{comment.comment}</h5>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric',month: 'long',day: '2-digit'}).format(new Date(comment.date))}</p>
                            </div>
                        </Fade>
                    );})}
                    <CommentForm dishId={dishId} postComment={postComment} />            
                </Stagger>
            </div>
        );
        
    }
}

const RenderDetailedDish =({dish})=>{
    return(
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card key ={dish.dishId}>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
        </FadeTransform>

    );
}
const DetailedDish = (props)=>{  
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
        );
    }
    else if(props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-sm-5 my-1">
                        <RenderDetailedDish dish ={props.dish}/>
                    </div>
                    <RenderComments comments={props.comments}
                        dishId={props.dishId} postComment={props.postComment} 
                    />
                </div>
            </div>
              
        );
    }else{
        return(<div>

            </div>
        );
    }
}


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : props.modelState
        }
        this.toggleModal  = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen : !this.state.isModalOpen})
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.name, values.comment);
        console.log("comment added");
    }

    render(){
       return(
           <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className = "row">
                            <div className="col-12">
                                <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select
                                         className="form-control"
                                         
                                         name="rating" model=".rating" id="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="name" md={12}> Rating</Label>
                                        <Control.text model=".name"
                                        className="form-control"
                                        name="name"
                                        id = "name"
                                        placeholder ="Your Name"
                                        validators ={{ minLength:minLength(2) , maxLength:maxLength(15) }}/>
                                        <Errors
                                        className="text-danger"
                                        model=".name"
                                        show = "touched"
                                        messages={{
                                            minLength: "Length Must Be greater than 2",
                                            maxLength: "Length Must Be Less Than 15"
                                        }}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment" md={12}> Rating</Label>
                                        <Control.textarea
                                         rows="6"
                                         model=".comment"
                                        className="form-control"
                                        name="comment"
                                        id = "comment"
                                        placeholder =""
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Button color="primary">Submit</Button>
                                    </Row>
                                </LocalForm>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
           </div>
            
       );
    }
}








export default DetailedDish;