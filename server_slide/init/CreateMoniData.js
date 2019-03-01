var path = require("path");
var fs = require("fs");
var Mock = require ("mockjs");
var Random = Mock.Random;

// fs.readFile("./基数据.json", (err,data)=>{
//     console.log(data.toString());
//     console.log(JSON.parse(data.toString()));
// })

//基数据的绝对路径
var baseDataPath = path.resolve(__dirname,"基数据.json");

//存储生成文件的地址
var moniDataPath = path.resolve(__dirname,"模拟数据.txt"); 

//先删除旧数据
fs.writeFileSync(moniDataPath, "");
console.log("模拟数据已清空，下面为你生成新的")

//读取基数据
fs.readFile(baseDataPath, (err,data)=>{
    var data = JSON.parse(data.toString());
    // console.log(data);

    // data.forEach((item,index)=>{
    //     item.price = ~~(Math.random()*100)+1;
    //     item.km = ~~(Math.random()*100)+1;
    // })

    //遍历data，并为每一项添加新的属性和值
    data.forEach((item)=>{
        item.price = Random.integer(0,100); //售价
        item.km = Random.integer(0,100);    //公里
        item.owner = Random.cname();        //卖家姓名
        //模拟十年的日期(这辆车的当年的购买日期)
        //一天86400000毫秒
        item.buydate = new Date(new Date()-Random.integer(86400000*365,86400000*365*10));
        item.engine = Random.pick(['1.4L','1.6L','1.5T','1.6T','1.8L','2.0L']);   //排量
        item.local = Random.boolean();  //是否本地车
        item.pai = Random.boolean();  //是否上牌

        fs.appendFileSync(moniDataPath, JSON.stringify(item)+"\r\n");
        

    })
        // console.log(new Date(new Date()-Random.integer(86400000*365,86400000*365*10)));
        // console.log(Random.pick(['1.4L','1.6L','1.5T','1.6T','1.8L','2.0L']));
})
