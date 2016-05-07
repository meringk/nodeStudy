var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var router = express.Router();

//employee 스키마
var EmployeeSchema = new Schema({

  name: {
    first:{
      type:String,
      required:true
    },
    last:{
      type:String,
      required:true
    }
  },

  //다른 문서/스키마에 대한 참조를 생성하는 수단
  team:{
    type: Schema.Types.ObjectId, // team을 위한 값이 몽고디비의 유일한 식별자라는 사실을 알려줌
    ref:'Team'
  },

  image:{
    type:String,
    default:'images/user.png'
  },

  address:{
    lines:{ //문자열배열
      type:[String]
    },
    postal:{  //문자열
      type:String
    }
  }

});

//module.exports = mongoose.model('Employee', EmployeeSchema);

var Employee = mongoose.model('Employee', EmployeeSchema);
console.log(Employee);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function(error,results){
    if(error){
      return next(error);
    }
    res.json(results);
  })
});
function insertEmployees (req, callback){
  console.dir(req);

  Employee.create({
    name : {
      first : req.body.first,
      last : req.body.last
    },
    team: "572aa3cd6731adc01e6a73c2",
    address : {
      lines : ['2 Lincoln Memorial Cir'],
      zip : 20035
    }
  }, function (error){
      if(error){
        return callback(error);
      }else{
        console.info('employess successfully added');
        console.log(req.body.first);
        console.log(req.body.last);

      }
    })
}
router.post('/employees', function(req, res){

   insertEmployees(req, function(err,result){
     console.log(req.body.first);
     console.log('database activity conplete');

   });
   //Employee.first

});

module.exports = router;
