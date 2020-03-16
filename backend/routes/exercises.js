const router=require("express").Router();
let Exercise=require('../models/exercise.model');

router.route('/').get((req,res)=>{
    Exercise.find()
    .then(exercises=>{res.json(exercises)})
    .catch(err=>res.status(400).json("ERROR: "+err));
});

router.route('/add').post((req,res)=>{
    const uName=req.body.username;
    const Desc=req.body.description;
    const Duration=Number(req.body.duration);
    const date=Date.parse(req.body.date);
    const newExercise=new Exercise({"username":uName,"description":Desc,"duration":Duration,"date":date});
    newExercise.save()
    .then(()=>{
        res.json('Exercise Added');
    })
    .catch(
        err=>res.status(400).json("ERROR: "+err)
)
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{res.json(exercise)})
    .catch(err=>{res.json("Error: "+err)});
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>{res.json("Exercise Deleted")})
    .catch(err=>{res.json("Error: "+err)});
});

router.route('/update/:id').post((req,res)=>{
    console.log(req.params.id);
    Exercise.findById(req.params.id)
    .then((exercise)=>{
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=req.body.duration;
        exercise.date=req.body.date;
        exercise.save()
        .then(()=>{res.json("Exercise Updated")})
        .catch((err)=>{res.json("ERROR: "+err )});
    })
    .catch(err=>{res.json("ERROR: "+err )});
});


module.exports=router;


//https://cloud.mongodb.com/v2/5e6bedf4b1b4384ebae2f98a#clusters/detail/MyFirst