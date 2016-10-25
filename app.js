var ans=null;
var input1 =null;
var input2 =null;
var operator = null;
var memory = 0;
var isNegative = false;
var isDecimal = false;
var inputScreen = document.getElementById("input-screen");
var inputReview = document.getElementById("input-review");
inputScreen.innerHTML="0";
$('button').on("click", function() {
  var val = $(this).html();
  if(inputScreen.innerHTML==="Invalid Input" ||
     inputScreen.innerHTML==="Infinity" ||
     inputScreen.innerHTML==="-Infinity" ||
     inputScreen.innerHTML==="NaN" ||
     inputScreen.innerHTML==="Cannot divide by zero")
  {
    inputScreen.innerHTML = "0";
  }
  if (val.charCodeAt(0)>= 48 && val.charCodeAt(0)<=57 && val.length === 1) {
      if(inputScreen.innerHTML === "0" || ans !== null) {
        inputScreen.innerHTML = "";
        inputScreen.innerHTML=val;
        ans = null;
        input2 = null;
        isDecimal = false;
      } else if (inputScreen.innerHTML.length<20) {
        inputScreen.innerHTML += val;
      }

  } else if ($(this).attr("data-val") == "back") {
        var input = inputScreen.innerHTML;
        var len = input.length;

        if(input.slice(len-1) === ".") isDecimal = false;
        input = input.slice(0,-1);
        if(isNegative) {
          if(len === 2) {
            input = "0";
            isNegative = false;
          }
        } else if(len === 1) {
          input = "0";
        }
        inputScreen.innerHTML = input;

  } else if (val === "CE") {
        inputScreen.innerHTML="0";

  } else if (val === "AC") {
        resetAll();

  } else if (val === "+/-") {
        var input = inputScreen.innerHTML;
        if(ans!==null) {
          if (ans>=0) isNegative = false
          else isNegative = true;
          //ans = null;
        }
        if(isNegative) {
          isNegative = false;
          input = input.slice(1,input.length);
          inputScreen.innerHTML = input;
        } else {
          if(input!=="0") {
            isNegative = true;
            inputScreen.innerHTML="-"+inputScreen.innerHTML;
          }
        }

  } else if ($(this).attr("data-val") == "sqrt" ) {
        var sqrt = Math.sqrt(parseFloat(inputScreen.innerHTML));
        if(sqrt.toString() === "NaN") {
          inputScreen.innerHTML = "Invalid Input";
          inputReview.innerHTML = "";
          resetVar();
        } else {
          inputScreen.innerHTML = sqrt;
          ans = sqrt;
          input2 = ans;
        }

  } else if (val === "%") {
        var input = inputScreen.innerHTML;
        if(input1 === null) {
          ans = parseFloat(input) / 100;
        } else {
          ans = parseFloat(input1) * (parseFloat(input)/100)
          //ans=null;
        }
        //if()
        inputScreen.innerHTML = ans;
        input2 = ans;
  } else if (val === "1/x") {
        var input = inputScreen.innerHTML;
        //alert(input);
        ans = 1/(parseFloat(input));
        inputScreen.innerHTML =ans;
        input2 = ans;
  } else if (val === "MC") {
        memory = 0;
        document.getElementById("mem-stat").innerHTML = "";

  } else if (val === "MR") {
        inputScreen.innerHTML = memory;

  } else if (val === "MS") {
        memory = parseFloat(inputScreen.innerHTML);
        memory ? document.getElementById("mem-stat").innerHTML = "memory":
                document.getElementById("mem-stat").innerHTML = "";
        ans = memory;

  } else if (val === "M+") {
        memory += parseFloat(inputScreen.innerHTML);
        memory ? document.getElementById("mem-stat").innerHTML = "memory":
                document.getElementById("mem-stat").innerHTML = "";
        ans = memory;

  } else if (val === "M-") {
        memory -= parseFloat(inputScreen.innerHTML);
        memory ? document.getElementById("mem-stat").innerHTML = "memory":
                 document.getElementById("mem-stat").innerHTML = "";
        ans = memory;

  } else if (val === "+") {
        operatorResponse("+");

  } else if (val === "-") {
        operatorResponse("-");

  } else if (val === "/") {
        operatorResponse("/");

  } else if (val === "*") {
        operatorResponse("*");

  } else if (val === "=") {
        if(input1 !==null) {
          input2 = inputScreen.innerHTML;
          ans = compute(operator, input1, input2);
          if(ans.toString() == "Infinity" || ans.toString() == "-Infinity")
            inputScreen.innerHTML= "Cannot divide by zero";
          else
            inputScreen.innerHTML= ans;
          input1 = null;
          input2 = null;
          operator = null;
          isDecimal = false;
          inputReview.innerHTML="";
        }

  } else if (val === ".") {
        if(!isDecimal) {
          if(ans!==null) inputScreen.innerHTML = "0";
          inputScreen.innerHTML += ".";
          isDecimal = true;
          ans = null;
        }
  }
  console.log("input1: "+input1);
  console.log("input2: "+input2);
  console.log("operator: "+operator);
  console.log("ans: "+ans);
});

function compute(op, operand1, operand2) {
  switch(op) {
      //(6.4 * 10 - 1.6 * 10) / 10
    case "-": return (parseFloat(operand1)*10 - parseFloat(operand2)*10)/10;
    case "+": return (parseFloat(operand1)*10 + parseFloat(operand2)*10)/10;
    case "/": return parseFloat(operand1) / parseFloat(operand2);
    case "*": return parseFloat(operand1) * parseFloat(operand2);
  }
}

function operatorResponse(op) {
  if(input1 !== null) {
    if (input2 === null) {
      if (ans===null) {
        input2 = inputScreen.innerHTML;
        ans = compute(operator, input1, input2);
        if(ans.toString() !== "Infinity" || ans.toString() !== "-Infinity") {
          input1=ans;
          operator = op;
          inputScreen.innerHTML = ans;
          inputReview.innerHTML += " "+input2+" "+op;
          input2= null;
        } else {
          inputScreen.innerHTML = "Cannot divide by zero";
          inputReview.innerHTML = "";
          resetVar();
        }
      } else {
        operator = op;
        inputReview.innerHTML = (inputReview.innerHTML).slice(0,-1) + op;
      }
    } else {
      ans = compute(operator, input1, input2);
      if(ans.toString() !== "Infinity" || ans.toString() !== "-Infinity") {
        input1=ans;
        operator = op;
        inputScreen.innerHTML = ans;
        inputReview.innerHTML += " "+input2+" "+op;
        input2= null;
      } else {
        inputScreen.innerHTML = "Cannot divide by zero";
        inputReview.innerHTML = "";
        resetVar();
      }
    }
  } else {
    input1 = inputScreen.innerHTML;
    operator = op;
    ans = input1;
    inputReview.innerHTML = ans+" "+op;
  }
  isNegative = false;
  isDecimal = false;
  var l = inputReview.innerHTML.length;

  if (l>44) {
    inputReview.innerHTML = (inputReview.innerHTML).slice(l-44, l);
  }
}

function resetAll() {
    ans=null;
    input1 =null;
    input2 =null;
    operator=null;
    isDecimal = false;
    isNegative = false;
    inputScreen.innerHTML="0";
    inputReview.innerHTML="";
}
function resetVar() {
    ans=0;
    input1 =null;
    input2 =null;
    operator=null;
    isNegative = false;
    isDecimal = false;
}
