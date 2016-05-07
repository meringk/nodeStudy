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

var db = mongoose.connection;
var dbUrl='mongodb://test:mering@ds013162.mlab.com:13162/meringk'

//팀하나 추가
var TeamSchema = new Schema({
  name:{
    type: String,
    required: true
  }
});

var Team = mongoose.model('Team', TeamSchema);
db.on('error', function(){
  console.log('there was an error');
});

mongoose.connect(dbUrl, function(error){
  if(error){
    return console.log('연결에러'+error);
  }


  console.log('connect');

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

});
