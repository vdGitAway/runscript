const { exec } = require('child_process');

//Code
const run = (command, workingDir, ignoreErr)=>{
    return new Promise((resolve, reject)=>{
        const opt = {
            cwd: workingDir,
            timeout: 0
        }
        console.log("RUN: " + command + " FROM: " + workingDir);
        exec(command,opt, (err, stdout, stderr) => {
            if (err) {
              console.log('ERROR!: ', err);
              if(!ignoreErr){
                reject();
                return
              };
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
