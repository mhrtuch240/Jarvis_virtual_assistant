let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

// Speech Synthesis Function
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  window.speechSynthesis.speak(text_speak);
}

// Function to automatically detect and speak greeting based on current time
function getGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greetingMessage = '';

  if (hours >= 0 && hours < 12) {
    greetingMessage = "Good morning sir";
  } else if (hours >= 12 && hours < 16) {
    greetingMessage = "Good afternoon sir";
  } else if (hours >= 16 && hours < 20) {
    greetingMessage = "Good evening sir";
  } else {
    greetingMessage = "Good night sir";
  }

  speak(greetingMessage);
}

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onstart = function() {
  speak("I am listening, please speak...");
};

recognition.onresult = function(event) {
  const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
  content.textContent = "You said: " + transcript;
  console.log("User said:", transcript);

  // Respond based on voice commands
  if (transcript.includes("hello") || transcript.includes("hi")) {
    speak("Hello, how can I assist you?");
  } else if (transcript.includes("how are you")) {
    speak("I am doing great, thank you for asking!");
  } else if (transcript.includes("goodbye") || transcript.includes("bye")) {
    speak("Goodbye, have a nice day!");
  } else if (transcript.includes("time") || transcript.includes("current time")) {
    let time = new Date().toLocaleTimeString();
    speak("The current time is " + time);
  } else if (transcript.includes("date") || transcript.includes("today's date")) {
    let date = new Date().toLocaleDateString();
    speak("Today's date is " + date);
  } else if (transcript.includes("who are you")) {
    // Your personal information
    speak("I am Jarvis, your personal virtual assistant. Created by Mehedi Hasan Rafsun, an 18-year-old web development expert. I specialize in JavaScript, HTML, CSS, and more. I am here to assist you with programming, web development, and general tasks. My website is WebLearner Pro, where I share knowledge about programming and web development.");
  } else if (transcript.includes("how do you create")) {
    // Information on how you created the assistant
    speak("I was created using JavaScript, HTML, and CSS. I am a product of web development skills and am designed to help with tasks such as programming, web development, and more. I have been created by Mehedi Hasan Rafsun, who has expertise in web development and other fields.");
  } else if (transcript.includes("weather")) {
    speak("Currently, I cannot fetch the weather information. Please check a weather website for updates.");
  } else if (transcript.includes("open")) {
    let websiteName = transcript.replace("open", "").trim();
    let websites = {
      "google": "https://www.google.com",
      "youtube": "https://www.youtube.com",
      "facebook": "https://www.facebook.com",
      "gmail": "https://mail.google.com",
      "github": "https://github.com",
      "linkedin": "https://www.linkedin.com",
      "w3schools": "https://www.w3schools.com",
      "yahoo": "https://www.yahoo.com",
      "microsoft excel": "https://www.microsoft.com/en-us/microsoft-365/excel",
      "microsoft word": "https://www.microsoft.com/en-us/microsoft-365/word",
      "microsoft onedrive": "https://onedrive.live.com",
      "microsoft outlook": "https://outlook.live.com",
      "microsoft bing": "https://www.bing.com",
      "twitter": "https://twitter.com",
      "x": "https://x.com", // Formerly Twitter
      "my website": "https://weblearnerprosite.blogspot.com",
      "microsoft co pilot": "https://www.microsoft.com/en-us/microsoft-365/copilot"
    };

    let url = websites[websiteName.toLowerCase()];
    if (url) {
      window.open(url, "_blank");
      speak(`Opening ${websiteName.charAt(0).toUpperCase() + websiteName.slice(1)}.`);
    } else {
      speak("Sorry, I couldn't find that website. Please check the name.");
    }
  } else {
    speak("Sorry, I didn't understand that. Please try again.");
  }
};

recognition.onerror = function(event) {
  console.error("Speech recognition error:", event.error);
};

// Event Listener for Button Click
btn.addEventListener("click", () => {
  recognition.start();
});

// Load Event for Initial Greeting and Time Announcement
window.addEventListener('load', () => {
  getGreeting(); // Get greeting based on time

  // Speak current time on page load
  setTimeout(() => {
    let currentTime = new Date().toLocaleTimeString();
    speak("The current time is " + currentTime);
  }, 2000);
});