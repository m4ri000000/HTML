fetch('https://pokeapi.co/api/v2/pokemon?limit=1500') //fetching all pokemon
  .then(response => response.json()) //converting response to json
  .then(data => { //parsing the data
    const pokemonList = data.results; //storing the results in a variable
    let currentIndex = 0; //initializing currentIndex to 0, I will use this to keep track of the current pokemon being displayed

    const typeColors = { //defining colors for each type
      fire: 'red',
      grass: 'green',
      water: 'lightblue',
      electric: 'yellow',
      psychic: 'pink',
      ice: 'cyan',
      dragon: 'purple',
      dark: '#404040',
      fairy: 'lightpink',
      normal: 'gray',
      fighting: 'brown',
      flying: 'skyblue',
      poison: 'violet',
      ground: 'sandybrown',
      rock: 'darkgray',
      bug: 'limegreen',
      ghost: 'indigo',
      steel: 'silver'
    };

    const pokemonDiv = document.getElementById('pokemon-container'); //getting the div where I will display the pokemon 
    pokemonDiv.className = 'pokemon-container'; //adding class to the div

    function displayPokemon(index) { //function to display the pokemon
      const PokemonUrl = pokemonList[index].url; //getting the url of the pokemon   

      fetch(PokemonUrl) //fetching the pokemon details
        .then(response => response.json())  //converting response to json
        .then(pokemonDetails => { //parsing the data
          const spriteUrl = pokemonDetails.sprites.front_default; //getting the sprite url
          const typesList = pokemonDetails.types.map(typeInfo => { //mapping through the types array to get the type name and color
            const typeName = typeInfo.type.name; //getting the type name
            const typeColor = typeColors[typeName] || 'white'; //setting the type color, defaulting to white if not found
            return `<li style="background-color: ${typeColor};">${typeName}</li>`; //returning the list item with the type name and color
          }).join(''); //joining the list items to form a string

          //now I will set the innerHTML of the pokemonDiv to display the pokemon details
          pokemonDiv.innerHTML = `
            <div class="pokemon-card">
              <div class="jump-controls">
                <input type="number" id="poke-number-input" placeholder="Enter #1–1302">
                <button id="jump-btn">Go</button>
              </div>
              <h1>${pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h1>
              <div class="image-button-wrapper">
                <button id="prev-btn">&larr;</button>
                <img src="${spriteUrl}" alt="${pokemonDetails.name}">
                <button id="next-btn">&rarr;</button>
              </div>
              <h2>Types:</h2>
              <ul>
                ${typesList}
              </ul>
            </div>
          `;

          document.getElementById('prev-btn').addEventListener('click', () => { //adding event listener to the previous button
            if (currentIndex > 0) {
              currentIndex--;
              displayPokemon(currentIndex);
            }
          });

          document.getElementById('next-btn').addEventListener('click', () => { //adding event listener to the next button
            if (currentIndex < pokemonList.length - 1) { //checking if currentIndex is less than the length of the pokemonList
              currentIndex++;
              displayPokemon(currentIndex);
            }
          });

          document.getElementById('jump-btn').addEventListener('click', () => { //adding event listener to the jump button
            const input = document.getElementById('poke-number-input'); //getting the input value
            const index = parseInt(input.value) - 1; //converting the input value to an integer and subtracting 1 to get the correct index (pokemon 0 will be pokemon 1)
            if (index >= 0 && index < pokemonList.length) { //checking if the index is valid
              currentIndex = index;
              displayPokemon(currentIndex);
            } else {
              alert('Please enter a number between 1 and 900.');
            }
          });
        });
    }
    displayPokemon(currentIndex); //displaying the first pokemon
  })
  .catch(error => {
    console.error('Fetch error:', error.message);
  });

/* 
the reason I'm using two fetch calls is because the PokéAPI uses a system called pagination and detail URLs to avoid sending too much information at once.
The first fetch only retrieves basic data for each Pokémon, including a link to the URL that contains all the details.
Instead of getting all the detailed information for all Pokémon upfront,I only use the second fetch to load that data *on demand*, for the specific Pokémon the user selects.
This makes the app faster and more efficient, since it loads detailed information only when it's needed.
*/