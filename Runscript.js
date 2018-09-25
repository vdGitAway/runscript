const { spawn } = require('child_process');

//Code
const colorReset = 0
const colorRange = [8, 13]
const colors = 
["\x1b[0m"
,"\x1b[1m"
,"\x1b[2m"
,"\x1b[4m"
,"\x1b[5m"
,"\x1b[7m"
,"\x1b[8m"
,"\x1b[30m"
,"\x1b[31m"
,"\x1b[32m"
,"\x1b[33m"
,"\x1b[34m"
,"\x1b[35m"
,"\x1b[36m"
,"\x1b[37m"
,"\x1b[40m"
,"\x1b[41m"
,"\x1b[42m"
,"\x1b[43m"
,"\x1b[44m"
,"\x1b[45m"
,"\x1b[46m"
,"\x1b[47m"]
const run = (command, workingDir, ignoreErr)=>{
    return new Promise((resolve, reject)=>{
        const opt = {
            cwd: workingDir,
            shell: true
        }
        const ran = Math.floor(Math.random()*6)+8
        console.log(colors[ran], "RUN: " + command + " FROM: " + workingDir);
        let spawner = spawn(command,[],opt);
        spawner.stdout.on('data', function (data) {
            console.log(colors[colorReset]);
            console.log(colors[ran], 'STDOUT(' + command + '): ' + data.toString());
        });
        spawner.stderr.on('data', function (data) {
            console.log('Error: ' + data.toString());
        });
        resolve();
    });
}

//Usage: await builder([command], [working directory], [continue with error])
//Execution is in sequence. To do parallel, remove the await
const main = async ()=>{
    const ngpath = String.raw`C:\Users\Labrat\Front\src\app`;
    const dnpath = './';
    await run('ng build', ngpath);
    await run('dotnet publish -c Release -o out', dnpath)
    await run('docker image rm back --force', dnpath, true);
    await run('docker container rm back --force', dnpath, true);
    await run('docker build --tag back --file dotnetrun.dockerfile .', dnpath);
    await run('docker run --name back -d -p 5000:80 back', dnpath)
}

main();
