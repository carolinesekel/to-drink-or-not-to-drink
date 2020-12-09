//for filters: on click, remove class selected from both, add to filter clicked

//use endpoint based on which filter is selected

const app = document.getElementById('root')

//container for cards
const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)


fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // Work with JSON data here
        console.log(data)
        data.drinks.forEach((drink) => {
            // Log each drink name
            console.log(drink.strDrink)
            var ingredientsList;
            var measuresList;
            const instructions = document.createElement('p')
            const recipe = document.createElement('div')
            recipe.setAttribute('class', 'recipe')

            //fetch drink details by idDrink
            var url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink.idDrink
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    // Work with JSON data here
                    console.log(data)
                        //only one drink in drinks array after fetch by id
                    currentDrink = data.drinks[0]
                        //save measures and ingredients to recipe 
                        //console.log(currentDrink.strIngredient1)
                    for (i = 1; i < 16; i++) {
                        console.log(i)
                        var currentMeasure = currentDrink["strMeasure" + i]
                        console.log(currentMeasure)
                        var currentIngredient = currentDrink["strIngredient" + i]
                        console.log(currentIngredient)
                            //measure can be null when ingredient is not 
                            //api seems to use both the empty string and null for the same purposes
                        if (currentIngredient == null || currentIngredient == "") {
                            console.log('no ingredient')
                                //no more ingredients left to display
                            break
                        }
                        const recipeLine = document.createElement('div')
                        recipeLine.setAttribute('class', 'recipe-line')
                        const measure = document.createElement('p')
                        measure.textContent = currentMeasure
                        recipeLine.appendChild(measure)
                        const ingredient = document.createElement('p')
                        ingredient.textContent = currentIngredient
                        recipeLine.appendChild(ingredient)
                        recipe.appendChild(recipeLine)
                            /*const test = document.createElement('p')
                            test.textContent = i
                            recipe.appendChild(test)*/
                    }
                    //save strInstructions in instrutions p 
                    instructions.textContent = currentDrink.strInstructions
                })
                .catch((err) => {
                    // Do something for an error here
                })
                //make card for each drink 
            const card = document.createElement('div')
            card.setAttribute('class', 'card')
                //inner needed to position front and back sides of card
            const cardInner = document.createElement('div')
            cardInner.setAttribute('class', 'card-inner')
                //front of card
            const cardFront = document.createElement('div')
            cardFront.setAttribute('class', 'card-front')
            const drinkName = document.createElement('p')
            drinkName.setAttribute('class', 'name')
            drinkName.textContent = drink.strDrink
            cardFront.appendChild(drinkName)
                //add recipe to front of card
            cardFront.appendChild(recipe)
                //back of card
            const cardBack = document.createElement('div')
            cardBack.setAttribute('class', 'card-back')
                //add instructions to back of card (element already created above)
            cardBack.appendChild(instructions)

            cardInner.appendChild(cardFront)
            cardInner.appendChild(cardBack)
            card.appendChild(cardInner)
            container.appendChild(card)
        })
    })
    .catch((err) => {
        // Do something for an error here
        console.log(err)
    })