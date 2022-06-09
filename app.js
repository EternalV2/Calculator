
// TODO
// Clear screen after showing answer -DONE
// Implement deletion -DONE
// Implement negative numbers 
// Implement order of operations

const btn = [];
let show = [];
let str;
let final;
// UI Elements. str displays show[]. Final is the final Answer.

let char_num1 = [];
let str_num;
let num1;
let char_num2 = [];
let num2;
// Flow of Types: char[] -> str_num -> num1 & num2

// Operations holds all the operations in a boolean array. Access them by index. 
let operations = [];

// char2head keeps track of char_num2;
let char2head = 0;

// Under Construction
let wOperationIndex = [];
let operationIndex = [];

// Makes sure the screen fits the answer. 
let maxStrResult;

// Tells us to start inputting into num2.
let num1Done = false;

// Tells us if the operation is done. 
let operationsDone = false;

// This is for the ANS button.
let answer = 0;
let computedBefore = false;
let aftereq = false;
// Aftereq and computed before differ because after is used to manage resultDisplay

let opList = [];

// Start of Program ----- MAIN --------------------------------------------------------------------------
// Initializes both arrays
for (let i = 0; i < 5; i++) {
    operations[i] = false;
}

for (let i = 0; i < 10; i++) {
    let x = i.toString();
    btn[i] = document.getElementById(x);
}

// Connects UI to backend. 
btn[10] = document.getElementById("*");
btn[11] = document.getElementById("/");
btn[12] = document.getElementById("-");
btn[13] = document.getElementById("+");
btn[14] = document.getElementById(".");
btn[15] = document.getElementById("=");
btn[16] = document.getElementById("ANS");
btn[17] = document.getElementById("sqrt: ");
btn[18] = document.getElementById("^");
btn[19] = document.getElementById("C");
btn[20] = document.getElementById("DEL");
btn[21] = document.getElementById("(-)");


let Display = document.getElementById("Screen");
let resultScreen = document.getElementById("result2");

btn.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.id === "=") {
            //computeSolution(); 
            genComputeSolution();
        }
        else if (e.target.id === "C") {
            clearDisplay(false);
            if (computedBefore && e.target.innerHTML === "C") {
                btn[19].innerHTML = "AC";
            }
        }
        else if (e.target.id === "ANS") {
            setAns();
        }
        else if (e.target.id === "DEL") {
            del();
        }
        else {
            if (aftereq && e.target.id !== "*" && e.target.id !== "/" && e.target.id !== "+" && e.target.id !== "-" && e.target.id !== "^" && e.target.id !== "sqrt: ") {
                clearDisplay(true);
            }
            aftereq = false;
            show.push(e.target.id);
            str = show.join("");
            if (str.length > 16) {
                Display.innerHTML = str.substring(str.length - 16);
            } else {
                Display.innerHTML = str;
            }
            if (computedBefore) {
                answer = final;
                resultScreen.innerHTML = final;
                btn[19].innerHTML = "C";
            }

            // Under Construction ------------------------------------------------------------------------

            if (e.target.id === "*" || e.target.id === "/" || e.target.id === "+" || e.target.id === "-" || e.target.id === "^" || e.target.id === "sqrt: ") {
                operationIndex.push(show[show.length - 1]);
            } else {
                operationIndex.push(null);
            }
        }
    })
})

// Compute Solution is a special case for when there is only one operation. 
function computeSolution(arrCompSol) {
    if (arrCompSol.length == 0) return;
    for (let i = 0; i < arrCompSol.length; i++) {
        if ((arrCompSol[i] === "*" || arrCompSol[i] === "/" || arrCompSol[i] === "+" || arrCompSol[i] === "-") || arrCompSol[i] === "^" || arrCompSol[i] === "sqrt: " && (arrCompSol[i] !== ".")) {
            wOperationIndex = i;
            str_num = char_num1.join("");
            switch (arrCompSol[i]) {
                case "*": operations[0] = true;
                    break;
                case "/": operations[1] = true;
                    break;
                case "+": operations[2] = true;
                    break;
                case "-": operations[3] = true;
                    break;
                case "^": operations[4] = true;
                    break;
                case "sqrt: ": operations[5] = true;
                    break;
            }
            if (!operations[5]) num1 = parseFloat(str_num);
            operationsDone = true;
            if (!operations[5]) num1Done = true;
        } else {
            if (num1Done) {
                if (i > wOperationIndex) {
                    char_num2[char2head++] = arrCompSol[i];
                    str_num = char_num2.join("");
                    num2 = parseFloat(str_num);
                }
            } else {
                if (!operations[5]) char_num1[i] = arrCompSol[i];
                else {
                    char_num1[i - 1] = arrCompSol[i];
                }
            }
        }
    }
    if (operations[0]) {
        final = num1 * num2;
    }
    else if (operations[1]) {
        final = num1 / num2;
    }
    else if (operations[2]) {
        final = num1 + num2;
    }
    else if (operations[3]) {
        final = num1 - num2;
    }
    else if (operations[4]) {
        final = num1 ** num2;
    } else if (operations[5]) {
        str_num = char_num1.join("");
        num1 = parseFloat(str_num);
        final = Math.sqrt(num1);
    }
    if (String(final).length > 16){
        maxStrResult = String(final).substring(0, 16);
        Display.innerHTML = maxStrResult;
    }else{
        maxStrResult = String(final);
        Display.innerHTML = maxStrResult;
    }
    show = Array.from(maxStrResult);
    if (!computedBefore) {
        computedBefore = true;
    }
    //    console.log("Display: " + maxStrResult + "\t" + "Array: " + show + "\t" + "num1: "+ num1 + "\t" + "num2: "+ num2);
    resetVals();
    aftereq = true;
    //operationIndex = [];
    return final;
}

function resetVals() {
    str = show.join(""); // Update goes from str = 1088-9+9 to 1079+9
    num1 = parseFloat(str);
    for (let i = 0; i < operations.length; i++) {
        operations[i] = false;
    }
    for (let i = 0; i < char_num1.length; i++) {
        char_num1[i] = null;
    }
    for (let i = 0; i < char_num2.length; i++) {
        char_num2[i] = null;
    }
    char2head = 0;
    /*for(let i = 0; i < show.length; i++){
        char_num1[i] = show[i];
    }*/
    num1Done = false;
    operationsDone = false;
    num2 = null;
    wOperationIndex = char_num1.length;
    //operationIndex = [];
    operationIndex = operationIndex.splice(-1);
}

function clearDisplay(boolx) {
    show = [];
    //operationIndex = [];
    num1 = null;
    num2 = null;
    wOperationIndex = null;
    char_num1 = [];
    char_num2 = [];
    operationsDone = [];
    str_num = null;
    for (let i = 0; i < operations.length; i++) {
        operations[i] = false;
    }
    char2head = 0;
    num1Done = false;
    operationsDone = false;
    maxStrResult = "";
    Display.innerHTML = show;
    if (btn[19].innerHTML == "AC" && !boolx) {
        answer = 0;
        final = answer;
        resultScreen.innerHTML = "";
        computedBefore = false;
    }
}

function setAns() {
    show.push(answer);
    str = show.join("");
    if (str.length > 16) {
        Display.innerHTML = str.substring(str.length - 16);
    } else {
        Display.innerHTML = str;
    }
}

function del() {
    let x = [];
    for (let i = 0; i < show.length - 1; i++) {
        x[i] = show[i];
    }
    show = x;
    Display.innerHTML = show;
    str = show.join("");
    Display.innerHTML = str;
}

function genComputeSolution() {
    let arrCompSol = [];
    let temp;
    let counter2 = 0;
    let temparr = [];
    let last = false;

    reArrange();

    // CONSTRUCTION ---------------------------------------------------------------------------------------
    /*

    for (let i = 0; i < opList.length + 2; i++) {
        if (i === opList.length) { //try without the 1
            arrCompSol = show.slice();
            last = true;
            console.log("last");
        }
        else {
            arrCompSol = show.slice(0, opList[1]);
        }

        console.log("arrCompSol: " + arrCompSol + "\n" + "show: " + show);
        num1Done = false;

        temp = Array.from(String(computeSolution(arrCompSol)));

        if (!last) {
            // Can replace with splice until opList[1]
            for (let j = 0; j < opList[1]; j++) show[j] = null;
            for (let j = 0; j < show.length; j++) {
                if (show[j] !== null) {
                    temparr[counter2++] = show[j];
                }
            }
        }
        else temparr = [];
        show = temp.concat(temparr);
        setOpIndex();
        console.log("yes " + show);

        temparr = [];
        counter2 = 0;
        // REARANGE METHOD CALLS
        opList = setOpList(opList);
    }
    console.log("Answer: " + show);
    /*show = [];
    resetVals;
    opList=[];
    opIndex=[];
    
    */
    // CONSTRUCTION ---------------------------------------------------------------------------------------

    while (opList.length > 0) {

        if (opList.length == 1) { //try without the 1
            arrCompSol = show.slice();
            last = true;
            console.log("last");
        }
        else {
            arrCompSol = show.slice(0, opList[1]);
        }

        //console.log("arrCompSol: " + arrCompSol + "\n" + "show: " + show);
        num1Done = false;

        temp = new String(computeSolution(arrCompSol));

        if (!last) {
            // Can replace with splice until opList[1]
            // replace with temparr = show.splice(opList[1],show.length-1);
            for (let j = 0; j < opList[1]; j++) show[j] = null;
            for (let j = 0; j < show.length; j++) {
                if (show[j] !== null) {
                    temparr[counter2++] = show[j];
                }
            }
        }
        else temparr = [];
        console.log(temparr);
        temparr.unshift(temp);
        show = temparr;
        console.log(/*"yes " + temp +*/"yes " + show);
        temparr = [];
        counter2 = 0;
        // REARANGE METHOD CALLS
        console.log("Answer: " + show);

        setOpIndex();
        setOpList();

        // CONSTRUCTION ---------------------------------------------------------------------------------------

        // Display Answer
        /*if (String(final).length > 16){
            maxStrResult = String(final).substring(0, 16);
            Display.innerHTML = maxStrResult;
        }else{
            maxStrResult = String(final);
            Display.innerHTML = maxStrResult;
        }*/

    }

}

function setOpList() {
    let counter = 0
    opList = [];
    for (let i = 0; i < operationIndex.length; i++) {
        if (operationIndex[i] !== null) {
            opList.push(i);
            counter++;
        }
    }
}


function setOpIndex() {
    operationIndex = [];
    for (let i = 0; i < show.length; i++) {
        if (show[i] === "*" || show[i] === "/" || show[i] === "+" || show[i] === "-" || show[i] === "^" || show[i] === "sqrt: ") {
            operationIndex.push(show[i]);
        }
        else operationIndex.push(null);
    }
}

function reArrange() {
    // Holds all operations
    setOpIndex();
    // Holds all operation positions
    setOpList();

    console.log(show);
    let Neg;
    let NegArray;
    let NegStr; 
    let tempZ; 
    if (opList[0] == 0) {
        if (operationIndex[0] == "-") {
            NegArray = show.slice(1, opList[1]);
            NegStr = NegArray.join("");
            Neg = -1 * parseFloat(NegStr);
            show = show.slice(opList[1], show.length);
            show.unshift(Neg);
            //console.log(show);
            // Clean Up Show after computing answer:
            // Returns "-18", "-", "1", "8"
        }
    }
    NegArray = [];
    for (let i = 0; i < opList.length - 1; i++) {
        if (opList[i] + 1 == opList[i + 1]) {
            if (operationIndex[i + 1] == "-") {
                NegArray = show.slice(i + 2, opList[i + 2]);
                NegStr = NegArray.join("");
                Neg = -1 * parseFloat(NegStr);
                for (let j = i + 2; j < opList[i + 2]; j++) {
                    show[j] = null;
                }
                for (let j = 0; j < show.length; j++) {
                    if (show[j] != null) {
                        temparr[j] = show[j];
                    }
                }
                console.log(temparr);
                show = temparr.splice(i + 2, 0, Neg);
                Neg = [];
            }
        }
    }
    console.log("reArrange: " + Neg);
    setOpIndex();
    setOpList();
}
//style="background-color:rgb(55, 50, 88)"