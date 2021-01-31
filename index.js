//......................................................
//.................. ONLOAD .....................
//......................................................

window.onload = onLoadingFun;

function onLoadingFun() {
  pomoFun();
  autoStartOnOffFunction();
}

//........ VARIABLES  ...............

let pomo = document.getElementById("pomo"),
  break1 = document.getElementById("break1"),
  startTimer,
  wm = document.getElementById("wm"),
  ws = document.getElementById("ws"),
  sP = document.getElementById("startPause"),
  sets = document.getElementById("sets"),
  mainDis = document.getElementById("mainDisplay"),
  status = document.getElementById("status"),
  startPause = document.getElementById("startPause"),
  container = document.getElementById("container"),
  bottomText = document.querySelector("#bottomText"),
  setting = document.querySelector("#setting"),
  info = document.querySelector('#info'),
  hr1 = document.querySelector("#hr1"),
  secondsSpeed = 1000;

let autoStartOnOff = document.querySelector("#autoStartOnOff"),
  btnBack = document.querySelector("#btnBack"),
  hiddenExitSign = document.querySelector("#hiddenExitSign"),
  hiddenMenu = document.querySelector("#hiddenMenu"),
  hiddenMenuOkBtn = document.querySelector("#hiddenMenuOkBtn"),
  settingBtn = document.querySelector("#setting"),
  hiddenMenuBackgroundGrayout = document.querySelector(
    "#hiddenMenuBackgroundGrayout"
  );

let settingPomoMin = document.querySelector("#settingPomoMin"), // this is work input
  settingBreakMin = document.querySelector("#settingBreakMin"); // this is break input

//......................................................
//.................. SOUND LIBRARY .....................
//......................................................

let btnClick = new Audio(
  "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
),
  alarmEnd = new Audio(
    "https://ds-alarm-sounds.s3-eu-west-1.amazonaws.com/digital.mp3"
  );


startPause.addEventListener('click', buttonSound);

function buttonSound() {
  btnClick.play();
}

//......................................................
//.................. WORKING ON MINUTES INPUT .....................
//......................................................

hiddenMenuOkBtn.addEventListener("click", correctDisplay);
pomo.addEventListener("click", correctDisplay);
break1.addEventListener("click", correctDisplay);

function correctDisplay() {
  if (status.innerHTML == "work") {
    mainDis.innerHTML =
      settingPomoMin.value.length >= 2
        ? `${settingPomoMin.value}:00`
        : `0${settingPomoMin.value}:00`;
    wm.innerHTML = settingPomoMin.value;
    ws.innerHTML = 00;
  }

  if (status.innerHTML == "break") {
    mainDis.innerHTML =
      settingBreakMin.value.length >= 2
        ? `${settingBreakMin.value}:00`
        : `0${settingBreakMin.value}:00`;
    wm.innerHTML = settingBreakMin.value;
    ws.innerHTML = 00;
  }
} // correctDisplay end

//..............  HIDDEN MENU ITEMS AND SETTINGS BUTTON ...................

settingBtn.addEventListener("click", openHiddenMenu);

function openHiddenMenu() {
  hiddenMenu.style.display = "block";
  hiddenMenuBackgroundGrayout.style.display = "block";
}

hiddenExitSign.addEventListener("click", exitHiddenMenu);
hiddenMenuOkBtn.addEventListener('click', exitHiddenMenu);

function exitHiddenMenu() {
  hiddenMenu.style.display = "none";
  hiddenMenuBackgroundGrayout.style.display = "none";
}

autoStartOnOff.addEventListener("click", autoStartOnOffFunction);

function autoStartOnOffFunction() {
  if (autoStartOnOff.innerHTML == "off") {
    autoStartOnOff.innerHTML = "on";
    autoStartOnOff.style.left = "40px";
    btnBack.style.backgroundColor = "rgb(156,210,91)";
  } else {
    autoStartOnOff.innerHTML = "off";
    autoStartOnOff.style.left = "0px";
    btnBack.style.backgroundColor = "rgb(204, 204, 204)";
  }
}

//............ HIDDEN MANU VOLUME CONTROL .........

let volumeSlider = document.querySelector("#slider");

volumeSlider.addEventListener("change", volumeFun);
volumeSlider.addEventListener("input", volumeFun);

function volumeFun() {
  console.log(this.value);

  btnClick.volume = this.value / 100;
  alarmEnd.volume = this.value / 100;
}

//... MAIN BUTTONS...............

pomo.addEventListener("click", pomoFun);
break1.addEventListener("click", break1Fun);
startPause.addEventListener("click", controller);

//............POMO AND BREAK MAIN FUNCTIONS..............

function pomoFun() {
  //..... styling ....

  pomo.classList.add("pomoStyle");
  break1.classList.remove("break1Style");

  bottomText.innerHTML = "Time to work!";
  setting.style.backgroundColor = "rgb(223,100,95)";
  info.style.backgroundColor = "rgb(223,100,95)";

  hr1.style.border = "0.5px solid rgb(189, 84, 80)";

  document.body.style.cssText = `
  background-color: rgb(219,82,76);
  transition: 1s; 
  `;

  container.style.cssText = `
    background-color: rgb(223,100,95);
  `;

  startPause.style.color = "rgb(199,74,70)";

  //... set starting time here....
  status.innerHTML = "work";
  correctDisplay();
}

function break1Fun() {
  // .... applying styles in here

  pomo.classList.remove("pomoStyle");
  break1.classList.add("break1Style");

  bottomText.innerHTML = "Time for a break!";
  setting.style.backgroundColor = "rgb(89,154,156)";
  info.style.backgroundColor = "rgb(89,154,156)";

  hr1.style.border = "0.5px solid rgb(76, 131, 133)";

  document.body.style.cssText = `
      background-color: rgb(70,142,145);
      transition: 1s; 
  `;

  container.style.cssText = `
    background-color: rgb(89,154,156);
  `;

  startPause.style.color = "rgb(64,129,133)";

  //... set starting time here....

  status.innerHTML = "break";
  correctDisplay();
}

//.... the timer  ...........

function controller() {

  //..... work timer
  if (status.innerHTML == "work") {


    if (startPause.innerHTML == "start") {

      startPause.innerHTML = "pause";
      startTimer = setInterval(timerWork, secondsSpeed);



    } else if (startPause.innerHTML == "pause") {
      startPause.innerHTML = "start";
      clearInterval(startTimer);
    }
  } //............ end of work timer function ...............

  //... break timer here
  if (status.innerHTML == "break") {


    if (startPause.innerHTML == "start") {

      startPause.innerHTML = "pause";
      startTimer = setInterval(timerBreak, secondsSpeed);
    } else if (startPause.innerHTML == "pause") {
      startPause.innerHTML = "start";
      clearInterval(startTimer);
    }
  }
} // .......... end theTimer function....




//........ ACTUAL TIMER... .........
function timerWork() {



  if (wm.innerHTML != 0 && ws.innerHTML == 0) {
    wm.innerHTML--;
    ws.innerHTML = 59;

    addZero(); // adds Zero to the start

    mainDisplay.innerHTML = `${wm.innerHTML}:${ws.innerHTML}`;

    if (wm.innerHTML == 5) {
      let remaining5min = new Notification("5 minutes left");
    }
  } else if (ws.innerHTML != 0) {
    ws.innerHTML--;

    addZero(); // adds Zero to the start

    mainDisplay.innerHTML = `${wm.innerHTML}:${ws.innerHTML}`;
  }

  if (wm.innerHTML == 0 && ws.innerHTML == 0) {
    if (autoStartOnOff.innerHTML == "off") {
      clearInterval(startTimer);

      startPause.innerHTML = "start";
      sets.innerHTML++;
      break1Fun();

      let workEndNotification = new Notification("Time for a break!");

      alarmEnd.play();
      setTimeout(() => alarmEnd.pause(), 2000);

    } else if (autoStartOnOff.innerHTML == "on") {


      clearInterval(startTimer);

      startPause.innerHTML = "start";
      sets.innerHTML++;
      break1Fun();

      let workEndNotification = new Notification("Time for a break!");

      alarmEnd.play();
      setTimeout(() => alarmEnd.pause(), 2000);

      controller();

    }
  }
}

function timerBreak() {



  if (wm.innerHTML != 0 && ws.innerHTML == 0) {
    wm.innerHTML--;
    ws.innerHTML = 59;

    addZero(); // adds Zero to the start

    mainDisplay.innerHTML = `${wm.innerHTML}:${ws.innerHTML}`;
  } else if (ws.innerHTML != 0) {
    ws.innerHTML--;

    addZero(); // adds Zero to the start

    mainDisplay.innerHTML = `${wm.innerHTML}:${ws.innerHTML}`;
  }

  if (wm.innerHTML == 0 && ws.innerHTML == 0) {
    /// code herer

    if (autoStartOnOff.innerHTML == "off") {
      clearInterval(startTimer);

      startPause.innerHTML = "start";
      pomoFun();

      let breakEndNotification = new Notification("Time to work!");

      alarmEnd.play();
      setTimeout(() => alarmEnd.pause(), 2000);

    } else if (autoStartOnOff.innerHTML == "on") {


      clearInterval(startTimer);

      startPause.innerHTML = "start";
      pomoFun();

      let breakEndNotification = new Notification("Time to work!");

      alarmEnd.play();
      setTimeout(() => alarmEnd.pause(), 2000);



      controller();

    }
  }
}

//// ADDING ZEROS CODE ....

function addZero() {
  if (wm.innerHTML.length < 2) {
    wm.innerHTML = "0" + wm.innerHTML;
  }

  if (ws.innerHTML.length < 2) {
    ws.innerHTML = "0" + ws.innerHTML;
  }
}

// ............. button operatrion

window.addEventListener("keyup", keyOperation);

function keyOperation(event) {

  if (event.key == "Enter") {
    22
    controller();
  }

  if (event.key == "1") {
    pomoFun();
  }

  if (event.key == "2") {
    break1Fun();
  }

  if (event.key == "3") {
    openHiddenMenu();
  }
} //... end of keyOperation function


