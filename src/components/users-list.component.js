import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"


const Users=props=>(
    <tr>
        <td>{props.user.Name}</td>
        <td>{props.user.Username}</td>
        <td>{props.user.Email}</td>

        <td>
            <Link to={"/update/"+props.user.Email} >Update</Link> | <a href="#" onClick={()=>props.deleteUser(props.user.Email)}>Delete</a>
        </td>
    </tr>
)

export default class UserList extends React.Component{

    constructor(props)
    {
        super(props);
        this.deleteUser=this.deleteUser.bind(this);
        this.state={
            users:[],
        }

    }
    componentDidMount()
    {
        axios.get("http://localhost:4000/users/")
        .then(res=>{
            this.setState(
              { 
                   users:res.data.result,
              }
            )
        })
    }

    deleteUser(Email)
    {
        axios.delete("http://localhost:4000/users/"+Email)
        .then(res=>console.log(res.data));
        this.setState({
           users:this.state.users.filter(elem=>elem.Email!==Email)
        })

    }

    UsersList(){
        return this.state.users.map(user=>{
            return <Users user={user} deleteUser={this.deleteUser} key={user.Email}/>;
        })
    }
    render()
    {
        return (
            <div>
                <h2>View All Users</h2>
               <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.UsersList()}
                </tbody>
               </table>
            </div>
        );
    }
}