const prompt_texts = {
1: "Your city wants to build a new power plant.\nThe power plant would guarantee an increase in everyone\'s income by boosting the economy.\nBut it also comes with the risk of decreasing the lifespan of people in your city.",
2: "A power plant is being planned to be built in either your city or your neighboring city.\nThe power plant would guarantee an increase in everyone in both city\'s (including you) income by boosting the economy.\nBut it also comes with the risk of decreasing the lifespan of people in the city it is built.\nYou are a resident of <b>city  <a id=\'city\'></a></b>."
}

const icon_list = '<li>The 👥 icon represents the population of the city. </li><li>The $$$ sign represents the income increase. </li><li>The 💓 icon represents the expected lifespan. </li>'

const prompt = city => `The nation of cities C1 and C2 want to build a new power plant.
The power plant would guarantee an increase in everyone in the nation's (including you) income by
boosting the economy.
But it also comes with the risk of decreasing the lifespan of people in the city it is built.
If a power plant is not built in your city, it will <b>not</b> have any negative effects on you, but
it will still affect the residents of that city only. If it is built in your city, everyone in your
city (including you) face the risk.
You are a resident of <b>city ${city}</b>.`

const settings = {
    num_questions: 4,
    big_city: {
        low: 2000,
        high: 5000,
        step:500
    },
    small_city: {
        low: 100,
        high: 1000,
        step:100
    },
    features: [
        { 
            name: 'lifespan',
            type: 'randomgen',
            low: 0,
            high:10,
            step:1
        }
    ]
}