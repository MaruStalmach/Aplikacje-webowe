function updateTime() {
  const now = new Date(); // Get the current date and time

  // Extract time components
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Format hours, minutes, and seconds to be two digits
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  // Construct the time string
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Update the time div with the time
  document.getElementById("time").textContent = timeString;
}

function updateDate() {
  const now = new Date(); // Get the current date

  // Extract date components
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateString = now.toLocaleDateString(undefined, options); // Format date

  // Update the date div with the date
  document.getElementById("date").textContent = dateString;
}

// Call the functions immediately to display the time and date as soon as the page loads
updateTime();
updateDate();

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);
