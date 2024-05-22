import Mustache from 'mustachejs'

const url = `https://pokeapi.co/api/v2/pokemon?limit=10`
const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardsContainer = document.getElementById('cardsContainer')

const infoTemplate = document.getElementById('infoTemplate').innerHTML
const infoContainer = document.getElementById('infoContainer')


const bindClick = (name, pokemonData) => {
  const link = document.getElementById(name)
  link.addEventListener('click', (event) => {
    const pokemon = {
      name: pokemonData.name,
      imageURL: pokemonData.sprites.front_shiny,
      abilities: pokemonData.abilities.map((anAbility) => {
        return anAbility.ability.name
      }).join(', ')

    }
    const output = Mustache.render(infoTemplate, pokemon)
    infoContainer.innerHTML = output
  })
}


fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((result) => {
      const pokemonURL = result.url;
      fetch(pokemonURL)
        .then(response => response.json())
        .then((pokemonData) => {
          const pokemon = {
            name: pokemonData.name,
            imageURL: pokemonData.sprites.front_default,
            types: pokemonData.types.map((aType) => {
              return aType.type.name
            }).join(', ')
          }
          const output = Mustache.render(cardTemplate, pokemon)
          cardsContainer.insertAdjacentHTML('beforeend', output)
          bindClick(pokemonData.name, pokemonData)
        })
    })

  })
