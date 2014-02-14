/**
 * Created with JetBrains WebStorm.
 * User: RAJT430
 * Date: 2/12/14
 * Time: 12:23 AM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express')
    ,stylus = require('stylus')
    ,mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var compile= function(str,path)  {
    return stylus(str).set('filename',path);
}

app.configure(function(){
    app.set('views', __dirname + '/server/views');
    app.set('view engine','jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(stylus.middleware(
        {
          src : __dirname + '/public',
          compile : compile
        })) ;
    app.use(express.static(__dirname+'/public'))  ;

});
if(env==='development'){
    mongoose.connect('mongodb://localhost/multivision');
}else {
    mongoose.connect('mongodb://raj:jsblockdb@ds027519.mongolab.com:27519/jsblockdb');
}

var db = mongoose.connection;

var messageSchema = mongoose.Schema({"message": String}) ;
var Message = mongoose.model('Message',messageSchema);
var mongoMessage ='' ;

Message.findOne().exec(function(err,messageDoc){
    mongoMessage = messageDoc.message;
    console.log(mongoMessage);
});


db.on('error', console.error.bind(console,'connection error...')) ;
db.once('open',function callback(){
    console.log('multivision db opened');
})


app.get("/partials/:partialPath", function(req,res){
    res.render('partials/' + req.params.partialPath);
});

app.get("*", function(req,res){
    res.render('index',{
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log("your server is listening to " + port);


