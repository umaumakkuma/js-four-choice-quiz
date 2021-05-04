(function () {
  'use strict';

  // 問題
  const questionsData = [
    {
      'id': 1,
      'text': '問題1',
      'choices': ['選択肢1(正解)', '選択肢2', '選択肢3', '選択肢4'],
      'answer': 0,
      'prizeMoney': 100,
      'fiftyFifty': [0, 1]
    },
    {
      'id': 2,
      'text': '問題2',
      'choices': ['選択肢1', '選択肢2(正解)', '選択肢3', '選択肢4'],
      'answer': 1,
      'prizeMoney': 1000,
      'fiftyFifty': [1, 3]
    },
    {
      'id': 3,
      'text': '問題3',
      'choices': ['選択肢1', '選択肢2', '選択肢3(正解)', '選択肢4'],
      'answer': 2,
      'prizeMoney': 10000,
      'fiftyFifty': [1, 2]
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

    const btnFiftyFifty = document.getElementById('js-btn-fifty-fifty');
    btnFiftyFifty.addEventListener('click', () => {
      fiftyFifty();
    });

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
      questionCount--;
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
        finalAnswer(choice);
      });
    });
  }

  const finalAnswer = choice => {
    const finalAnswerWrap = document.getElementById('js-final-answer-wrap')
    finalAnswerWrap.classList.remove('d-none');

    const btnCancelFinalAnswer = document.getElementById('js-btn-cancel-final-answer');
    const btnApplyFinalAnswer = document.getElementById('js-btn-apply-final-answer');

    btnCancelFinalAnswer.addEventListener('click', () => {
      // closeFinalAnswerWrap()
      finalAnswerWrap.classList.add('d-none');
    }, {once: true});

    btnApplyFinalAnswer.addEventListener('click', () => {
      // イベント多重発火を防ぐ
      if (!finalAnswerWrap.classList.contains('d-none')) {
        finalAnswerWrap.classList.add('d-none');
        judgeQuestion(choice);
      }
    }, {once: true});
  }

  const judgeQuestion = choice => {
    // 押下した選択肢を格納(リザルト画面でスコア表示に使用)
    // selectAnswerArr.push(choice.dataset.id);
    switchScene('judge');
    const resultJudgeCorrect = document.getElementById('js-result-judge-correct');
    const resultJudgeIncorrect = document.getElementById('js-result-judge-incorrect');

    resultJudgeCorrect.classList.add('d-none');
    resultJudgeIncorrect.classList.add('d-none');

    // 選択肢が正解の場合は
    if (Number(choice.dataset.id) === questionsData[questionCount]['answer']) {
      resultJudgeCorrect.classList.remove('d-none')
      setTimeout(() => {
        nextQuestion()
      }, 500);
    } else {
      // 最初に戻るボタンを表示
      resultJudgeIncorrect.classList.remove('d-none')
    }
  }

  const fiftyFifty = () => {
console.log('50:50');
    const fiftyFiftyWrap = document.getElementById('js-fifty-fifty-wrap')
    fiftyFiftyWrap.classList.remove('d-none');

    const btnCancelFiftyFifty = document.getElementById('js-btn-cancel-fifty-fifty');
    const btnApplyFiftyFifty = document.getElementById('js-btn-apply-fifty-fifty');

    btnCancelFiftyFifty.addEventListener('click', () => {
      fiftyFiftyWrap.classList.add('d-none');
    }, {once: true});

    btnApplyFiftyFifty.addEventListener('click', () => {
      // イベント多重発火を防ぐ
      if (!fiftyFiftyWrap.classList.contains('d-none')) {
        fiftyFiftyWrap.classList.add('d-none');
        const choices = document.querySelectorAll('.choice');
        const stayChoices = questionsData[questionCount]['fiftyFifty']
        choices.forEach((val, i) => {
          if (!stayChoices.includes(i)) {
            val.classList.add('v-hidden')
          }
        })
      }
    }, {once: true});
  }

  const dropOut = () => {
    switchScene('dropout');
    const btnApplyDropOut = document.getElementById('js-btn-apply-drop-out');
    const btnCancelDropOut = document.getElementById('js-btn-cancel-drop-out');

    btnApplyDropOut.addEventListener('click', () => {
      init();
    });

    btnCancelDropOut.addEventListener('click', () => {
      switchScene('question');
    });
  }

  // リザルト画面
  const showResult = () => {
    // リザルト画面表示
    switchScene('result');

    document.getElementById('js-total-prize-money').innerText = questionsData[questionCount]['prizeMoney'];
  }

  init();
})();
