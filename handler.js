var fs = require('fs');
var formater= require('./cssFormater');

//处理字符情况
function replaceHandler (str) {
    return str.replace(/\n/g, '').replace(/\/\*.*\*\//g, '');

}

function convertStrToObj (str) {
    var objArr = str.replace(/[{}]/g, '').split(",").filter(e => e != 0);
    var result = {}
    objArr.map(e => { let [key, value] = e.split(":"); result[key.trim()] = value.trim()} );
   return result;
}

//替换字符串为对象
function replaceStrToObj (obj) {
    for (let prop in obj) {
       let str = obj[prop].replace(/;/g,',')
        obj[prop] =  convertStrToObj(str)
    }
    console.log(obj)
}
//读取字符串入口
function goEntrance (dataParse) {
    var temp = {};
    var tempKey = '';
    //开始 结束位置
    var startIdx = 0, lastIdx = 0;
    for (let i = 0; i < dataParse.length; i++) {
        if (dataParse[i] == '{') {
            startIdx = i;
            tempKey = replaceHandler(dataParse.slice(lastIdx, startIdx)).trim();
            lastIdx = startIdx;
        }
        if (dataParse[i] == '}') {
            startIdx = i;
            temp[tempKey] = replaceHandler(dataParse.slice(lastIdx, startIdx + 1));
            lastIdx = startIdx + 1;
        }

    }

    replaceStrToObj(temp);

}

fs.readFile('./test/deal.css', function (err, data) {
    // 读取文件失败/错误
    if (err) {
        throw new Error("文件取读失败");
    }
    // 读取文件成功 
    const dataParse = formater.formatCSSText(data.toString()) ;
    goEntrance(dataParse);
  
});