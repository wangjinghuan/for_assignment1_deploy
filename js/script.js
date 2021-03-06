var table = document.getElementById("board");
var cell;

//cellArray contains all the cells of board ( all the td elements of table)
var cellArray = [];

//create an empty table
function tableCreate() {
  for (var i = 0; i < 5; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < 5; j++) {
      cell = document.createElement("td");
      var cellId = i.toString() + j.toString();

      cell.id = Number(cellId);
      cellArray.push(cell);
      //console.log('cellID:', cell.id);
      cell.appendChild(document.createTextNode(""));
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
}

tableCreate();

//mark appears on the cell when it is clicked.
var mark = "";
var count = 1;
var player;
var bgColor;

function play() {
  if (count % 2 === 1) {
    player = 1;
    mark = "x";
    bgColor = "rgb(124, 252, 0)";
  } else if (count % 2 === 0) {
    player = 2;
    mark = "o";
    bgColor = "rgb(250, 128, 114)";
  }
  console.log("count:", count);
}

function addMark(clickedId) {
  //call function play
  play();

  //console.log('now player is:;;;;;;; ', player);
  document.getElementsByTagName("caption")[0].innerHTML =
    "Player " + displayPlayer() + " turn";

  var currentCell = document.getElementById(clickedId);
  if (currentCell.innerHTML !== "") {
    return;
  } else {
    currentCell.innerHTML = mark;
    currentCell.style.backgroundColor = bgColor;

    console.log("count = ", count);
    console.log("player = ", player);

    isWin();

    count += 1;
  }
}

// swith player, because it will be called to display next player's turn
function displayPlayer() {
  if (player === 1) {
    player = 2;
  } else if (player === 2) {
    player = 1;
  }
  return player;
}

//bool function isWin to see whether the condition meets win or not
//overall strategy:
// 1. check one individual row, check one individual column
// 2. check if there is one row full filled with same symble in board,
//    check if there is one row full filled with same symble in board.
// 3. check left diagonal, check right diagonal
// 4. check diagonal
// 5. finally the isWin function overall check row, column and diagnal.
function isWin() {
  if (
    hasRowWithSameContents() ||
    hasColumnWithSameContents() ||
    hasDiagonalWithSameContents()
  ) {
    var temp = "Player " + displayPlayer() + " won!";
    setTimeout(function() {
      alert(temp);
    }, 1);
    removeOnclickAttribute();
    return true;
  } else {
    return false;
  }
}

//bool function to see whether there is one row with all cells filled with 'x' or 'o'
function hasRowWithSameContents() {
  var rows = table.rows;
  var count = 0;
  for (var row of rows) {
    //console.log('current row = ', row);
    if (isSameInOneRow(row)) {
      count += 1;
    }
  }
  if (count > 0) {
    return true;
  } else {
    return false;
  }
}

////bool function to see whether there is one column with all cells filled with 'x' or 'o'
function hasColumnWithSameContents() {
  var n = table.rows[0].cells.length;

  var count = 0;
  for (var i = 0; i < n; i++) {
    if (isSameInOneColumn(i)) {
      count += 1;
    }
  }
  if (count > 0) {
    return true;
  } else {
    return false;
  }
}

//bool function to see whether there is diagonal with all cells filled with 'x' or 'o'
function hasDiagonalWithSameContents() {
  if (isSameInLeftDiagonal() || isSameInRightDiagonal()) {
    return true;
  }
  return false;
}

//bool function to check whether the left oriented diagonal with all cells filled with 'x' or 'o'
function isSameInLeftDiagonal() {
  var rows = table.rows;
  var n = rows.length;
  for (var i = 0; i < n - 1; i++) {
    if (
      !(
        (rows[i].cells[4 - i].innerHTML === "x" &&
          rows[i + 1].cells[4 - (i + 1)].innerHTML === "x") ||
        (rows[i].cells[4 - i].innerHTML === "o" &&
          rows[i + 1].cells[4 - (i + 1)].innerHTML === "o")
      )
    ) {
      return false;
    }
  }
  return true;
}

//bool function to check whether the right oriented diagonal with all cells filled with 'x' or 'o'
function isSameInRightDiagonal() {
  var rows = table.rows;
  var n = rows.length;
  for (var i = 0; i < n - 1; i++) {
    if (
      !(
        (rows[i].cells[i].innerHTML === "x" &&
          rows[i + 1].cells[i + 1].innerHTML === "x") ||
        (rows[i].cells[i].innerHTML === "o" &&
          rows[i + 1].cells[i + 1].innerHTML === "o")
      )
    ) {
      return false;
    }
  }
  return true;
}

//bool function to check whether one individual column with all cells filled with 'x' or 'o'
function isSameInOneColumn(j) {
  var rows = table.rows;

  for (var i = 0; i < rows.length - 1; i++) {
    if (
      !(
        (rows[i].cells[j].innerHTML === "x" &&
          rows[i + 1].cells[j].innerHTML === "x") ||
        (rows[i].cells[j].innerHTML === "o" &&
          rows[i + 1].cells[j].innerHTML === "o")
      )
    ) {
      return false;
    }
  }
  return true;
}

//bool function to check whether one individual row with all cells filled with 'x' or 'o'
function isSameInOneRow(row) {
  var cells = row.cells;
  //console.log('cells: ', cells);
  for (var i = 0; i < cells.length - 1; i++) {
    if (
      !(
        (cells[i].innerHTML === "x" && cells[i + 1].innerHTML === "x") ||
        (cells[i].innerHTML === "o" && cells[i + 1].innerHTML === "o")
      )
    ) {
      return false;
    }
  }
  return true;
}

//to inactivate the clicking on cells
function removeOnclickAttribute() {
  for (var item of cellArray) {
    item.removeAttribute("onclick");
  }
}

//add every cell an onclick attribute and its value are addMark(this.id and timeLeft()).
for (var item of cellArray) {
  //console.log('item: ', item);
  //item.setAttribute("onclick", "addMark(this.id); timeLeft()");
  item.onclick = function() {
    addMark(this.id);
    timeLeft();
  };
}

function createProgressBar() {
  var body = document.getElementsByTagName("body")[0];
  //console.log('body: ', body);
  var div = document.createElement("div");
  var att = document.createAttribute("class");
  att.value = "w3-container";
  div.setAttributeNode(att);

  var div1 = document.createElement("div");
  var att1 = document.createAttribute("class");
  att1.value = "w3-light-grey w3-xlarge";
  div1.setAttributeNode(att1);

  var div2 = document.createElement("div");
  div2.id = "myBar";
  var att2 = document.createAttribute("class");
  att2.value = "w3-container w3-padding-large w3-red w3-center";
  div2.setAttributeNode(att2);
  div2.style.height = "60px";

  var h2 = document.createElement("h2");
  h2.innerHTML = "Time remains";
  h2.style = "text-align:center";
  div.appendChild(h2);

  div1.appendChild(div2);
  div.appendChild(div1);
  body.appendChild(div);
}

// call function createProgressBar
createProgressBar();

//make progress bar dynamic and connect to game
var timeleft;
var timerId = null; // because below will examin timerId, it is good to let it be null for safety

function timeLeft() {
  timeleft = 10;
  var elem = document.getElementById("myBar");
  var width = 10;

  //progress bar filling progress restart
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(frame, 1000);
  function frame() {
    if (timeleft < 0) {
      clearInterval(timerId);

      // if runout of time, change player
      count += 1;
    } else {
      elem.style.width = (width - timeleft) * 10 + "%";
      elem.innerHTML = timeleft + " s";
      timeleft -= 1;
    }
  }
}
