(function () {
  'use strict';
  // 問題定義
  const questionsData = [
    {
      'id': 1,
      'text': '日本の首都は？',
      'choice': ['東京', '北千住', '静岡', '札幌'],
      'answer': 0
    },
    {
      'id': 2,
      'text': 'iPhoneの最新モデルは？',
      'choice': ['9', '10', '11', '12'],
      'answer': 2
    },
    {
      'id': 3,
      'text': '鰯の読み方は？',
      'choice': ['くじら', 'いわし', 'まぐろ', 'ひらめ'],
      'answer': 0
    }
  ];

  const $openingWrap = $('#js-opening-wrap');
  const $questionWrap = $('#js-question-wrap');
  const $resultWrap = $('#js-result-wrap');
  let questionCount = 0;
  let $questionNum = $('#js-question-num');
  let $questionText = $('#js-question-text');
  const $answerArea = $('#js-answer-area');
  let answerList = [];
  let correctAnswerList = [];
  let selectAnswerList = [];

  // 画面初期化
  function init() {
    $openingWrap.show();
    $questionWrap.hide();
    $resultWrap.hide();

    $('#js-btn-start').on('click', function() {
      $openingWrap.fadeOut(500, function() {
        $questionWrap.fadeIn(500);
        showQuestion();
      });
    });
  }

  // 問題表示
  function showQuestion() {
    // 問題番号表示(第x問)
    $questionNum.html(questionsData[questionCount]['id']);

    // 問題文表示
    $questionText.html(questionsData[questionCount]['text']);

    // 四択回答初期化&生成表示
    answerList = [];
    for (let i = 0; i < questionsData[questionCount]['choice'].length; i++) {
      answerList.push(`<li class="choice" data-id=${i}>${questionsData[questionCount]['choice'][i]}</li>`);
    }
    $answerArea.html(answerList.join(''));

    // 正解番号
    correctAnswerList.push(questionsData[questionCount]['answer']);
console.log(correctAnswerList, 'コレクトアンサー');
    // 問題番号インクリメント
    questionCount++;

    choiseAnswer();
  }

  // 回答選択
  function choiseAnswer() {
    let choices = $('.choice');
    choices.on('click', function () {
    selectAnswerList.push(this.dataset.id);
    console.log(selectAnswerList, 'チェックアンサー');
      if (questionsData[questionCount] === undefined) {
        $('#js-result-total-question').html(questionCount)
        // コレクトアンサーとセレクトアンサーリストで合っている数を数える
        // $('#js-result-total-answer').html()
        $questionWrap.fadeOut(500, function() {
          $resultWrap.fadeIn(500);
        });
      } else {
        showQuestion();
      }
    });
  }
  init();
})();
