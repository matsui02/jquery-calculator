// 電卓の状態を管理するオブジェクト
const calculator = {
  inputNumber: '',
  firstNumber: 0,
  secondNumber: 0,
  operator: '',
}

const result = document.getElementById('result')

// クリックされたボタンを取得
function getClickedButton() {
  const buttons = document.getElementsByClassName('button')
  const buttonsLen = buttons.length

  for (let i = 0; i < buttonsLen; i++) {
    buttons[i].addEventListener('click', function () {
      const currentValue = this.textContent

      if (isNotNumber(currentValue)) {
        operatorFunc(currentValue)
      } else {
        numberFunc(currentValue)
      }
    })
  }
}

// クリックされた要素が数字か確認
function isNotNumber(currentValue) {
  return isNaN(currentValue)
}

// 演算子に応じて処理を実行
function operatorFunc(currentValue) {
  switch (currentValue) {
    case '+':
    case '-':
    case '×':
    case '/':
      setFirstNumber(currentValue)
      break

    case '.':
      addDecimalPoint()
      break

    case 'AC':
      resetCalculator()
      break

    case '=': {
      setSecondNumber()

      const answer = calculate(
        calculator.firstNumber,
        calculator.secondNumber,
        calculator.operator,
      )

      displayResult(answer)
      break
    }
  }
}

// 小数点を追加
function addDecimalPoint() {
  if (!calculator.inputNumber.includes('.')) {
    calculator.inputNumber += '.'
    displayInputNumber()
  }
}

// 1つ目の数字と演算子を保存
function setFirstNumber(currentValue) {
  if (calculator.operator !== '') {
    // すでに演算子が設定されている場合の処理
    return
  }

  calculator.firstNumber = Number(calculator.inputNumber)
  calculator.operator = currentValue

  result.textContent = calculator.firstNumber + calculator.operator

  calculator.inputNumber = ''
}

// 2つ目の数字を保存
function setSecondNumber() {
  calculator.secondNumber = Number(calculator.inputNumber)
}

// 数字を入力
function numberFunc(currentValue) {
  if (Number(calculator.inputNumber) === 0 && Number(currentValue) === 0) {
    calculator.inputNumber = '0'
    displayInputNumber()
    return
  }

  if (Number(calculator.inputNumber) === 0) {
    calculator.inputNumber = currentValue
  } else {
    calculator.inputNumber += currentValue
  }

  displayInputNumber()
}

// 入力中の数字を画面に表示
function displayInputNumber() {
  if (calculator.operator === '') {
    result.textContent = calculator.inputNumber
  } else {
    result.textContent =
      calculator.firstNumber + calculator.operator + calculator.inputNumber
  }
}

// 足し算・引き算・掛け算・割り算
function addNum(firstNumber, secondNumber) {
  return firstNumber + secondNumber
}

function subtractNum(firstNumber, secondNumber) {
  return firstNumber - secondNumber
}

function multiplyNum(firstNumber, secondNumber) {
  return firstNumber * secondNumber
}

function divideNum(firstNumber, secondNumber) {
  return firstNumber / secondNumber
}

// 演算子によって計算処理を切り替える
function calculate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case '+':
      return addNum(firstNumber, secondNumber)

    case '-':
      return subtractNum(firstNumber, secondNumber)

    case '×':
      return multiplyNum(firstNumber, secondNumber)

    case '/':
      return divideNum(firstNumber, secondNumber)
  }
}

// 計算結果を表示
function displayResult(answer) {
  result.textContent = answer

  calculator.inputNumber = String(answer)
  calculator.firstNumber = 0
  calculator.secondNumber = 0
  calculator.operator = ''
}

// 電卓を初期化
function resetCalculator() {
  calculator.inputNumber = ''
  calculator.firstNumber = 0
  calculator.secondNumber = 0
  calculator.operator = ''

  result.textContent = '0'
}

getClickedButton()
