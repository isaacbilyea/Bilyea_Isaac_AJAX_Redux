(() => {
    //VARIABLES
    const characterBox = document.querySelector('#character-box'),
          movieBox = document.querySelector('#movie-box'),
          movieTemplate = document.querySelector('#movie-template'),
          prevBtn = document.querySelector('.prev-btn'),
          nextBtn = document.querySelector('.next-btn'),
          header = document.querySelector('header'),
          baseURL = 'https://swapi.dev/api/';
    
    let currentIndex = 0;

    //FUNCTIONS
    function getCharacters() {
        fetch(`${baseURL}people/?page=2`)
        .then(response => response.json())
        .then(function(response) {
            const characters = response.results,
                  ul = document.createElement('ul');

            characters.forEach((character, index) => {
                const li = document.createElement('li'),
                      name = document.createElement('p'),
                      img = document.createElement('img');
                
                if(index === 0) {
                    li.classList.add('current');
                }

                name.textContent = character.name.toUpperCase();
                name.classList.add('character-name');

                //removes spaces
                img.src = `images/${character.name.replace(/\s+/g, '')}.png`;
                img.alt = character.name;
                
                li.dataset.films = character.films[0];
                li.addEventListener('click', getMovie);
                
                li.appendChild(name); 
                li.appendChild(img);
                ul.appendChild(li);
            });
            
            characterBox.appendChild(ul);

            const staggerFrom = window.innerWidth >= 1200 ? "center" : "start";
            gsap.fromTo('#character-box li img', 
                {
                    y: 200,
                    opacity: 0,
                    scale: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    stagger: {
                        amount: 1,
                        from: staggerFrom
                    },
                    ease: "back.out(1.2)"
                }
            );

            prevBtn.addEventListener('click', () => changeCharacters('prev'));
            nextBtn.addEventListener('click', () => changeCharacters('next'));
        
        })
        .catch(error => {
            console.log(error);
            characterBox.innerHTML = '<p class="error">Error loading characters</p>';
        });
    }

    function getMovie(e) {
        const movieURL = e.currentTarget.dataset.films,
              characters = document.querySelectorAll('#character-box li');
        
        characters.forEach(character => {
            character.classList.remove('active');
        });

        e.currentTarget.classList.add('active');
        header.style.opacity = 0;

        movieBox.innerHTML = '';
        fetch(movieURL)
        .then(response => response.json())
        .then(function(response) {

            const title = response.title;
            const crawl = response.opening_crawl;
            const episodeId = response.episode_id;
            
            const clone = movieTemplate.content.cloneNode(true);
            const movieTitle = clone.querySelector('.movie-title');
            const moviePoster = clone.querySelector('.movie-poster');
            const movieCrawl = clone.querySelector('.movie-crawl');

            const crawlContainer = document.createElement('div');
            crawlContainer.classList.add('crawl-container');

            const contentCon = document.createElement('div');
            contentCon.classList.add('content-con');
            
            movieTitle.innerHTML = title;
            moviePoster.src = `images/${episodeId}.jpg`;
            moviePoster.alt = response.title;
            movieCrawl.innerHTML = crawl;
            
            contentCon.appendChild(movieTitle);
            contentCon.appendChild(movieCrawl);
            crawlContainer.appendChild(contentCon);
            clone.appendChild(crawlContainer);
            
            movieBox.appendChild(clone);

            gsap.fromTo('.movie-poster',
                { 
                    scale: 0, 
                    opacity: 0 
                },
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 1.62,
                    ease: 'back.out(1.7)'
                }
            );
            
        })
        .catch(error => {
            console.log(error);
            movieBox.innerHTML = '<p class="error">Error loading movie</p>';
        });
    }

    function changeCharacters(direction) {
        const characters = document.querySelectorAll('#character-box li');
        characters[currentIndex].classList.remove('current');
        
        if(direction === 'next') {
            currentIndex = (currentIndex + 1) % characters.length;
        } else {
            currentIndex = currentIndex === 0 ? characters.length - 1 : currentIndex - 1;
        }

        const currentCharacter = characters[currentIndex];
        characters[currentIndex].classList.add('current');

        //clears movie and fetches new movie
        movieBox.innerHTML = '';
        getMovie({ currentTarget: currentCharacter });

        header.style.opacity = 0;
    }

    getCharacters();

})();


//----------------------------------------------------------------------------------//


//Star Background
(() => {

    //VARIABLES
    const body = document.querySelector('body'),
          starCount = 200;

    //FUNCTIONS
    function createStars() {
        
        for(let i = 0; i <= starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            body.appendChild(star);
            
            gsap.to(star,{
                opacity: 'random(0, 1)',
                duration: 'random(1, 10)',
                x: 'random(-5, 5)',
                y: 'random(-5, 5)',
                rotate: 'random(-90, 90)',
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        }
    }

    createStars();
    
})();


//----------------------------------------------------------------------------------//


//Other GSAP
(() => {

    
    gsap.fromTo('header img', 
        { 
            scale: 0, 
            opacity: 0 
        }, 
        { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: 'back.out' 
        }
    );
    
    gsap.fromTo('header p', 
        { 
            y: -50, 
            opacity: 0 
        }, 
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            delay: 0.5 
        }
    );

    gsap.to('.nav-btn', {
        scale: 1.05,
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

})();