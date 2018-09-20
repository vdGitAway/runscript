
<h2>About</h2>
This is a NodeJS script that is use to execute CMD commands with working directory. Execution can be in sequentially or parallel. It does not require any dependencies and you only need to add one line per command.

<h2>How to use</h2>
<p>1) Add your command inside the main function with the run function.</p>

<p>2) Run "node Runscript.js" from terminal.</p>

```javascript
const { exec } = require('child_process');

//Code
const run = (command, workingDir)=>{
...
}

//Usage: await builder([command], [working directory])
//Execution is in sequence. To do parallel, remove the await
const main = async ()=>{
    await run('ng build', 'C:/Users/labrat/Desktop/Front/src/app');
    await run('dotnet publish -c Release -o out', './')
    await run('docker image rm back --force', './');
    await run('docker build --tag back --file dotnetrun.dockerfile .', './');
    await run('docker run -d -p 5000:80 back', './')
}

main();
```

<h2>Example explain</h2>
<p>In sequential order:</p>
<p>1) Builds an Angular static files from an external directory.</p>
<p>2) Creates a publish build of a .NET Core application from the current directory.</p>
<p>3) Removes a docker image call "back".</p>
<p>4) Runs a dockerfile call "dotnetrun.dockerfile" from the current directory which will build a new "back" image.</p>
<p>5) Runs the newly created "back" image with publish port 5000 from internal port 80. Also runs detached from terminal.</p>

