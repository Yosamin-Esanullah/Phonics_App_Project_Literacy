const flashcards = [
  { word: "up", phonics: "up" },
  { word: "your", phonics: "yo<span class='silent'>u</span>r" },
  { word: "each", phonics: "<span class='blend'>ea</span> <span class='blend'>ch" },
  { word: "about", phonics: "ab <span class='blend'>ou</span> t" },
  { word: "will", phonics: "will" },
  { word: "when", phonics: "w<span class='silent'>h</span>en" },
  { word: "then", phonics: "<span class='blend'>th</span>en" },
  { word: "were", phonics: "wer<span class='silent'>e</span>" },
  { word: "can", phonics: "can" },
  { word: "these", phonics: "<span class='blend'>th</span>ese" },
  { word: "them", phonics: "<span class='blend'>th</span>em" },
  { word: "their", phonics: "<span class='blend'>th</span>eir" },
  { word: "which", phonics: "w<span class='silent'>h</span>i <span class='blend'>ch</span>" },
  { word: "do", phonics: "do" },
  { word: "out", phonics: "<span class='blend'>ou</span>t" },
  { word: "we", phonics: "we" },
  { word: "said", phonics: "said" },
  { word: "the", phonics: "<span class='blend'>th</span>e" },
  { word: "and", phonics: "and" },
  ];


const container = document.getElementById('flashcardGrid');

flashcards.forEach(({ word, phonics }) => {
  const card = document.createElement('div');
  card.className = 'card';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const front = document.createElement('div');
  front.className = 'card-front';
  front.innerHTML = phonics;

  const back = document.createElement('div');
  back.className = 'card-back';
  const video = document.createElement('video');
  video.src = `videos/${word}.mp4`;
  video.controls = true;
  back.appendChild(video);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

card.addEventListener('click', () => {
  const isFlipped = card.classList.contains('flipped');

  if (isFlipped) {
    // Flipping back to front: fully stop video by removing and resetting the source
    video.pause();
    video.removeAttribute('src'); 
    video.load();
  } else {
    // Flipping to back: set src, reset time, and play
    video.src = `videos/${word}.mp4`;
    video.load();
    video.play().catch(err => console.warn(`Playback error for "${word}":`, err));
  }

  card.classList.toggle('flipped');
});
  container.appendChild(card);
});
