/**
 *   @version 0.0.2
 *   @author Smith, Sierra (sjsmith8147@gmail.com)
 *   @summary Project 6 || created: 11.13.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let salon = [];
let coupon, counter, continueResponse;
const CUST_ID = 0, LAST_NAME = 1, FIRST_NAME = 2, SERVICE_TYPE = 3, COST = 4, TOTAL = 5,
    MANICURE = 25, PEDICURE = 25, MANI_PEDI = 40, HAIRCUT = 35, HAIR_COLOR = 85, COLOR_CUT = 110;

function main() {
    editSalon();
    if (continueResponse == null) {
        setCounter();
        populateSalon();
        printSalon();
    }
    setContinueResponse();
    while (continueResponse === 1) {
        setCounter();
        editSalon();
        setContinueResponse();
    }
    printSalon();
}

main();

function setContinueResponse(){
        continueResponse = Number(PROMPT.question(`\n Do you want to continue? [0 = no, 1 = yes] `));
}

function setCounter() {
    if (typeof counter === 'undefined') {
        counter = 1;
    } else {
        counter++;
    }
}

function populateSalon() {
    const COLUMNS = 7;
    let finished = 0;
    for (let i = 0; i < counter; i++){
        salon[i] = [];
        for (let j = 0; j < COLUMNS; j++){
            if (j=== CUST_ID){
                salon[i][j] = counter;
            } else if (j === LAST_NAME){
                while (typeof salon[i][j] === `undefined` || !/(^[a-z]+$){1,30}/i.test(salon[i][j])){
                    salon[i][j] = PROMPT.question(`\n Please enter last name: `);
                }
            } else if (j === FIRST_NAME){
                while (typeof salon[i][j] === `undefined` || !/(^[a-z]+$){1,30}/i.test(salon[i][j])) {
                    salon[i][j] = PROMPT.question(`\n Please enter first name: `);
                }
            }else if (j === SERVICE_TYPE) {//services
                while (typeof salon[i][j] === `undefined` || salon[i][j] === isNaN) {
                    salon[i][j] = Number(PROMPT.question(`\n Please select service type: 1 = Manicure, 2 = Pedicure, 3 = Mani/Pedi, \n 4 = haircut, 5 = hair color, 6 = color and cut `));
                }
            } else if (j === COST) {//PRICINGS
                if (salon[i][SERVICE_TYPE] === 1){
                    salon[i][j] = MANICURE;
                } else if (salon[i][SERVICE_TYPE] === 2){
                    salon [i][j] = PEDICURE;
                }else if (salon[i][SERVICE_TYPE] === 3){
                    salon[i][j] = MANI_PEDI;
                }else if (salon[i][SERVICE_TYPE] === 4){
                    salon[i][j] = HAIRCUT;
                }else if (salon[i][SERVICE_TYPE] === 5){
                    salon[i][j] = HAIR_COLOR;
                }else{
                    salon[i][j] = COLOR_CUT;
                }
            } else if (j === TOTAL) {
                if (salon[i][j]= isNaN ){
                    salon[i][j] = salon[i][COST];
                } else {
                    salon[i][j] = salon[i][TOTAL] + salon[i][COST];
                }
            } else {
                while (finished === 0 && salon[i][TOTAL] > 750) {
                    salon[i][j] = `\n congrats ${salon[i][LAST_NAME]}, ${salon[i][FIRST_NAME]}! You have received a coupon for a free haircut!`;
                    finished = 1;
                }
            }

        }
    }
}

function editSalon() {
    let choice, whichPerson;
    const LAST_NAME = 1, FIRST_NAME = 2;
    while (typeof choice === `undefined` || choice !== 0 && choice !== 1 && choice){
        choice = Number(PROMPT.question(`\n Would you like to add a new client (1), edit a current client (0)? `));
    }
    if (choice === 0) {
        for (let i = 0; i < salon.length; i++){
            console.log(`${1} = ${salon[i][LAST_NAME]}, ${salon[i][FIRST_NAME]}`);
        }
        while (typeof whichPerson === `undefined`) {
            whichPerson = Number(PROMPT.question(`please select person to edit: `));
        }
        populateSalon(whichPerson - 1);
    } else {
         populateSalon(salon.length++);
    }
}

function printSalon(){
    const COLUMNS = 7;
    for (let i = 0; i < salon.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(`${salon[i][j]}`);
        }
    }
}
