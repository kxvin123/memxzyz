/*Start Variables*/
let btnStart = document.querySelector("main .content-start button");
let theContentStart = document.querySelector("main .content-start");
let btnRestart = document.querySelector(
  "main .memory-game .info-memory-game .restart"
);
let countTimer = document.querySelector(
  "main .memory-game .info-memory-game .timer p span"
);
let nbrTries = document.querySelector(
  "main .memory-game .info-memory-game .tries p span"
);
//Cards
let theCards = document.querySelector("main .content-memory-game .cards");
//Array Of Cards
let AllCardsArray = [...theCards.children];
//Card
let theCard = document.querySelector("main .content-memory-game .cards .card");
//Audios
let audioSame = document.getElementById("same");
let audioDifferent = document.getElementById("different");
let audioBackground = document.getElementById("back-naruto-song");
let audioLose = document.getElementById("lose");
let audioWin = document.getElementById("win");
let pName = document.querySelector(
  ".memory-game .info-memory-game .player p span"
);
/*End Variables*/

//Event : Start Game with Click The Start Button and  Write Your Name
btnStart.onclick = () => {
  Swal.fire({
    title: "Your Name!",
    text: "Write Your Name !",
    input: "text",
    showCancelButton: true,
    showCloseButton: true,
  }).then((result) => {
    if (result.value) {
      pName.innerHTML = result.value;
      theContentStart.style.display = "none";
      audioBackground.play();
      timer();
    } else {
      pName.innerHTML = "Unkown";
      theContentStart.style.display = "none";
      audioBackground.play();
      timer();
    }
  });
};

//Event : Restart Game with Click The Restart Button To Refresh The Game
btnRestart.onclick = () => {
  location.reload();
};

//Event : Click Card To Flipped
function flipNow() {
  AllCardsArray.forEach((card, index) => {
    card.addEventListener("click", () => {
      flipCard(card);
    });
  });
}
flipNow();

//Function To Flip Cards
let ArrFlippedCards;
function flipCard(cardClicked) {
  //Event : Click Card and Add Flipped Class To It
  cardClicked.classList.add("flippedCard");
  //Filter The Choosen Cards Flipped in An Array
  ArrFlippedCards = AllCardsArray.filter((card, index) => {
    return card.classList.contains("flippedCard");
  });
  //Choose Two Cards
  if (ArrFlippedCards.length == 2) {
    //Stop Event Of Click
    stopChoose();
    //Check Same Or Different Cards
    checkCardsSameDifferent(ArrFlippedCards[0], ArrFlippedCards[1]);
  }
}

//Fuction To Stop Choose Cards More Than Two
function stopChoose() {
  //Add Class No Click
  theCards.classList.add("noClick");
  //Remove Class No Click
  setTimeout(() => {
    theCards.classList.remove("noClick");
  }, 1000);
}

//Function To Check The Two Choosen Cards Same Or Different
let numT = 0;
function checkCardsSameDifferent(cardOne, cardTwo) {
  if (cardOne.dataset.anime === cardTwo.dataset.anime) {
    setTimeout(() => {
      cardOne.classList.add("box-sha");
      cardTwo.classList.add("box-sha");
    }, 1000);
    cardOne.classList.remove("flippedCard");
    cardTwo.classList.remove("flippedCard");
    cardOne.classList.add("done");
    cardTwo.classList.add("done");
    //Play Audio : Same Cards
    audioSame.play();
    //Win Game
    winGame(AllCardsArray);
  } else {
    setTimeout(() => {
      numT++;
      numT < 10
        ? (nbrTries.innerHTML = `0${parseInt(numT)}`)
        : (nbrTries.innerHTML = `${parseInt(numT)}`);
      if (numT > 14) {
        //Lose Game
        loseGame();
      }
      cardOne.classList.remove("flippedCard");
      cardTwo.classList.remove("flippedCard");
      //Play Audio : Different Cards
      audioDifferent.play();
    }, 1000);
  }
}
//Function Timer Count Down
let time = 60;
function timer() {
  let timerInter = setInterval(() => {
    time--;
    time < 10
      ? (countTimer.innerHTML = `0${time}s`)
      : (countTimer.innerHTML = `${time}s`);
    if (time == 0) {
      clearInterval(timerInter);
      //Lose Game
      loseGame();
    }
  }, 1000);
}

//Add Order To Cards
//Order Marge Array
let orderMarge = [...Array(AllCardsArray.length).keys()];
//Random Order Marge Array
RandCards(orderMarge);
//Function To Order Cards
function orderCards() {
  AllCardsArray.forEach((card, index) => {
    card.style.order = orderMarge[index];
  });
}
orderCards();

// Function To Make Images Of Cards Random
function RandCards(arrCards) {
  let current = arrCards.length,
    rand;
  while (current > 0) {
    rand = Math.floor(Math.random() * current);
    current--;
    [arrCards[current], arrCards[rand]] = [arrCards[rand], arrCards[current]];
  }
  return arrCards;
}

//Function Lose Game : If Number Of Tries More Than 15 Or End Time
function loseGame(numOfTries) {
  setTimeout(() => {
    audioBackground.pause();
    audioLose.play();
    Swal.fire({
      title: "Oops!",
      text: "You Lose - Game Over",
      icon: "error",
      confirmButtonText: "Ok",
      // showCancelButton: true,
      showCloseButton: true,
    });
    setTimeout(() => {
      location.reload();
    }, 4000);
  }, 1000);
}

//Function Win Game : If All Cards Have Class Done
function winGame(AllCards) {
  let numCardsDone = 0;
  AllCards.forEach((card, index) => {
    if (card.classList.contains("done")) {
      numCardsDone++;
      if (numCardsDone == AllCardsArray.length) {
        setTimeout(() => {
          audioBackground.pause();
          audioWin.play();
          Swal.fire({
            title: "Wow!",
            text: "You Win - Done ",
            icon: "success",
            confirmButtonText: "Ok",
            // showCancelButton: true,
            showCloseButton: true,
          });
          setTimeout(() => {
            location.reload();
          }, 4000);
        }, 1000);
      }
    }
  });
}
