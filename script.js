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

// fullscreen images
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-pic");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      // Request fullscreen and handle browser-specific prefixes
      if (img.requestFullscreen) {
        img.requestFullscreen().catch((err) => console.log(err));
      } else if (img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen();
      } else if (img.msRequestFullscreen) {
        img.msRequestFullscreen();
      }
    });
  });

  document.addEventListener("fullscreenchange", () => {
    // Remove 'fullscreen-active' if no element is in fullscreen
    if (!document.fullscreenElement) {
      document.body.classList.remove("fullscreen-active");
    }
  });
});
