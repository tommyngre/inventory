//display inventory ids, names, prices

//then, 2 prompts
///first, ask ID of product want to buy
///second, how many units

//after customer places order
///check if inventory can accommodate
//// if not, log "Insufficient Quantity!"
//// do not place the order
//// if so, update DB and show total cost

//OPTIONAL/BONUSES
//https://unc.bootcampcontent.com/UNC-Coding-Boot-Camp/UNCHILL201802FSF3-Class-Repository-FSF/blob/master/homework/12-mysql/homework_instructions.md

let inquirer = require('inquirer');
let mysl = require('mysql');