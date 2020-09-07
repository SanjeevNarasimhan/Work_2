let seconds = 60;
let displaySeconds = 0;
let interval = null;
let status = "stopped";
function stopWatch(){

    seconds--;
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    document.getElementById("display").innerHTML = "Time:" + displaySeconds;
if(displaySeconds=="00")
{
    showScores();

}
}



function startStop(){

    if(status === "stopped"){

        
        interval = window.setInterval(stopWatch, 1000);
        
        status = "started";

    }
    else{

        window.clearInterval(interval);
        
        status = "stopped";

    }

}




function Question(text, choices, answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}
Question.prototype.correctanswer=function(choice){
    return choice === this.answer;
}
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}



Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
    
}

Quiz.prototype.guess = function(answer,id) {
    if(this.getQuestionIndex().correctanswer(answer)) {
        this.score++;
        document.getElementById(id).style.backgroundColor="green";
        
        }    
    else{
        document.getElementById(id).style.backgroundColor="red";
    }
    setTimeout(function(){
    document.getElementById(id).style.backgroundColor="grey";},100);
    this.questionIndex++;
    
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.next = function(){
    this.questionIndex++;
}

Quiz.prototype.previous = function(){
    this.questionIndex--;
}
function move() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
    
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("ch" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

       
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess,id);
        move();
    }
};


function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    var correct=quiz.score+1;
    var wrong=10-correct;
    finalscore=(correct*4)-(wrong*2);
    if(finalscore>=40){
    gameOverHTML += "<h2 id='score'>"+ name +  ",Your score is " + "40" +  "</h2>";
    }
    else{
        gameOverHTML += "<h2 id='score'>" + name + ",Your score is " + finalscore + "</h2>";   
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Where did COVID-19 originate?", ["China", "Russia","India", "USA"], "China"),
    new Question("What is the distance to be maintained to prevent the spread?", ["2ft", "6ft", "25ft", "33ft"], "6ft"),
    new Question("What is the source of Corona Virus?", ["SARS-CoV2", "Common COld","SARS-Cov-8", "Hepatitis-A"], "SARS-CoV2"),
    new Question("The most affected country in the world?",["USA", "Sri Lanka", "Canada", "India"], "USA"),
    new Question("Mild Symptoms of Corona Virus?",["Cough", "Fever", "Shortness of breath", "All the above"], "All the above"),
    new Question("A disease that can be transmitted to humans from animals is ?",["Stenotic","Hypnotic","Zoonatic","None of these"],"Zoonatic"),
    new Question("Which is most Widespread?",["Outbreak","Epidemic","Pandemic","None of these"],"Pandemic"),
    new Question("After showing symptoms you should be in _______ for 14 days?",["Stay at home","Self-isolate","Quarentine","None of these"],"Self-isolate"),
    new Question("From where coronavirus got its name?",["Crown-like projections","Leaf-like projections","Rectangle Structure","None of these"],"Crown-like projections"),
    new Question("Thailand tested its novel coronavirus vaccine on which animal/bird?",["Monkey","Lizards","Hens","Kites"],"Monkeys")
    
];

// create quiz
var quiz = new Quiz(questions);

// display quiz

var name=prompt("Enter your name:");
if(name==""){
    var name=prompt("Please Enter your name:")
}
move();
startStop();
var next=document.getElementById('next');
next.onclick=function()
{
    move();
}

var previous=document.getElementById('previous');
previous.onclick=function()
{
    quiz.previous();
    if(quiz.questionIndex<0)
    {
        alert("This is the first question");
    }
    else
    {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    var choices = quiz.getQuestionIndex().choices;
    for(var i = 0; i < choices.length; i++) {
        var element = document.getElementById("ch" + i);
        element.innerHTML = choices[i];
        guess("btn" + i, choices[i]);
        
    }
    }

}