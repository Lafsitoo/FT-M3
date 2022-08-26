const commands = require("./commands/index");
// commands = {echo:function, date, ls, ...}

const print = function (output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
};

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  let args = data.toString().trim().split(" ");
  let cmd = args.shift();

  if (commands[cmd]) {
    //hasOwnProperty
    commands[cmd](args, print);
  } else {
    print("command not found");
  }

  //   if (cmd === 'echo') {
  //     process.stdout.write(args.join(" "));
  //   }else if(cmd === 'ls') {

  //   }else if(cmd === 'pwd') {

  //   }else if(cmd === 'data'){

  //   }else{
  //     process.stdout.write("command noy found")
  //   }
  process.stdout.write("\nprompt > ");
});
