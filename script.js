function Clock() {
  const current_time = new Date();

  let hours = current_time.getHours();
  let minutes = current_time.getMinutes();
  let seconds = current_time.getSeconds();

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  const timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById("time").textContent = timeString;
}

function Today() {
  const current_date = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateString = current_date.toLocaleDateString(undefined, options);

  document.getElementById("date").textContent = dateString;
}

Clock();
Today();

setInterval(Clock, 1000);

//form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Message sent successfully, thank you for getting in touch!");

    this.reset();
  });
