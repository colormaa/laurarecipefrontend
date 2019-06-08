import React from 'react';
import {Link} from 'react-router-dom';
class Dashboard extends React.Component{
    render(){
        return(
            <div className = "dashboard">
                <div className = "dashboard__sidebar">
                    
                    <Link to = "/">Dashboard</Link>
                    <Link to = "/admin/recipecategory">Recipe</Link>
                    <Link to = "/admin/category">Category</Link>
                    <Link to = "/admin/maincategory">Main Category</Link>
                    <Link to = "/">Users</Link>
                    <Link to = "/admin/parse">Parse</Link>
                    
                </div>
                <div className = "dashboard__mainbar">

                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Dashboard;