(() => {
    //VARIABLES
    const characterBox = document.querySelector('#character-box'),
          movieBox = document.querySelector('#movie-box'),
          movieTemplate = document.querySelector('#movie-template'),
          baseURL = 'https://swapi.dev/api/';


    //FUNCTIONS
    function getCharacters() {
        fetch(`${baseURL}people`)
        .then(response => response.json())
        .then(function(response) {
            const characters = response.results,
                  ul = document.createElement('ul');

            characters.forEach(character => {
                const li = document.createElement('li'),
                      a = document.createElement('a');
                
                a.dataset.films = character.films[0];
                a.textContent = character.name;
                li.appendChild(a);
                ul.appendChild(li);
            });
            
            characterBox.appendChild(ul);
        })
        .then(function() {
            const links = document.querySelectorAll('#character-box li a');
            links.forEach(link => {
                link.addEventListener('click', getMovie);
            });
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