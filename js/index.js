const allSelect = document.querySelectorAll("select"),
  time = document.querySelector(".header_time"),
  button = document.querySelector("button"),
  card_body = document.querySelector(".card_body"),
  alarmAudio = new Audio("../assets/audios/audio.mp3");
let timeFound,
  isClick = false;
// create hours
(function () {
  for (let i = 12; i >= 1; i--) {
    let hour = i < 10 ? "0" + i : i;
    let option = `<option value="${hour}">${hour}</option>`;
    allSelect[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }
})();

// create Minutes
(function () {
  for (let i = 60; i >= 1; i--) {
    let minute = i < 10 ? "0" + i : i;
    let option = `<option value="${minute}">${minute}</option>`;
    allSelect[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }
})();

// create AM/PM
(function () {
  for (let i = 2; i >= 1; i--) {
    let apm = i === 1 ? "AM" : "PM";
    let option = `<option value="${apm}">${apm}</option>`;
    allSelect[2].firstElementChild.insertAdjacentHTML("afterend", option);
  }
})();

// add interval
setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let apm = "AM";

  if (hours >= 12) {
    hours = hours - 12;
    apm = "PM";
  }
  hours = hours === 0 ? (hours = 12) : hours;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  time.innerHTML = `${hours} : ${minutes} : ${seconds} ${apm}`;

  if (timeFound === `${hours}:${minutes}:${apm}`) {
    alarmAudio.play();
    alarmAudio.loop = true;
  }
}, 1000);

function addAlarm() {
  if (isClick) {
    alarmAudio.pause();
    button.innerText = "😗 شغلني ياعم";
    card_body.classList.remove("hidden");
    timeFound = "";
    return;
  }
  let time = `${allSelect[0].value}:${allSelect[1].value}:${allSelect[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("!! اكتب ياعم وقت ولا انا هصحيك بمزاجي  😡 ");
  }

  isClick = true;
  timeFound = time;
  button.innerText = "  🥺  اصحا ياعم انا تعبت ";
  card_body.classList.add("hidden");
}

button.addEventListener("click", addAlarm);
