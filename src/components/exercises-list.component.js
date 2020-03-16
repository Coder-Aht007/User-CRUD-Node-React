import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"


const Exercise=props=>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>

        <td>
            <Link to={"/edit/"+props.exercise._id} >Edit</Link> | <a href="#" onClick={()=>props.deleteExercise(props.exercise._id)}>Delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends React.Component{

    constructor(props)
    {
        super(props);
        this.deleteExercise=this.deleteExercise.bind(this);
        this.state={
            exercises:[],
        }

    }
    componentDidMount()
    {
        axios.get("http://localhost:4000/exercises/")
        .then(res=>{
            this.setState(
              { 
                   exercises:res.data,
              }
            )
        })
    }

    deleteExercise(id)
    {
        axios.delete("http://localhost:4000/exercises/"+id)
        .then(res=>console.log(res.data));
        this.setState({
            exercises:this.state.exercises.filter(elem=>elem._id!==id)
        })
    }

    exercisesList(){
        return this.state.exercises.map(ex=>{
            return <Exercise exercise={ex} deleteExercise={this.deleteExercise} key={ex._id}/>;
        })
    }
    render()
    {
        return (
            <div>
                <h2>Logged Exercises</h2>
               <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration(Minutes)</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.exercisesList()}
                </tbody>
               </table>
            </div>
        );
    }
}