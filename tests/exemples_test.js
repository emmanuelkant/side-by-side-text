const chai = require("chai");
const assert = chai.assert;
const {runTest} = require("./test_runner");
chai.config.truncateThreshold = 0;

describe("Example Test Cases", () => {
  it("should work when both text files are the same number of rows", done => {
    const expected = 
`Matsuo Bashô: Frog Haiku       Matsuo Bashô: Frog Haiku         
Translated by Kenneth Rexroth  Translated by Tim Chilcott       
                                                                
An old pond —                  ancient is the pond —            
The sound                           suddenly a frog leaps — now!
Of a diving frog.                        the water echoes       
`
    ;
    const args = [
      "content/poetry/basho_rexroth.txt",
      "content/poetry/basho_chilcott.txt"
    ];
    runTest(done, expected, args);
  });
  
  it("should work when the left file is longer than the right", done => {
    const expected = 
`Matsuo Bashô: Frog Haiku                 Matsuo Bashô: Frog Haiku         
Translated by Alfred H. Marks            Translated by Tim Chilcott       
                                                                          
There once was a curious frog            ancient is the pond —            
Who sat by a pond on a log                    suddenly a frog leaps — now!
And, to see what resulted,                         the water echoes       
In the pond catapulted                                                    
With a water-noise heard round the bog.                                   
`
    ;
    const args = [
      "content/poetry/basho_marks.txt",
      "content/poetry/basho_chilcott.txt"
    ];
    runTest(done, expected, args);
  });
  
  it("should work when the right file is longer than the left", done => {
    const expected = 
`Matsuo Bashô: Frog Haiku           Matsuo Bashô: Frog Haiku               
Translated by Tim Chilcott         Translated by Alfred H. Marks          
                                                                          
ancient is the pond —              There once was a curious frog          
     suddenly a frog leaps — now!  Who sat by a pond on a log             
          the water echoes         And, to see what resulted,             
                                   In the pond catapulted                 
                                   With a water-noise heard round the bog.
`
    ;
    const args = [
      "content/poetry/basho_chilcott.txt",
      "content/poetry/basho_marks.txt"
    ];
    runTest(done, expected, args);
  });
  
  it("should work with `-s` size argument passed", done => {
    const expected = 
`Matsuo Bashô: Frog   Matsuo Bashô: Frog 
Haiku                Haiku              
Translated by Kenne  Translated by Alfre
th Rexroth           d H. Marks         
                                        
An old pond —        There once was a cu
The sound            rious frog         
Of a diving frog.    Who sat by a pond o
                     n a log            
                     And, to see what re
                     sulted,            
                     In the pond catapul
                     ted                
                     With a water-noise 
                     heard round the bog
                     .                  
`
    ;
    const args = [
      "content/poetry/basho_rexroth.txt",
      "content/poetry/basho_marks.txt",
      "-s", 19
    ];
    runTest(done, expected, args);
  });
  
  it("should work with `-s`, `-c` and three files", done => {
    const expected = 
`Matsuo Bashô:    Matsuo Bashô:    Matsuo Bashô: 
Frog Haiku       Frog Haiku       Frog Haiku    
Translated by    Translated by    Translated by 
Kenneth Rexrot   Alfred H. Mark   Tim Chilcott  
h                s                              
                                  ancient is the
An old pond —    There once was    pond —       
The sound         a curious fro        suddenly 
Of a diving fr   g                a frog leaps —
og.              Who sat by a p    now!         
                 ond on a log               the 
                 And, to see wh   water echoes  
                 at resulted,                   
                 In the pond ca                 
                 tapulted                       
                 With a water-n                 
                 oise heard rou                 
                 nd the bog.                    
`
    ;
    const args = [
      "content/poetry/basho_rexroth.txt",
      "content/poetry/basho_marks.txt",
      "content/poetry/basho_chilcott.txt",
      "-s", 14, "-c", 3
    ];
    runTest(done, expected, args);
  });
});