import React from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"


export default class EditExercises extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeUserName=this.onChangeUserName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount()
    {

        axios.get("http://localhost:4000/exercises/"+this.props.match.params.id)
        .then(res=>{
            this.setState({
                username:res.data.username,
                description:res.data.description,
                duration:res.data.duration,
                date:new Date(res.data.date),
            })
            let arr=[];
            arr.push(res.data.username);
            this.setState({users:arr});
        })

     
    }
    onChangeUserName(e)
    {
        this.setState(
            {
                username:e.target.value
            }
        );
    }
    onChangeDuration(e)
    {
        this.setState(
            {
                duration:e.target.value
            }
        );
    }

    onChangeDate(Date)
    {
        this.setState(
            {
                date:Date
            }
        );
    }
    onChangeDescription(e)
    {
        this.setState(
            {
                description:e.target.value
            }
        );
    }

    onSubmit(e)
    {
        e.preventDefault();
        const exercise={
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }
        console.log(exercise);
        axios.post('http://localhost:4000/exercises/update/'+this.props.match.params.id,exercise)
        .then(res=>console.log(res.data));
         window.location="/";
    }
    render()
    {
        return (
            <div>
               <h1>EditExecise Log</h1>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>UserName:</label>
                       <select ref="userInput"
                           required
                           className='form-control'
                           value={this.state.username}
                           onChange={this.onChangeUserName}>
                             {
                                 this.state.users.map(function(user){
                                     return <option
                                     key={user}
                                     value={user}                                  
                                     >
                                    {user}
                                     </option>
                                 })
                             }  
                       </select>
                       </div>
                       <div className="form-group">
                           <label>Description:</label>
                           <input type="text"
                           required
                           className="form-control"
                           value={this.state.description}
                           onChange={this.onChangeDescription}
                           />
                           
                       </div>

                       
                       <div className="form-group">
                           <label>Duration (In Minutes):</label>
                           <input type="text"
                           required
                           className="form-control"
                           value={this.state.duration}
                           onChange={this.onChangeDuration}
                           />
                           
                       </div>
                   
                       
                       <div className="form-group">
                           <label>Date:</label>
                          <div>
                              <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                              />
                          </div>
                           
                       </div>
                       <div className="form-group">
                           <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                       </div>
               </form>
            </div>
        );
    }
}