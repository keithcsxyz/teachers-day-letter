const letters = document.querySelectorAll(".letter");
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Keep letters in original order (top to bottom)
const orderedLetters = Array.from(letters);

orderedLetters.forEach((letter) => {
  lettersContainer.appendChild(letter);
  const center =
    document.querySelector(".cssletter").offsetWidth / 2 -
    letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }
  let offsetX, offsetY;
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") {
      const rect = e.target.getBoundingClientRect();

      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      letter.style.zIndex = zIndexCounter++;
      const moveAt = (posX, posY) => {
        letter.style.left = `${posX - offsetX}px`;
        letter.style.top = `${posY - offsetY}px`;
      };
      const onMouseMove = (moveEvent) =>
        moveAt(moveEvent.clientX, moveEvent.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
});


// Create audio element for background music
const backgroundMusic = new Audio("../assets/sounds/background.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");

  // Play background music
  backgroundMusic.play().catch((error) => {
    console.log("Audio play failed:", error);
  });
});
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) {
      letter.style.display = "none";
    }
  });
});

$("#header-plugin").load(
  "https://vivinantony.github.io/header-plugin/",
  function () {
    $("a.back-to-link").attr(
      "href",
      "http://blog.thelittletechie.com/2015/03/love-heart-animation-using-css3.html#tlt"
    );
  }
);

var love = setInterval(function () {
  var r_num = Math.floor(Math.random() * 40) + 1;
  var r_size = Math.floor(Math.random() * 65) + 10;
  var r_left = Math.floor(Math.random() * 100) + 1;
  var r_bg = Math.floor(Math.random() * 25) + 100;
  var r_time = Math.floor(Math.random() * 5) + 5;

  $(".bg_heart").append(
    "<div class='bg-heart-shape' style='width:" +
      r_size +
      "px;height:" +
      r_size +
      "px;left:" +
      r_left +
      "%;background:rgba(255," +
      (r_bg - 25) +
      "," +
      r_bg +
      ",1);-webkit-animation:love " +
      r_time +
      "s ease;-moz-animation:love " +
      r_time +
      "s ease;-ms-animation:love " +
      r_time +
      "s ease;animation:love " +
      r_time +
      "s ease'></div>"
  );

  $(".bg_heart").append(
    "<div class='bg-heart-shape' style='width:" +
      (r_size - 10) +
      "px;height:" +
      (r_size - 10) +
      "px;left:" +
      (r_left + r_num) +
      "%;background:rgba(255," +
      (r_bg - 25) +
      "," +
      (r_bg + 25) +
      ",1);-webkit-animation:love " +
      (r_time + 5) +
      "s ease;-moz-animation:love " +
      (r_time + 5) +
      "s ease;-ms-animation:love " +
      (r_time + 5) +
      "s ease;animation:love " +
      (r_time + 5) +
      "s ease'></div>"
  );

  $(".bg-heart-shape").each(function () {
    var top = $(this)
      .css("top")
      .replace(/[^-\d\.]/g, "");
    var width = $(this)
      .css("width")
      .replace(/[^-\d\.]/g, "");
    if (top <= -100 || width >= 150) {
      $(this).detach();
    }
  });
}, 500);
