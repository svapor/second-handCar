var fs = require("fs");
var express = require("express");
var app = express();
var url = require("url");


//静态化www文件夹
app.use(express.static("www"));

//引入Car表结构
var Car = require("./models/Car.js");
//引入User表结构
var User = require("./models/User.js");
//连接数据库
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ershouche',{useMongoClient: true});


//相似车接口
app.get("/carlike/:id",(req,res)=>{
    var id = req.params.id;

    Car.find({"id":id}).exec(function(err,data){
        // console.log(id);
        // console.log(data);    
        // console.log(typeof data);  //object

        
        //获得这辆车的品牌和车系
        var brand = data[0].brand;
        var series = data[0].series;
        
        //寻找同品牌同车系并且不是这辆车的
        //K，V一致，省略V
        Car.find({id:{$not:{$eq:id}},brand,series}).exec((err,data)=>{
            // console.log(data);
            res.json({results:data});
            
        })
        
    });

})


// //汽车图片接口
// app.get("/carpic/:id",(req,res)=>{
//     var id = req.params.id;
//     var engine = fs.readdirSync("./www/carimages/"+id+"/engine");
//     var inner = fs.readdirSync("./www/carimages/"+id+"/inner");
//     var more = fs.readdirSync("./www/carimages/"+id+"/more");
//     var view = fs.readdirSync("./www/carimages/"+id+"/view");
    
//     res.json({
//         image:{
//             engine,
//             inner,
//             more,
//             view
//         }
//     })
// })

// //某辆车的信息接口

// app.get("/carinfo/:id",(req,res)=>{
//     var id = req.params.id;
//     Car.find({id}).exec((err,data)=>{
//         res.json({results: data[0]});
//     })
// })


//某辆车的信息接口
app.get("/cars/:id",(req,res)=>{
    var id = req.params.id;

    Car.find({id}).exec((err,data)=>{
        res.json({info: data[0]});
    })
})

//排序和筛选车辆接口
app.get("/cars",(req,res)=>{
    // console.log(url.parse(req.url));
    // console.log(url.parse(req.url,true));
    var query = url.parse(req.url,true).query;
    var page = query.page;  //页码
    var pagesize = query.pagesize; //每页数量
    var sortby = query.sortby;  //排序条件
    var sortdirection = query.sortdirection;   //正序倒序

    //筛选条件
    var dbObj = {};

    //颜色
    if (query.color) {
        // console.log(query.color);            
        // console.log(typeof query.color);        //string
        // console.log(typeof JSON.parse(query.color));        //object
        // console.log(JSON.parse(query.color) instanceof Array);  //true
        dbObj.color = JSON.parse(query.color)
    }

    //排放标准
    if (query.environmental) {
        // console.log('["国二"]');
        // console.log(["国二"]);
        // console.log(JSON.parse('["国二"]'));
        dbObj.environmental = JSON.parse(query.environmental);
        // console.log(query.environmental);
    }

    //排量
    if (query.displacement) {
        dbObj.displacement = JSON.parse(query.displacement);
        // console.log(query.displacement);
    }

    //品牌
    if (query.brand) {
        dbObj.brand = JSON.parse(query.brand);
    }

    //级别
    if (query.type) {
        dbObj.type = JSON.parse(query.type);
    }

    //环保等级
    if (query.environmental) {
        dbObj.environmental = JSON.parse(query.environmental);
    }

    //变速箱
    if(query.gearbox) {
        dbObj.gearbox = JSON.parse(query.gearbox);
    }
    
    //价格
    if (query.price) {
        // console.log(query.price);
        var priceArr = JSON.parse(query.price);
        // console.log(priceArr);
        dbObj.price = {"$gte": priceArr[0],"$lte": priceArr[1]};
    }

    //公里数
    if (query.km) {
        var kmArr = JSON.parse(query.km);
        dbObj.km = {"$gte": kmArr[0],"$lte": kmArr[1]};
    }

    //燃料
    if(query.fuel) {
        dbObj.fuel = JSON.parse(query.fuel);
    }

    // console.log(dbObj);

    Car.count(dbObj,(err,count)=>{
        // console.log(count);
        Car.find(dbObj).sort({[sortby]: sortdirection}).skip((page-1)*pagesize).limit(pagesize).exec(function(err,data) {     
            //skip() 跳过指定数量的数据，接受一个数字参数作为跳过的记录条数。
            //limit(2) //读取指定数量
            //skip()与limit()顺序没有要求，不管怎么放置，执行顺序都是先sort()后skip()最后limit()
            res.json({
                count,
                results: data
            });
        })
    })
})

//用户接口
app.get("/users",(req,res)=>{
    var query = url.parse(req.url,true).query;
    var page = query.page;
    var pagesize = query.pagesize;
    var sortby = query.sortby;
    var sortdirection = query.sortdirection;
    var keyword = query.keyword;
    // console.log(query);
    // console.log(req.url);
    var keywordArr = keyword.split(",");
    
    if (keywordArr.length > 1) {
        //多个条件则且查询
        var searchObj = {
            name: keywordArr.map(item=>new RegExp(item,"g")),
            tel: keywordArr.map(item=>new RegExp(item,"g"))
        }
    
    } else {
        var searchObj = {
            $or: [
                {name: keywordArr.map(item=>new RegExp(item,"g"))},
                {tel: keywordArr.map(item=>new RegExp(item,"g"))}
            ]
        } 
    }

    console.log(searchObj);

    //查询结果条数
    User.count(searchObj,(err,count)=>{
        //查询结果
        User.find(searchObj).sort({[sortby]:sortdirection}).skip(pagesize*(page-1)).limit(pagesize).exec((err,results)=>{
            res.json({count,results});
        })
    })
})


app.listen(3000,(err)=>{
    if(err){
        console.log("服务器开启错误");
    }else{
        console.log("服务器成功开启，在3000端口");
    }
});