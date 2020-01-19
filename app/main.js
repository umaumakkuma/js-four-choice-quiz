(function () {
  'use strict';
  const questionsData = [
    {
      'id': 1,
      'text': '日本の首都は？',
      'choice': ['東京', '北千住', '静岡', '札幌'],
      'answer': 0
    },
    {
      'id': 2,
      'text': '日本のほげほげは？',
      'choice': ['あいう', 'かきく', 'さしす', 'たちつ'],
      'answer': 2
    }
  ];
  let questionCount = 0;
  let questionNum = document.getElementById('question-num');
  let questionText = document.getElementById('question-text');
  let nextQuestion = document.getElementById('next-question');
  nextQuestion.style.display = 'none';
  const questionArea = document.getElementById('question-area');
  let question = []
  let answer = 0;

  for (let i = 0; i < questionsData[questionCount]['choice'].length; i++) {
    question.push(`<li class="choice" data-id=${i}>${questionsData[questionCount]['choice'][i]}</li>`);
  }
  questionNum.innerHTML = questionsData[questionCount]['id'];;
  questionText.innerHTML = questionsData[questionCount]['text'];;
  questionArea.innerHTML = question.join('');
  answer = questionsData[questionCount]['answer'];
  questionCount++;

  let choices = document.getElementsByClassName('choice')
  for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', function () {
      if (this.dataset.id == answer) {
        judge.innerHTML = '正解'
        console.log(nextQuestion);
        nextQuestion.style.display = 'block';
      } else {
        judge.innerHTML = '不正解'
        nextQuestion.style.display = 'none';
      }
      console.log(this.dataset.id);
    });
  }

  nextQuestion.addEventListener('click', function () {

  });

console.log(document.getElementsByClassName('choice'));

})();