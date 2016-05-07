var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Schema는 스키마를 기술하는 키-값 쌍 객체를 받는 생성자 */

//팀스키마 : 팀 이름만 저장
var TeamSchema = new Schema({
    name:{
      type:String,
      required:true
    }
});

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

var Team = mongoose.model('Team', TeamSchema);
var Employee = mongoose.model('Employee', EmployeeSchema);
var db = mongoose.connection;
var dbUrl='mongodb://test:mering@ds013162.mlab.com:13162/meringk'


//팀을 추가하는 함수
function insertTeams (callback){
  Team.create({
    name : 'Product Development'
  },{
    name: 'Dev Ops'
  },{
    name : 'Accounting'
  },function (error, pd, devops, acct){
    if(error){
      return callback(error);
    }else{
      console.info('teams successfully added')
      callback(null, pd, devops, acct);
    }
  });
}

//유저를 추가하는 함수
function insertEmployees (pd, devops, acct, callback){
  Employee.create({
    name : {
      first : 'John',
      last : 'Adams'
    },
    team: pd._id,
    address : {
      lines : ['2 Lincoln Memorial Cir'],
      zip : 20035
    }
  },{
    name : {
      first : 'John2222',
      last : 'Adams2222'
    },
    team: pd._id,
    address : {
      lines : ['2 Lincoln Memorial Cir'],
      zip : 20035
    }
  },{
    name : {
      first : 'mering',
      last : 'kim'
    },
    team: devops._id,
    address : {
      lines : ['222 you arrrl Cir'],
      zip : 1313
    }
  },{
      name : {
        first : 'threeacc',
        last : 'acc'
      },
      team: acct._id,
      address : {
        lines : ['accccc 333 Box Cir'],
        zip : 33333333
      }
    }, function (error, johnadams){
      if(error){
        return callback(error);
      }else{
        console.info('employess successfully added');
        callback(null,{
          team :pd,
          employee:johnadams
        });
      }
    })
}


db.on('error', function(){
  console.log('there was an error');
});

function findUser1(data, callback){
  Employee.findOne({
    _id : data.employee._id         // 키-값 쌍을 받는다. _id가 data.employee._id 와 같은 User 문서 반환﻿
  }).populate('team').exec(function (error, result){    // User 스키마에 team 정보만 제공. exec : 질의 수행﻿
    if(error){
      return callback (error);
    }else{
      console.log(' 팀아이디와 유저아이디가 같은 정보찾기 ');
      console.dir(result);
      callback(null, data);
    }
  });
}

function findUser2(data, callback){
  Employee.find({
  'name.first' : /J/i
  }, function (error, result){
    if(error){
      return callback (error);
    }else{
      console.log(' 이름이 J로 시작하는애 찾기 ');
      console.dir(result);
      callback(null, data);
    }
  });
}


mongoose.connect(dbUrl, function(error){
  if(error){
    return console.log('연결에러'+error);
  }
  console.log('connect');

  insertTeams(function (err, pd, devops, acct){
    if(err){
      return console.log(err)
    }
    insertEmployees(pd, devops, acct, function(err,result){

        console.info('database activity conplete');
      //  console.log(result);
        findUser2(result, function(err, result){
          console.info('검색완료');
          db.close();
          process.exit();
        })


    });
  });
});
/*
  var team=new Team({
    name:'Product Development'
  });
  team.save(function(error,data){
    if(error){
      console.log(error);
    }else{
      console.dir(data);
    }

    db.close();
    process.exit();
  });
*/
