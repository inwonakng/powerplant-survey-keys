window.onload = chooseOptions
var options_set = false
var suggestion_on = true
var questions = [document.getElementById('q0'),
document.getElementById('q1'),
document.getElementById('q2'),
document.getElementById('q3'),
document.getElementById('q4'),
document.getElementById('q5')]

var num_questions = 4

var cities = ['C1', 'C2']

$(document).ready(() => {
    //  setting user city randomly
    cityindex = genRanNums(cities.length, 1)
    usercity = cities[cityindex]
    document.getElementById('region').innerHTML = usercity
    document.getElementById('usercity').value = usercity

    document.getElementById('icon_list').innerHTML = icon_list

    num_cities = genRanNums(2, 1)[0] + 1

    document.getElementById('num_city').value = num_cities

    document.getElementById('promptbody').innerHTML = prompt_texts[num_cities]

    rannums = genRanNums(1000, 1)

    set_text(rannums[0], num_cities)

    document.getElementById("gender").selectedIndex = -1
    document.getElementById("education").selectedIndex = -1
    document.getElementById("agegroup").selectedIndex = -1

    document.getElementById('qindex').innerHTML = '1/' + questions.length

    options_set = true

    //  use this functions to skip pages to debug
    //  accept()
    //  showsurvey()
    //  next()
    //  next()
    //  next()
    //  next()
})

function next() {
    var show_index
    //   console.log('okay..')
    for (i = 0; i < questions.length; i++) {
        if (questions[i].style.display != 'none' && i < questions.length - 1) {
            //  console.log('found'+i)
            document.getElementById('prompt').style.display = 'block'
            document.getElementById('prevbtn').disabled = false
            show_index = i + 2
            questions[i].style.display = 'none'
            questions[i + 1].style.display = 'block'
            document.getElementById('scenario').scrollIntoView()
            document.getElementById('qindex').text = show_index + '/' + questions.length
            document.getElementById('scenario').innerHTML = 'Scenario ' + show_index
            if (i == questions.length - 2) {
                document.getElementById('nextbtn').disabled = true
                if (suggestion_on) {
                    document.getElementById('scenario').innerHTML = 'Final Question'
                    document.getElementById('prompt').style.display = 'none'
                }
            }
            break
        }
    }
}

function prev() {
    var show_index
    for (i = 0; i < questions.length; i++) {
        if (questions[i].style.display != 'none' && i > 0) {
            document.getElementById('prompt').style.display = 'block'
            document.getElementById('nextbtn').disabled = false
            show_index = i
            questions[i].style.display = 'none'
            questions[i - 1].style.display = 'block'
            document.getElementById('scenario').scrollIntoView()
            // display[i] = 0
            // display[i-1] = 1
            document.getElementById('qindex').text = show_index + '/' + questions.length
            document.getElementById('scenario').innerHTML = 'Scenario ' + show_index
            if (i == 1) {
                document.getElementById('prevbtn').disabled = true
            }
            break
        }
    }
}

function accept() {
    document.getElementById("consentform").style.display = 'none'
    document.getElementById('survey').style.display = 'block'
}

function goback() {
    window.history.back()
}

function genRanNums(thres, count) {
    arr = []
    arr.push(Math.floor(Math.random() * thres))
    while (arr.length < count) {
        n = Math.floor(Math.random() * thres)
        while (arr.includes(n)) {
            n = Math.floor(Math.random() * thres)
        }
        arr.push(n)
    }
    return arr
}

function set_text(num, num_cities) {
    vari = plant_story[num]
    usercity = document.getElementById('usercity').value.toLowerCase()

    for (i = 0; i < 4; i++) {
        if (num_cities == 2) {
            ac = vari[i]['affected'][0].toLowerCase()
            ikey = 'u_' + usercity + '_p_' + ac
        } else {
            ikey = 'onecity'
        }

        document.getElementById('q' + i + 'diagram').src = makelink(ikey)
        document.getElementById('q' + i + 'c1pop').innerHTML = vari[i]['C1']
        if (num_cities == 2) {
            document.getElementById('q' + i + 'c2pop').innerHTML = vari[i]['C2']
        }
    }
    document.getElementById('optionset').value = num.toString()
}

function wordcount(box, v) {
    words = v.split(/\b\W+\b/)
    if (words.length == 1 && $.trim(words[0]).length == 0) {
        box.innerHTML = '<small>' + 0 + '</small>'
    } else {
        box.innerHTML = '<small>' + words.length + '</small>'
    }
}

function showsurvey() {
    document.getElementById('demographics').style.display = 'none'
    document.getElementById('realsurvey').style.display = 'block'
}

function makelink(key) {
    return `https://cdn.jsdelivr.net/gh/inwonakng/powerplant-survey-keys@master/imgs/${key}.jpg`
}