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
      'answer': 1
    }
  ];

  const $openingWrap   = $('#js-opening-wrap');  // オープニング画面
  const $questionWrap  = $('#js-question-wrap'); // 問題画面
  const $resultWrap    = $('#js-result-wrap');   // リザルト画面
  let questionCount    = 0;                      // 問題番号(0を1番目とする)
  let answerArr        = [];                     // 選択肢
  let correctAnswerArr = [];                     // 正解選択肢
  let selectAnswerArr  = []                     // ユーザーが選んだ選択肢

  // 画面初期化
  function init() {
    // オープニングを表示させそれ以外を非表示にする
    $openingWrap.show();
    $questionWrap.hide();
    $resultWrap.hide();

    // 開始するボタン押下で問題画面に切り替え、問題を表示させる
    $('#js-btn-start').on('click', function () {
      $openingWrap.fadeOut(500, function () {
        $questionWrap.fadeIn(500);
        showQuestion();
      });
    });
  }

  // 問題表示
  function showQuestion() {
    const $questionNum  = $('#js-question-num');  // 問題番号の画面表示
    const $questionText = $('#js-question-text'); // 問題文の画面表示
    const $answerArea   = $('#js-answer-area');   // 選択肢表示領域

    // 問題番号表示(第x問)
    $questionNum.text(questionsData[questionCount]['id']);

    // 問題文表示
    $questionText.text(questionsData[questionCount]['text']);

    // 四択回答初期化&生成表示
    answerArr = [];
    for (let i = 0; i < questionsData[questionCount]['choice'].length; i++) {
      answerArr.push(`<li class="choice" data-id=${i}>${questionsData[questionCount]['choice'][i]}</li>`);
    }
    $answerArea.html(answerArr.join(''));

    // 正解番号
    correctAnswerArr.push(questionsData[questionCount]['answer']);

    // 問題番号インクリメント
    questionCount++;

    choiseAnswer();
  }

  // 回答選択
  function choiseAnswer() {
    const choices = $('.choice');

    // 選択肢を押下したとき
    choices.on('click', function () {

      // 押下した選択肢を格納(リザルト画面でスコア表示に使用)
      selectAnswerArr.push(this.dataset.id);

      // 残り問題数によって分岐
      if (questionsData[questionCount] === undefined) {
        // リザルト画面表示
        showResult();
      } else {
        // 次の問題を表示
        showQuestion();
      }
    });
  }

  // リザルト画面
  function showResult() {
    // 合計問題数を表示
    $('#js-result-total-question').text(questionCount)

    // 正解数を計算し表示
    let resultTotalScore = 0;
    for (let i = 0; i < correctAnswerArr.length; i++) {
      if (correctAnswerArr[i] == selectAnswerArr[i]) {
        resultTotalScore++;
      }
    }
    $('#js-result-total-score').text(resultTotalScore);

    // 正解数に応じたコメントを表示
    const resultCommentJudge = resultTotalScore / correctAnswerArr.length;
    let resultComment = '';
    if (resultCommentJudge === 1) {
      resultComment = '全問正解！　素晴らしい٩(๑òωó๑)۶';
    } else if (resultCommentJudge > 0.8) {
      resultComment = 'あと少しで全問正解！';
    } else if (resultCommentJudge > 0.5) {
      resultComment = '頑張りましょう';
    } else if (resultCommentJudge > 0.3) {
      resultComment = '精進が足りません';
    } else {
      resultComment = 'マジ？';
    }
    $('#js-result-comment').text(resultComment);

    // リザルト画面表示
    $questionWrap.fadeOut(500, function () {
      $resultWrap.fadeIn(500);
    });
  }

  init();
})();
