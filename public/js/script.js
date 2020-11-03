const socket = io();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;

const userText = document.querySelector('.output-you')
const botText = document.querySelector('.output-bot')

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  socket.emit('chat message', text);
  userText.innerHTML = text
});

socket.addEventListener('bot:response', (response)=>{
 botText.innerHTML = response
 synthVoice(response)
})

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}