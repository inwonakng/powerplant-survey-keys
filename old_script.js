var options_set = false
var suggestion_on = true


var num_questions = 4
var qset = genRanNums(1000,1)
var cur_index= -1
var cities = ['c1', 'c2']

$(document).ready(() => {
    //  setting user city randomly
    cityindex = genRanNums(cities.length, 1)
    usercity = cities[cityindex]
    $('#region').html(usercity)
    $('#usercity').val(usercity)

    $('#icon_list').html(icon_list)

    num_cities = genRanNums(2, 1)[0] + 1

    $('num_city').val(num_cities)

    $('promptbody').html(prompt_texts[num_cities])

    $("#gender").prop('selectedIndex', -1)
    $("#education").prop('selectedIndex', -1)
    $("#agegroup").prop('selectedIndex', -1)

    for(i = 0; i < num_questions; i++){
        makequestion()
    }
    $('#questions').children().hide()
    $('#questions').children().first().show()
    $('scenario').html(`Scearnio 1`)
    $('qindex').html(`1/${num_questions+1}`)

    $('#prevbtn').prop('disabled',true)
    cur_index=0

    //  use this functions to skip pages to debug
    //  accept()
    //  showsurvey()
    //  next()
    //  next()
    //  next()
    //  next()
})

// function set_text(num, num_cities) {
//     vari = plant_story[num]
//     usercity = $('#usercity').val().toLowerCase()

//     for (i = 0; i < num_questions; i++) {
//         if (num_cities == 2) {
//             ac = vari[i]['affected'][0].toLowerCase()
//             ikey = 'u_' + usercity + '_p_' + ac
//         } else {
//             ikey = 'onecity'
//         }

//         document.getElementById('q' + i + 'diagram').src = makelink(ikey)
//         document.getElementById('q' + i + 'c1pop').innerHTML = vari[i]['C1']
//         if (num_cities == 2) {
//             document.getElementById('q' + i + 'c2pop').innerHTML = vari[i]['C2']
//         }
//     }
//     document.getElementById('optionset').value = num.toString()
// }

function makequestion(){
    var idx = $('#questions').children().length

    vari = plant_story[qset][idx]
    // if (genRanNums(2, 1)[0] + 1 == 2) {
        ac = vari['affected'][0].toLowerCase()
        ikey = 'u_' + usercity + '_p_' + ac
    // } else {
    //     ikey = 'onecity'
    // }

    $('#questions').append(
        $('<div>',{class:'question'}).append(
            `<div>
                <h4>Proposal</h4>
                <div class="imgbox">
                    <img id="diagram"
                        src="${makelink(ikey)}">
                    <b>
                        <bigpop id="c1pop">${vari['C1']}</bigpop>
                    </b>
                    <b>
                        <smallpop id="c2pop">${vari['C2']}</smallpop>
                    </b>
                </div>
            </div>`
        ).append(
            `<l style="display:flex;align-items:center;">
                <crowd-radio-group required>
                    <crowd-radio-button name="q0_yes" value="yes">Yes</crowd-radio-button>
                    <crowd-radio-button name="q0_no" value="no">No</crowd-radio-button>
                </crowd-radio-group>
            </l>`    
        )
    )
    $('#optionset').val(idx.toString())
}

$('#nextbtn').click(e => {
    var idx = $('#questions').children().index($('#questions .question:visible'))
    console.log(idx)
    
    if(idx == num_questions -2){
        $('#nextbtn').prop('disabled',true)
    }

    if(idx < num_questions){
        $('#questions').children().hide()
        $('#questions').children().eq(idx+1).show()
        $('#prevbtn').prop('disabled',false)
    }
    $('#scenario').html(`Scearnio ${idx+2}`)
})

$('#prevbtn').click(e=>{
    var idx = $('#questions').children().index($('#questions .question:visible'))
    console.log(idx)
    
    if(idx == 1){
        $('#prevbtn').prop('disabled',true)
    }

    if(idx > 0){
        $('#questions').children().hide()
        $('#questions').children().eq(idx-1).show()
    }
    $('#scenario').html(`Scearnio ${idx}`)
})


// function next() {
//     var show_index
//     //   console.log('okay..')
//     for (i = 0; i < questions.length; i++) {
//         if (questions[i].style.display != 'none' && i < questions.length - 1) {
//             //  console.log('found'+i)
//             document.getElementById('prompt').style.display = 'block'
//             document.getElementById('prevbtn').disabled = false
//             show_index = i + 2
//             questions[i].style.display = 'none'
//             questions[i + 1].style.display = 'block'
//             document.getElementById('scenario').scrollIntoView()
//             document.getElementById('qindex').text = show_index + '/' + questions.length
//             document.getElementById('scenario').innerHTML = 'Scenario ' + show_index
            
//             if (i == questions.length - 2) {
//                 document.getElementById('nextbtn').disabled = true
//                 if (suggestion_on) {
//                     document.getElementById('scenario').innerHTML = 'Final Question'
//                     document.getElementById('prompt').style.display = 'none'
//                 }
//             }
//             if (i == questions.length - 3) {
//                 document.getElementById('nextbtn').disabled = true
//                     document.getElementById('scenario').innerHTML = 'Demographic Question'
//                     document.getElementById('prompt').style.display = 'none'
//             }
//             break
//         }
//     }
// }

// function prev() {
//     var show_index
//     for (i = 0; i < questions.length; i++) {
//         if (questions[i].style.display != 'none' && i > 0) {
//             document.getElementById('prompt').style.display = 'block'
//             document.getElementById('nextbtn').disabled = false
//             show_index = i
//             questions[i].style.display = 'none'
//             questions[i - 1].style.display = 'block'
//             document.getElementById('scenario').scrollIntoView()
//             // display[i] = 0
//             // display[i-1] = 1
//             document.getElementById('qindex').text = show_index + '/' + questions.length
//             document.getElementById('scenario').innerHTML = 'Scenario ' + show_index
//             if (i == 1) {
//                 document.getElementById('prevbtn').disabled = true
//             }
//             break
//         }
//     }
// }

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
    return `https://cdn.jsdelivr.net/gh/inwonakng/powerplant-survey-keys@latest/imgs/${key}.jpg`
}