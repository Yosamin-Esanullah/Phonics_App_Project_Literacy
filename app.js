const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const grid = document.getElementById('letterGrid');

// Elements for animated video overlay
const videoOverlay = document.getElementById('videoOverlay');
const letterVideo = document.getElementById('letterVideo');
const closeBtn = document.getElementById('closeVideoBtn');
const floatingTile = document.getElementById('floatingTile');

// Colorblind-safe palette
const colors = [
  '#D81B60', '#1E88E5', '#FFC107', '#004D40', '#F4511E',
  '#43A047', '#8E24AA', '#3949AB', '#FB8C00', '#00796B',
];

// Store original tile position globally for animation back
let originalTop = 0;
let originalLeft = 0;

// Create tiles and add to grid
letters.forEach((letter, index) => {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.innerText = letter;
  tile.style.color = colors[index % colors.length];

  tile.addEventListener('click', () => {
    // Set letter and video
    floatingTile.textContent = letter;
    letterVideo.src = 'a.mp4';
    letterVideo.play().catch(e => console.error(e));

   // letterVideo.src = `${letter}.mp4`;

    // Get original position of clicked tile
    const rect = tile.getBoundingClientRect();
    originalTop = rect.top + window.scrollY + rect.height / 2;
    originalLeft = rect.left + window.scrollX + rect.width / 2;

    // Position floating tile over clicked tile
    floatingTile.style.top = `${originalTop}px`;
    floatingTile.style.left = `${originalLeft}px`;
    floatingTile.style.color = tile.style.color;
    floatingTile.classList.remove('hidden');

    // Trigger reflow for transition
    void floatingTile.offsetWidth;

    videoOverlay.classList.add('active');
    videoOverlay.classList.remove('hidden');

    // Animate floating tile to top center
    setTimeout(() => {
      floatingTile.style.top = `80px`;
      floatingTile.style.left = `50%`;
      floatingTile.style.transform = `translate(-50%, 0)`;
    }, 10);

    // Play the video
    letterVideo.play().catch(e => console.error(`Video error for ${letter}:`, e));
  });

  grid.appendChild(tile);
});

// Close button handler - animate tile back and hide overlay
closeBtn.addEventListener('click', () => {
  letterVideo.pause();
  letterVideo.currentTime = 0;

  // Animate floating tile back to original position
  floatingTile.style.top = `${originalTop}px`;
  floatingTile.style.left = `${originalLeft}px`;
  floatingTile.style.transform = `translate(-50%, -50%)`;

  // Remove active state after animation starts
  setTimeout(() => {
    videoOverlay.classList.remove('active');
  }, 200);

  // Hide overlay and floating tile after animation finishes
  setTimeout(() => {
    videoOverlay.classList.add('hidden');
    floatingTile.classList.add('hidden');
    floatingTile.style.transform = ''; // reset transform style
  }, 500); // should match CSS transition duration
});
