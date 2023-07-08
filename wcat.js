#!/usr/bin/env node
let fs = require('fs');
let inputArr = process.argv.slice(2);
// console.log(inputArr);


let optionsArr = [];
let filesArr = [];
for(let i = 0 ;i< inputArr.length; i++){
    //identify options and files separately
//anything with - is option
 let firstChar = inputArr[i].charAt(0);
 if(firstChar == '-'){
    optionsArr.push(inputArr[i]);
 } else {
    filesArr.push(inputArr[i]);
 }
}

//edge cases
let both = optionsArr.includes('-n') && optionsArr.includes('-b');
if(both){
    console.log('either enter -n or  -b option not together');
    return;
}
for(let i =0 ; i< filesArr.length; i++){
    let isPresent = fs.existsSync(filesArr[i]);
    if(!isPresent){
        console.log(`file ${filesArr[i]} does not exist`);
        return;
    }
}

//read
let content = "";
for(let i = 0;i < filesArr.length; i++){

//data in buffer
let buffer = fs.readFileSync(filesArr[i]);
content += buffer + "\r\n";
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr);

//-s
let spresent = optionsArr.includes("-s");
if(spresent){
    //leave first apce and remove rest after a statement
    for(let i = 1; i < contentArr.length; i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i] = null;
        } else if (contentArr[i] =="" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr
    // console.log(contentArr);
}

let npresent = optionsArr.includes('-n');
if(npresent){
    // console.log('here');
    for(let i = 0; i< contentArr.length;i++){
contentArr[i] = `${i+1} ${contentArr[i]}`
console.log(contentArr[i]);
    }
    console.log(contentArr.join('\n')); //aray to string
}

let bpresent = optionsArr.includes('-b');
if(bpresent){
    let counter = 1;
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != ''){
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
    console.log(contentArr.join('\n'));
}