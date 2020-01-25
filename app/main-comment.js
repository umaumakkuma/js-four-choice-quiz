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
    // オープニングを表示させそれ以外を非表示にする

    // 開始するボタン押下で問題画面に切り替え、問題を表示させる

  // 画面切り替え

  // 問題表示

    // 問題番号表示(第x問)

    // 問題文表示

    // 四択回答初期化&生成表示

    // 正解番号

    // 問題番号インクリメント


  // 回答選択

    // 選択肢を押下したとき

      // 押下した選択肢を格納(リザルト画面でスコア表示に使用)

      // 残り問題数によって分岐
        // リザルト画面表示
        // 次の問題を表示

  // リザルト画面
    // 合計問題数を表示

    // 正解数を計算し表示

    // 正解数に応じたコメントを表示

    // リザルト画面表示

})();
