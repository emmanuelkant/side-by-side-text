/*
 * Use this file to test your script as you see fit. 
 * This file is not included in your final submission.
 */

const chai = require("chai");
const assert = chai.assert;
const {logFixed, runTest} = require("./test_runner");
chai.config.truncateThreshold = 0;

describe("Candidate Test Cases", () => {
  it("should work on anything you wish", done => {
    
    // The output you'd like your script to print 
    const expected = 
`Matsuo Bashô: F     Matsuo Bashô: F     Matsuo Bashô: F
rog Haiku           rog Haiku           rog Haiku      
Translated by J     Translated by N     Translated by S
ane Reichhold       obuyuki Yuasa       arah Isbell    
                                                       
old pond            Breaking the si     Within aging po
a frog jumps in     lence               nd             
to                  Of an ancient p     frogs jumping v
the sound of wa     ond,                ibrate the calm
ter                 A frog jumped i     water’s resonan
                    nto water —         ce             
                    A deep resonanc                    
                    e.                                 
`
    ;
    
    // These are the args passed to your script
    const args = [
      "content/poetry/basho_reichhold.txt",
      "content/poetry/basho_yuasa.txt",
      "content/poetry/basho_isbell.txt",
      "-s", 15, // specify column width
      "-c", 5   // spacify column padding
    ];
    
    // See `./test_runner.js` for details
    runTest(done, expected, args);
    
    /*
    logFixed(
`Here's a handy function to display 
'white-space: pre' formatted text`, 
      "A sample of fixed width output..."
    );
    */
  });
});