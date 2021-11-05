const prompt_texts = {
    1: "Your city wants to build a new power plant.\nThe power plant would guarantee an increase in everyone\'s income by boosting the economy.\nBut it also comes with the risk of decreasing the lifespan of people in your city.",
    2: "A power plant is being planned to be built in either your city or your neighboring city.\nThe power plant would guarantee an increase in everyone in both city\'s (including you) income by boosting the economy.\nBut it also comes with the risk of decreasing the lifespan of people in the city it is built.\nYou are a resident of <b>city  <a id=\'city\'></a></b>."
}


const emojis = {
    downarrow:'↓'
} 
// const icon_list = [
//     'The 👥 icon represents the population of the city.',
//     'The $$$ sign represents the income increase.',
//     'The 💓 icon represents the expected lifespan.'
// ]

const prompt = city => `The nation of cities C1 and C2 want to build a new power plant.
The power plant would guarantee an increase in everyone in the nation's (including you) income by
boosting the economy.
But it also comes with the risk of decreasing the lifespan of people in the city it is built.
If a power plant is not built in your city, it will <b>not</b> have any negative effects on you, but
it will still affect the residents of that city only. If it is built in your city, everyone in your
city (including you) face the risk.
You are a resident of <b>city ${city}</b>.`

const tostr = num =>
    Math.abs(num) > 1
        ? num > 0 
            ? `+${num} years`
            : `${num} years`
        : num===0
            ? 'No change'
            : `${num} year`

const settings = {
    num_questions: 4,
    qtypes:[['pos','pos','none'],
            ['neg','pos','none'],
            ['neg','neg','none'],
            ['pos','neg','none']],
    cities:      [{ low: 2000,
                    high: 5001,
                    step:500,
                    name:'C1',
                    text: 'Build in C1'
                },{ low: 100,
                    high: 1001,
                    step:100,
                    name:'C2',
                    text: 'Build in C2'
                },{ low:0,
                    high:1,
                    step:1,
                    name:'Do nothing',
                    text: 'Do nothing'
                }],
    features: [{    name: 'lifespan decrease',
                    icon: '💓',
                    type: 'randomgen',
                    before: 0,
                    beforetext:'No change',
                    neg:-10,
                    pos:21,
                    step:1,
                    none:1,
                }]
}