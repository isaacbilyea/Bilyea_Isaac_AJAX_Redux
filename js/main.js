(() => {
    //VARIABLES
    const characterBox = document.querySelector('#character-box'),
          movieBox = document.querySelector('#movie-box'),
          movieTemplate = document.querySelector('#movie-template'),
          baseURL = 'https://swapi.dev/api/';


    //FUNCTIONS
    function getCharacters() {
        fetch(`${baseURL}people/?page=2`)
        .then(response => response.json())
        .then(function(response) {
            const characters = response.results;
            const gallery = document.createElement('div');
            gallery.classList.add('images_container');

            characters.forEach(character => {
                const card = document.createElement('div');
                card.classList.add('character-card');
                
                const img = document.createElement('img');
                img.src = `images/${character.name.toLowerCase().replace(/\s+/g, '')}.png`;
                img.alt = character.name;
                
                card.dataset.films = character.films[0];
                card.addEventListener('click', getMovie);
                
                card.appendChild(img);
                gallery.appendChild(card);
            });
            
            characterBox.appendChild(gallery);
        })
        .catch(error => {
            console.log(error);
            characterBox.innerHTML = '<p class="error">Error loading characters</p>';
        });
    }

    function getMovie(e) {

        const movieURL = e.target.dataset.films;
        
        fetch(movieURL)
        .then(response => response.json())
        .then(function(response) {

            movieBox.innerHTML = '';

            const title = response.title;
            const crawl = response.opening_crawl;
            const episodeId = response.episode_id;
            
            const clone = movieTemplate.content.cloneNode(true);
            const movieTitle = clone.querySelector('.movie-title');
            const moviePoster = clone.querySelector('.movie-poster');
            const movieCrawl = clone.querySelector('.movie-crawl');
            
            movieTitle.innerHTML = title;
            moviePoster.src = `images/${episodeId}.jpg`;
            movieCrawl.innerHTML = crawl;
            
            movieBox.appendChild(clone);
            
        })
    }

    getCharacters();
    
})();