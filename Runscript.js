const { exec } = require('child_process');

//Code
const run = (command, workingDir)=>{
    return new Promise((resolve, reject)=>{
        const opt = {
            cwd: workingDir,
            timeout: 0
        }
        console.log("RUN: " + command + " FROM: " + workingDir);
        exec(command,opt, (err, stdout, stderr) => {
            if (err) {
              console.log(err);
              reject();
              return;
            }
            // the *entire* stdout and stderr (buffered)
            if(stdout){
                console.log(`stdout: ${stdout}`);
            }
            if(stderr){
                console.log(`stderr: ${stderr}`);
            }
            resolve();
        });
    })
}

//Usage: await builder([command], [working directory])
//Execution is in sequence. To do parallel, remove the await
const main = async ()=>{
    await run('ng build', 'C:/Users/labrat/Desktop/Front/src/app');
    await run('dotnet publish -c Release -o out', './')
    await run('docker image rm back --force', './');
    await run('docker build --tag back --file dotnetrun.dockerfile .', './');
    await run('docker run -p 5000:80 back', './')
}

main();
