var fs = require("fs");
var fpath = require("path");

var dirpath = fpath.join(__dirname);
var root = fpath.join(dirpath);

readDir(fpath.join(root));

function readDir(path) {
    fs.readdir(path, function (err, menu) {
        if (!menu)
            return;
        menu.forEach(function (ele) {
            fs.stat(path + '/' + ele, function (err, info) {
                if (info.isDirectory()) {
                    console.log("dir:" + ele);
                    readDir(path + '/' + ele);
                } else {
                    console.log("file: " + ele);
                    if (fpath.extname(ele) == ".cs") {
                        if (ele != "AssemblyInfo.cs") {
                            var data = fs.readFileSync(path + '/' + ele, 'utf8');
                            var content = '/************************************************' +
                                '\n*Copyright(C): 上海致研智能科技有限公司' +
                                '\n*Author: Jason.Liao' +
                                '\n*Create Time: ' + new Date() +
                                '\n*Description: ' +
                                '\n*' +
                                '\n*Update History:' +
                                '\n*' +
                                '\n************************************************/\n\n';

                            fs.writeFileSync(path + '/' + ele, content + data);
                        }
                    }
                }
            });
        });
    });
}