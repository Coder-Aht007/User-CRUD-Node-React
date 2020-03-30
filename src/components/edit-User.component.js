// import React from "react"
// import DatePicker from "react-datepicker"
// import axios from "axios"
// import "react-datepicker/dist/react-datepicker.css"


// export default class EditExercises extends React.Component{
//     constructor(props)
//     {
//         super(props);
//         this.state={
//             username:'',
//             description:'',
//             duration:0,
//             date:new Date(),
//             users:[]
//         }
//         this.onChangeDate=this.onChangeDate.bind(this);
//         this.onChangeDescription=this.onChangeDescription.bind(this);
//         this.onChangeDuration=this.onChangeDuration.bind(this);
//         this.onChangeUserName=this.onChangeUserName.bind(this);
//         this.onSubmit=this.onSubmit.bind(this);
//     }

//     componentDidMount()
//     {

//         axios.get("http://localhost:4000/exercises/"+this.props.match.params.id)
//         .then(res=>{
//             this.setState({
//                 username:res.data.username,
//                 description:res.data.description,
//                 duration:res.data.duration,
//                 date:new Date(res.data.date),
//             })
//             let arr=[];
//             arr.push(res.data.username);
//             this.setState({users:arr});
//         })

     
//     }
//     onChangeUserName(e)
//     {
//         this.setState(
//             {
//                 username:e.target.value
//             }
//         );
//     }
//     onChangeDuration(e)
//     {
//         this.setState(
//             {
//                 duration:e.target.value
//             }
//         );
//     }

//     onChangeDate(Date)
//     {
//         this.setState(
//             {
//                 date:Date
//             }
//         );
//     }
//     onChangeDescription(e)
//     {
//         this.setState(
//             {
//                 description:e.target.value
//             }
//         );
//     }

//     onSubmit(e)
//     {
//         e.preventDefault();
//         const exercise={
//             username:this.state.username,
//             description:this.state.description,
//             duration:this.state.duration,
//             date:this.state.date
//         }
//         console.log(exercise);
//         axios.post('http://localhost:4000/exercises/update/'+this.props.match.params.id,exercise)
//         .then(res=>console.log(res.data));
//          window.location="/";
//     }
//     render()
//     {
//         return (
//             <div>
//                <h1>EditExecise Log</h1>
//                <form onSubmit={this.onSubmit}>
//                    <div className="form-group">
//                        <label>UserName:</label>
//                        <select ref="userInput"
//                            required
//                            className='form-control'
//                            value={this.state.username}
//                            onChange={this.onChangeUserName}>
//                              {
//                                  this.state.users.map(function(user){
//                                      return <option
//                                      key={user}
//                                      value={user}                                  
//                                      >
//                                     {user}
//                                      </option>
//                                  })
//                              }  
//                        </select>
//                        </div>
//                        <div className="form-group">
//                            <label>Description:</label>
//                            <input type="text"
//                            required
//                            className="form-control"
//                            value={this.state.description}
//                            onChange={this.onChangeDescription}
//                            />
                           
//                        </div>

                       
//                        <div className="form-group">
//                            <label>Duration (In Minutes):</label>
//                            <input type="text"
//                            required
//                            className="form-control"
//                            value={this.state.duration}
//                            onChange={this.onChangeDuration}
//                            />
                           
//                        </div>
                   
                       
//                        <div className="form-group">
//                            <label>Date:</label>
//                           <div>
//                               <DatePicker
//                                 selected={this.state.date}
//                                 onChange={this.onChangeDate}
//                               />
//                           </div>
                           
//                        </div>
//                        <div className="form-group">
//                            <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
//                        </div>
//                </form>
//             </div>
//         );
//     }
// }

import React from "react"
import axios from "axios"

export default class EditUser extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            email:'',
            pass:'',
            Name:'',
            flag:true,
            users:[]
        }
        this.onChangeUserName=this.onChangeUserName.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount()
    {
        
        axios.get("http://localhost:4000/users/"+this.props.match.params.Email)
        .then(res=>{
            console.log(res);
            this.setState({
                username:res.data.result[0].Username,
                Name:res.data.result[0].Name,
                email:res.data.result[0].Email,
                pass:res.data.result[0].Password
             
            })
            let arr=[];
            arr.push(res.data.result[0].Username);
            this.setState({users:arr});
           
        })

     
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
        axios.put('http://localhost:4000/users/update/'+this.props.match.params.Email,user)
        .then(res=>console.log(res.data));  
        window.location="/";
    }
    render()
    {
        return (
            <div>
            <h1>Update Existing User</h1>
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
                        <input id="btnSub" type="submit" value="Update User" className="btn btn-primary"/>
                    </div>
                    </form>
                    </div>
        );
    }
}