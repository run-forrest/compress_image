const { execSync, exec } = require('child_process')
//本地压缩
//var path = require("path");
//var fs = require("fs");
//var pathName = "{xxx}/drawable-xxhdpi";
//const files = fs.readdirSync(pathName);
//console.log(files);

// 判断是否安装tinypng-cli
try {
    execSync('command -v tinypng')
} catch (e) {
    execSync('npm install -g tinypng-cli')
}

// 获取更改文件列表
const files = execSync(`git diff --name-only --cached --diff-filter=ACM ':(exclude)hook/pre-commit'`)
    .toString('utf-8')
    .split('\n')

const promises = []
files.forEach(item => {
    if (item.endsWith('.png') || item.endsWith('.jpg')) {
    //本地压缩
//        var path =  pathName +"/"+item
        const promise = new Promise((resolve, reject) => {
            exec(`tinypng ${item} -k {tinypng的api key}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }

                if (stderr) {
                    reject(stderr)
                }
                execSync(`git add ${item}`)
                console.log('stdout', stdout)
                resolve(stdout)
            })
        })
        promises.push(promise)
    }
})

Promise.all(promises)
    .then(_ => {
        process.exit(0)
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })
