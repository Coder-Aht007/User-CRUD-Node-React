import React from "react"
import axios from "axios"

export default class CreateUser extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            email:'',
            pass:'',
            Name:'',
            flag:true,
        }
        this.onChangeUserName=this.onChangeUserName.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
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
            var data=res.data.result;
            for(var i=0;i<data.length;i++)
            {
                if(data[i].Username==this.state.username)
                {
                    this.setState({flag:false});
                    document.getElementById("btnSub").disabled=true;
                    document.getElementById("UerrMsg").innerText="Already Taken"
                    document.getElementById("UsuccessMsg").innerText="";
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
                document.getElementById("UsuccessMsg").innerText="UserName available"
                document.getElementById("UerrMsg").innerText="";
            }
            if(this.state.username=='')
            {
                document.getElementById("UsuccessMsg").innerText="";
                document.getElementById("btnSub").disabled=true;
            }
        })
    }
    onChangeName(e)
    {
        this.setState(
            {
                Name:e.target.value
            }
        );
    }

    onChangeEmail(e)
    {
        this.setState(
            {
                email:e.target.value
            }
        );
        axios.get("http://localhost:4000/users")
        .then(res=>{
            var data=res.data.result;
            for(var i=0;i<data.length;i++)
            {
                if(data[i].Email==this.state.email)
                {
                    this.setState({flag:false});
                    document.getElementById("btnSub").disabled=true;
                    document.getElementById("EerrMsg").innerText="Email Already Registered"
                    document.getElementById("EsuccessMsg").innerText="";
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
                document.getElementById("EsuccessMsg").innerText="Email available"
                document.getElementById("EerrMsg").innerText="";
            }
            if(this.state.email=='')
            {
                document.getElementById("EsuccessMsg").innerText="";
                document.getElementById("btnSub").disabled=true;
            }
        })
    }

    onChangePassword(e)
    {
        this.setState(
            {
                pass:e.target.value
            }
        ); 
    }

    onSubmit(e){
        e.preventDefault();
        const user={
            name:this.state.Name,
            username:this.state.username,
            pass:this.state.pass,
            email:this.state.email,
        }
        console.log(user);
        axios.post('http://localhost:4000/users/add',user)
        .then(res=>console.log(res.data));  
        window.location="/";
    }
    render()
    {
        return (
            <div>
            <h1>Create New User</h1>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                    <label>Name:</label>
                    <input type="text" required className="form-control" value={this.state.Name} onChange={this.onChangeName}/>
                   
                    </div>
                <div className="form-group">
                    <label>UserName:</label>
                    <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUserName}/>
                   <div id="UerrMsg" className="alert-danger col-2 mt-2"></div>
                   <div id="UsuccessMsg" className="alert-success col-2 mt-2"></div>
                   
                    </div>
                    <div className="form-group">
                    <label>Email:</label>
                    <input type="email" required className="form-control" value={this.state.email} onChange={this.onChangeEmail}/>
                   <div id="EerrMsg" className="alert-danger col-2 mt-2"></div>
                   <div id="EsuccessMsg" className="alert-success col-2 mt-2"></div>
                   
                    </div>

                    <div className="form-group">
                    <label>Password:</label>
                    <input type="password" required className="form-control" value={this.state.pass} onChange={this.onChangePassword}/>
                   
                    </div>
                    <div className="form-group">
                        <input id="btnSub" type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                    </form>
                    </div>
        );
    }
}