(function () {
  'use strict';

  // 問題
  const questionsData = [
    {
      'id': 1,
      'text': '問題1',
      'choices': ['選択肢1(正解)', '選択肢2', '選択肢3', '選択肢4'],
      'answer': 0,
      'prizeMoney': 100
    },
    {
      'id': 2,
      'text': '問題2',
      'choices': ['選択肢1', '選択肢2(正解)', '選択肢3', '選択肢4'],
      'answer': 1,
      'prizeMoney': 1000
    },
    {
      'id': 3,
      'text': '問題3',
      'choices': ['選択肢1', '選択肢2', '選択肢3(正解)', '選択肢4'],
      'answer': 2,
      'prizeMoney': 10000
    }
  ];

  let questionCount    = 0;  // 問題番号(0を1番目とする)
  // let correctAnswerArr = []; // 正解選択肢
  // let selectAnswerArr  = []  // ユーザーが選んだ選択肢

  // 画面初期化
  const init = () => {
    questionCount = 0;
    switchScene('opening');

    // 開始するボタン押下で問題画面に切り替え、問題を表示させる
    const btnStart = document.getElementById('js-btn-start');
    btnStart.addEventListener('click', () => {
      switchScene('question');
      main()
    })

    const btnDropOut = document.getElementById('js-btn-drop-out');
    btnDropOut.addEventListener('click', () => {
      dropOut();
    });

    const btnBackToTop = document.querySelectorAll('.js-btn-back-to-top')
    btnBackToTop.forEach(val => {
      val.addEventListener('click', () => {
        init();
      });
    });
  }

  // 問題表示し正解番号を返却、次の問題へ
  const main = () => {
    switchScene('question');
    showQuestion();
    // correctAnswerArr.push(questionsData[questionCount]['answer']);
    choiceAnswer();
  }

  // 画面切り替え
  const switchScene = scene => {
    const openingWrap  = document.getElementById('js-opening-wrap');  // オープニング
    const questionWrap = document.getElementById('js-question-wrap'); // 問題
    const resultJudgeWrap = document.getElementById('js-result-judge-wrap');  // 判定
    const dropOutWrap = document.getElementById('js-drop-out-wrap');  // ドロップアウト
    const resultWrap   = document.getElementById('js-result-wrap');   // リザルト

    switch (scene) {
      case 'opening':
        openingWrap.classList.remove('d-none');
        questionWrap.classList.add('d-none');
        resultJudgeWrap.classList.add('d-none');
        dropOutWrap.classList.add('d-none');
        resultWrap.classList.add('d-none');
        break;
      case 'question':
        openingWrap.classList.add('d-none');
        questionWrap.classList.remove('d-none');
        resultJudgeWrap.classList.add('d-none');
        dropOutWrap.classList.add('d-none');
        resultWrap.classList.add('d-none');
        break;
      case 'judge':
        openingWrap.classList.add('d-none');
        questionWrap.classList.add('d-none');
        resultJudgeWrap.classList.remove('d-none');
        dropOutWrap.classList.add('d-none');
        resultWrap.classList.add('d-none');
        break;
      case 'dropout':
        openingWrap.classList.add('d-none');
        questionWrap.classList.add('d-none');
        resultJudgeWrap.classList.add('d-none');
        dropOutWrap.classList.remove('d-none');
        resultWrap.classList.add('d-none');
        break;
      case 'result':
        openingWrap.classList.add('d-none');
        questionWrap.classList.add('d-none');
        resultJudgeWrap.classList.add('d-none');
        dropOutWrap.classList.add('d-none');
        resultWrap.classList.remove('d-none');
        break;
    }
  }

  const nextQuestion = () => {
    // 問題番号インクリメント
    questionCount++;

    // 残り問題数によって分岐
    if (questionsData[questionCount] === undefined) {
      // リザルト画面表示
      showResult();
    } else {
      // 次の問題を表示
      main();
    }
  }

  // 問題表示
  const showQuestion = () => {
    document.getElementById('js-question-num').innerText = questionsData[questionCount]['id'];    // 問題番号(第x問)
    document.getElementById('js-question-text').innerText = questionsData[questionCount]['text']; // 問題文
    document.getElementById('js-prize-money').innerText = questionsData[questionCount]['prizeMoney']; // 賞金

    // 四択回答初期化&生成表示
    const answerArr = [];
    questionsData[questionCount]['choices'].forEach((val, i) => {
      answerArr.push(`<li class="choice" data-id=${i}>${questionsData[questionCount]['choices'][i]}</li>`);
    });

    document.getElementById('js-answer-area').innerHTML = answerArr.join('');
  }

  // 回答選択
  const choiceAnswer = () => {
    const choices = document.querySelectorAll('.choice');

    choices.forEach((choice) => {
      choice.addEventListener('click', () => {
        // 押下した選択肢を格納(リザルト画面でスコア表示に使用)
        // selectAnswerArr.push(choice.dataset.id);
        switchScene('judge');
        if (Number(choice.dataset.id) === questionsData[questionCount]['answer']) {
          document.getElementById('js-result-judge-correct').classList.remove('d-none')
          setTimeout(() => {
            nextQuestion()
          }, 500);
        } else {
          document.getElementById('js-result-judge-incorrect').classList.remove('d-none')
        }
      });
    });
  }

  const judgeQuestion = () => {
    
  }

  const dropOut = () => {
    switchScene('dropout');

  }

  // リザルト画面
  const showResult = () => {
    // // 合計問題数を表示
    // document.getElementById('js-result-total-question').innerText = questionCount;

    // // 正解数を計算し表示
    // let resultTotalScore = 0;
    // correctAnswerArr.forEach((val, i) => {
    //   if (val == selectAnswerArr[i]) {
    //     resultTotalScore++;
    //   }
    // });

    // document.getElementById('js-result-total-score').innerText = resultTotalScore;

    // // 正解数に応じたコメントを表示
    // const resultJudge = resultTotalScore / correctAnswerArr.length;
    // let resultComment = '';
    // if (resultJudge === 1) {
    //   resultComment = '全問正解！　素晴らしい٩(๑òωó๑)۶';
    // } else if (resultJudge > 0.8) {
    //   resultComment = 'あと少しで全問正解！';
    // } else if (resultJudge > 0.5) {
    //   resultComment = '頑張りましょう';
    // } else if (resultJudge > 0.3) {
    //   resultComment = '精進が足りません';
    // } else {
    //   resultComment = 'マジ？';
    // }
    // document.getElementById('js-result-comment').innerText = resultComment;

    // リザルト画面表示
    switchScene('result');
  }

  init();
})();
