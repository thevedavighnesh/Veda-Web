fetch('/videos')
  .then(response => response.json())
  .then(videos => {
    const categories = { 'All Movies': videos };
    videos.forEach(video => {
      if (!categories[video.category]) categories[video.category] = [];
      categories[video.category].push(video);
    });

    function renderVideos(filteredVideos, showCategories) {
      const mainContainer = document.querySelector('main');
      mainContainer.innerHTML = '';

      if (showCategories) {
        for (const category in categories) {
          const section = document.createElement('section');
          section.classList.add('genre-section');
          section.innerHTML = `<h2>${category}</h2>`;

          const genreGrid = document.createElement('div');
          genreGrid.classList.add('genre-grid');

          categories[category].forEach(video => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `
              <img src="/posters/${video.poster}" alt="${video.title}">
              <h3>${video.title}</h3>
            `;
            card.addEventListener('click', () => openModal(video));
            genreGrid.appendChild(card);
          });

          section.appendChild(genreGrid);
          mainContainer.appendChild(section);
        }
      } else {
        const genreGrid = document.createElement('div');
        genreGrid.classList.add('genre-grid');
        filteredVideos.forEach(video => {
          const card = document.createElement('div');
          card.className = 'movie-card';
          card.innerHTML = `
            <img src="/posters/${video.poster}" alt="${video.title}">
            <h3>${video.title}</h3>
          `;
          card.addEventListener('click', () => openModal(video));
          genreGrid.appendChild(card);
        });
        mainContainer.appendChild(genreGrid);
      }
    }

    renderVideos(videos, true);

    document.getElementById('search-input').addEventListener('input', function(event) {
      const query = event.target.value.toLowerCase();
      const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(query));
      renderVideos(filteredVideos, query === '');
    });
  })
  .catch(err => console.error('Failed to fetch videos:', err));

function openModal(video) {
  const modal = document.getElementById('modal');
  const player = document.getElementById('player');
  const videoTitle = document.getElementById('video-title');
  const videoDescription = document.getElementById('video-description');

  // Update the video source to point to the correct file location
  player.src = `/videos/${video.filename}`; // Assuming your videos are stored in the 'public/videos' folder
  videoTitle.textContent = video.title;
  videoDescription.textContent = video.description || 'No description available.';
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  player.play();
}


function closeModal() {
  const modal = document.getElementById('modal');
  const player = document.getElementById('player');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  player.pause();
  player.src = '';
}

document.getElementById('close-modal').addEventListener('click', closeModal);
