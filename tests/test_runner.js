const chai = require("chai");
const assert = chai.assert;
const {spawn} = require("child_process");
chai.config.truncateThreshold = 0;

/**
 * runs a test of sidebyside.js, validating 
 * output and stderr
 * 
 * @param done Chai's done function 
 * @param expected the string of expected output
 * @param args an array of arguments to pass to cmd
 * @param cmd the command to run on the terminal
 * @param path the path to the script to execute
*/
const runTest = (
  done, expected, args, 
  cmd="node", path="bin/sidebyside.js"
) => {
  const child = spawn(cmd, [path, ...args]);
  const stdout = [];
  const stderr = [];
  child.stdout.on("data", chunk => 
    stdout.push(chunk.toString())
  );
  child.stderr.on("data", chunk => 
    stderr.push(chunk.toString())
  );
  child.on("close", () => {
    const actual = stdout.join``;
    logFixed(actual, "stdout");
    logFixed(expected, "expected stdout");
    
    if (stderr.length) {
      logFixed(stderr.join``, "stderr");
      assert.fail(
        "Test failed: the child process wrote to stderr."
      );
    }
    
    assert.equal(actual, expected);
    done();
  });
};

/**
 * prints a string of fixed-width content to 
 * the code runner output window.
 *
 * @param text the body of the content to be displayed
 * @param title the string title for the element
 * @param minimize boolean controlling whether to
 *        minimize the output log initially
*/
const logFixed = (text, title="Log", minimize=false) => 
  console.log(
    `<LOG:HTML:${minimize ? "-" : ""}${title}>
     <div style="font-family: monospace; white-space: pre; line-wrap: nowrap;">${text}</div>
    `.replace(/\n/g, "<:LF:>")
  )
;

module.exports = {logFixed, runTest};