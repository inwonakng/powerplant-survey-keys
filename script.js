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
    } else {
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

    let circle = new Path2D();  // <<< Declaration
    circle.arc(centerX, centerY, args.side/2-20, 0, 2 * Math.PI, false);

    context.lineWidth = 3;
    context.strokeStyle = args.color;
    context.stroke(circle);  // <<< pass circle here too
}

const makediagram = (setup,idx,args) => 
    $('<div>',{class:'diagrams'}).append(
        setup[idx].cities.map(c=>
            $('<div>',).append(
                $('<a>',{html:c.name}),
                $('<div>',{class:'container'}).append(
                    $('<div>', {class:'overlay'}).append(
                        $('<div>',{class:'table-cont'}).append(
                            $('<table>').append(
                                c.features.map(f=>
                                    $('<tr>').append(
                                        $('<td>',{html:f.icon,class:'icons'}),
                                        $('<td>',{html:f.beforetext})
                                )[0]),
                                $('<tr>').append(
                                    $('<td>',{html:emojis.downarrow,colspan:2,class:'downarrow'})
                                ),
                                c.features.map(f=>
                                    $('<tr>').append(
                                        $('<td>',{html:f.icon,class:'icons'}),
                                        $('<td>',{html:tostr(f.after)})
                                )[0]),
                            )
                        )
                    ),
                    $('<canvas>').attr({width:args.diagram.side,height:args.diagram.side}),
                )
            )[0]
        )
    )

//=================================
//    STUFF RELATED TO INPUTS    
//=================================

const makeinputs = (setup,idx,args) => 
    $('<div>',{class:'input-cont'})

const makequestion = (setup,idx,args) => {
    canvases = [$('<canvas>'),$('<canvas>'),$('<canvas>')]

    question = $('<div>',{class:'question'}).append(
                    $('<h3>',{html:`Scenario ${idx+1}`}),
                    $('<div>',{class:'prompt'}).append(
                        $('<p>',{html:prompt(setup[idx].user_city)}),
                        $('<ul>'),
                        $('<p>')
                    ),
                    $('<div>').append(
                        makediagram(setup,idx,args)
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


//=================================
//            DRIVER    
//=================================

$(document).ready(() => {
    var diagram_side = ($(window).width()*.8)/3
    var setup = []
    for(let t of settings.qtypes){
        uc = genRanNums(2,1)[0]
        setup.push({
                    user_city:`C${uc+1}`,
                    uc:uc,
                    cities: settings.cities.map((c,i)=>({
                        name:c.name,
                        text: t.text,
                        pop: c.low + genRanNums((c.high-c.low)/c.step,1)[0]*c.step,
                        features: settings.features.map(f=>
                            ({  ...f,
                                after:genRanNums(f[t[i]])[0]
                        }))
                    }))
                    })
    }

    $('#setup').val(JSON.stringify(setup))

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

    

    // $('#promptbody').html(prompt(usercity))

    //  use this functions to skip pages to debug
    //  accept()
    //  showsurvey()
    //  next()
    //  next()
    //  next()
    //  next()
})