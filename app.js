  const inputLeft = document.querySelector(".inputLeft")
  const inputRight = document.querySelector(".inputRight")
  const from = 'RUB',to = 'USD'
  const menu=document.querySelector(".icon-container")
  const link=document.querySelectorAll("a")
  const list=document.querySelector('ul')
  menu.addEventListener("click",()=>{
      link.style.display='block'
      })
  
  var numberMask1 = IMask(inputLeft, {
    mask: Number,
    scale: 5,
    signed: false,
    thousandsSeparator: ' ',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: '.',
    mapToRadix: [','],
  });
  var numberMask2 = IMask(inputRight, {
    mask: Number,
    scale: 5,
    signed: false,
    thousandsSeparator: ' ',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: '.',
    mapToRadix: [','],
  });

  function commify(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
      numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
    );
  }
  function inputValue() {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
      .then(response => response.json())
      .then(data => {
        if(inputLeft.value==""){
          inputRight.value=""
        }
        else{
        inputRight.value = inputLeft.value.replace(/ /g, "") * Number(data.rates[Object.keys(data.rates)[0]])
        inputRight.value = commify(inputRight.value)
        }
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      })
  }
  function outputValue() {
    fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
      .then(response => response.json())
      .then(data => {
        if(inputRight.value==""){
          inputLeft.value=""
        }
        else{
        inputLeft.value = inputRight.value.replace(/ /g, "") * Number(data.rates[Object.keys(data.rates)[0]])
        inputLeft.value = commify(inputLeft.value)
        }
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      })
  }
  inputLeft.addEventListener('input', inputValue)
  inputRight.addEventListener('input', outputValue)
  let leftBtn = document.querySelectorAll(".buttons1 button")
  leftBtn.forEach((item) =>
    item.addEventListener('click', () => {
      leftBtn.forEach(item => {
        item.classList.remove("selected")
      });
      item.classList.add("selected");
      from = item.innerHTML
      outputValue()
      onlineCurrency()
    }))
  
  let rightBtn = document.querySelectorAll(".buttons2 button")
  rightBtn.forEach((item) =>
    item.addEventListener('click', () => {
      rightBtn.forEach(item => {
        item.classList.remove("selected")
      });
      item.classList.add("selected");
      to = item.innerHTML
      inputValue()
      onlineCurrency()
    }))

  let p1 = document.querySelector(".online-price")
  let p2 = document.querySelector(".online-currency")
  
  function onlineCurrency() {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
      .then(response => response.json())
      .then(data => {
        p1.innerHTML = `1 ${from} = ${data.rates[Object.keys(data.rates)[0]]} ${to}`
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      })
  
    fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
      .then(response => response.json())
      .then(data => {
        p2.innerHTML = `1 ${to} = ${data.rates[Object.keys(data.rates)[0]]} ${from}`
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      })
  }
  onlineCurrency()
  inputValue()