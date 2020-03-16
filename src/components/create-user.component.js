import React from "react"
import axios from "axios"

export default class CreateUser extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            flag:true,
        }
        this.onChangeUserName=this.onChangeUserName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChangeUserName(e){
        this.setState(
            {
                username:e.target.value
            }
        );
        axios.get("http://localhost:4000/users")
        .then(res=>{
            var data=res.data;
            for(var i=0;i<data.length;i++)
            {
                if(data[i].username==this.state.username)
                {
                    this.setState({flag:false});
                    document.getElementById("btnSub").disabled=true;
                    document.getElementById("errMsg").innerText="Already Taken"
                    document.getElementById("successMsg").innerText="";
                    break;
                }
                else
                {
                    this.setState({flag:true});
                }
            }
            var check=this.state.flag;
            if(check)
            {
                document.getElementById("btnSub").disabled=false;
                document.getElementById("successMsg").innerText="UserName available"
                document.getElementById("errMsg").innerText="";
            }
            if(this.state.username=='')
            {
                document.getElementById("successMsg").innerText="";
                document.getElementById("btnSub").disabled=true;
            }
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user={
            username:this.state.username,
        }
        console.log(user);
        axios.post('http://localhost:4000/users/add',user)
        .then(res=>console.log(res.data));
       
    }
    render()
    {
        return (
            <div>
            <h1>Create New User</h1>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>UserName:</label>
                    <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName}/>
                   <div id="errMsg" className="alert-danger col-2 mt-2"></div>
                   <div id="successMsg" className="alert-success col-2 mt-2"></div>
                   
                    </div>
                    <div className="form-group">
                        <input id="btnSub" type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                    </form>
                    </div>
        );
    }
}