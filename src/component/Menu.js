import React from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';   
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderDish =({dish})=>{
        return(
            <div  className="col-12 col-md-5  mt-1">
                <Card>
                    <Link to={`/menu/${dish.id}`}>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>                          
                    </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        );
}
const Menu = (props)=>{
    const menu =  props.dishes.dishes.map((dish)=>{
            return <RenderDish key={dish.id} dish={dish} /> 
    });
    if(props.dishes.isLoading){
        return (
            <Loading/>
        );
    }
    else if(props.dishes.errMessage){
        return(
            <h4>{props.dishes.errMessage}</h4>
        );
    }
    else{
        return (
            <div className="container">
                 <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
            
        );
    }
}
export default Menu;