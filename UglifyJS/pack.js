var config = require("./config.js");
var fs = require('fs');
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

function jsMinifier(flieIn, fileOut) {
    var flieIn = Array.isArray(flieIn) ? flieIn : [flieIn];
    var origCode, ast, finalCode = '';
    for (var i = 0; i < flieIn.length; i++) {
        origCode = fs.readFileSync(flieIn[i], 'utf8');
        ast = jsp.parse(origCode);
        ast = pro.ast_mangle(ast);
        ast = pro.ast_squeeze(ast);
        finalCode += ';' + pro.gen_code(ast);
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

//jsMinifier('./file-src/test2.js', './file-smin/test-min.js');  //单个文件压缩
//jsMinifier(['./np/common.js', './np/itour.ui.datepicker.js'], './test-min.js'); //合并压缩

for (var i in config.script) {
    jsMinifier(config.script[i], i);
}


var cleanCSS = require('clean-css');

function cssMinifier(flieIn, fileOut) {
     var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];
     var origCode,finalCode='';
     for(var i=0; i<flieIn.length; i++) {
        origCode = fs.readFileSync(flieIn[i], 'utf8');
        finalCode += cleanCSS.process(origCode); 
     }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}
 
//cssMinifier('./file-src/indexw_20120913.css', './file-smin/index.css');  //单个文件压缩
//cssMinifier(['./file-src/index_20120913.css','./file-src/indexw_20120913.css'], './file-smin/index.css');

for (var i in config.css) {
    cssMinifier(config.css[i], i);
}