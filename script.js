var options_set = false
var suggestion_on = true

var diagram_side = ($(window).width()*.8)/3


//=================================
//    MISCELANEOUS    
//=================================


const genRanNums = (thres, count) => {
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

const wordcount = (box, v) => {
    words = v.split(/\b\W+\b/)
    if (words.length == 1 && $.trim(words[0]).length == 0) {
        box.innerHTML = '<small>' + 0 + '</small>'
    } else {https://inwonakng.github.io/powerplant-survey-keys/imgs/onecity.jpg
        box.innerHTML = '<small>' + words.length + '</small>'
    }
}


const makelink = key => {
    return `https://inwonakng.github.io/powerplant-survey-keys/imgs/${key}.jpg`
}


//=================================
//    STUFF RELATED TO DIAGRAMS    
//=================================

const drawcircle = (canvas,args) => {
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    // var radius = canvas.width>canvas.height ? canvas.height/2-5 : canvas.width/2-5;

    let circle = new Path2D();  // <<< Declaration
    circle.arc(centerX, centerY, args.side/2-20, 0, 2 * Math.PI, false);

    context.lineWidth = 3;
    context.strokeStyle = args.color;
    context.stroke(circle);  // <<< pass circle here too
}

const makequestion = (setup,idx,args) =>{
    canvases = [$('<canvas>'),$('<canvas>'),$('<canvas>')]

    question = $('<div>',{class:'question'}).append(
                    $('<h3>',{html:`Scenario ${idx+1}`}),
                    $('<div>',{class:'prompt'}).append(
                        $('<p>',{html:prompt(setup[idx].user_city)}),
                        $('<ul>'),
                        $('<p>')
                    ),
                    $('<div>').append(
                        $('<h4>',{class:'question'}),
                        $('<div>',{class:'diagrams'}).append(
                            $('<canvas>').attr({width:args.diagram.side,height:args.diagram.side}),
                            $('<canvas>').attr({width:args.diagram.side,height:args.diagram.side}),
                            $('<canvas>').attr({width:args.diagram.side,height:args.diagram.side})
                            // $('<img>',{src:makelink(ikey)}),
                            // $('<b>').append(
                            //     $('<bigpop>',{id:'c1pop',html:vari['C1']})
                            // ),
                            // $('<b>').append(
                            //     $('<smallpop>',{id:'c2pop',html:vari['C2']})
                            // )
                        )
                    )
                )

    canvases = question.find('canvas').toArray()
    drawcircle(canvases[0],{...args.diagram,color:'cyan',})
    drawcircle(canvases[1],{...args.diagram,color:'pink',})
    
    
    $('#questions').append(question)
}



//=================================
//    STUFF RELATED TO JQUERY    
//=================================

$('#nextbtn').click(e => {
    var idx = $('#questions').children().index($('#questions .question:visible'))
    $('#promptbody').html(prompt(setup[idx].user_city))
    console.log(idx)
    
    if(idx == settings.num_questions -2){
        $('#nextbtn').prop('disabled',true)
        $('#prevbtn').prop('disabled',false)
    }

    if(idx < settings.num_questions){
        $('#questions').children().hide()
        $('#questions').children().eq(idx+1).show()
        $('#prevbtn').prop('disabled',false)
    }
    $('#scenario').html(`Scearnio ${idx+2}`)
})

$('#prevbtn').click(e=>{
    var idx = $('#questions').children().index($('#questions .question:visible'))
    $('#promptbody').html(prompt(setup[idx].user_city))
    console.log(idx)
    
    if(idx == 1){
        $('#prevbtn').prop('disabled',true)
        $('#nextbtn').prop('disabled',false)
    }

    if(idx > 0){
        $('#questions').children().hide()
        $('#questions').children().eq(idx-1).show()
    }
    $('#scenario').html(`Scearnio ${idx}`)
})


$('#acceptbtn').click(()=>{
    $("#consentform").hide()
    $('#survey').show()
})

$('#rejectbtn').click(()=>{
    window.history.back()
})

$(document).ready(() => {
    var diagram_side = ($(window).width()*.8)/3

    var setup = []
    for(i = 0; i < settings.num_questions; i++){
        setup.push({user_city:`C${genRanNums(2,1)[0]+1}`})
    }
    //  setting user city randomly
    // $('#region').html(usercity)
    // $('#usercity').val(usercity)

    $('#icon_list').html(icon_list)

    num_cities = genRanNums(2, 1)[0] + 1

    $('num_city').val(num_cities)

    $('promptbody').html(prompt_texts[num_cities])

    $("#gender").prop('selectedIndex', -1)
    $("#education").prop('selectedIndex', -1)
    $("#agegroup").prop('selectedIndex', -1)

    for(i = 0; i < settings.num_questions; i++){
        makequestion(setup,i,{diagram:{side:diagram_side}})
    }
    $('#questions').children().hide()
    $('#questions').children().first().show()
    $('scenario').html(`Scearnio 1`)
    $('qindex').html(`1/${settings.num_questions+1}`)

    $('#prevbtn').prop('disabled',true)

    $('#setup').val(JSON.stringify(setup))

    // $('#promptbody').html(prompt(usercity))

    //  use this functions to skip pages to debug
    //  accept()
    //  showsurvey()
    //  next()
    //  next()
    //  next()
    //  next()
})