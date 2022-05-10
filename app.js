  let input = document.querySelector(".inputLeft")
  let output = document.querySelector(".inputRight")
  
  let numberMask = IMask(input, {
    mask: Number,
    scale: 5,
    signed: false,
    thousandsSeparator: ' ',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: '.',
    mapToRadix: [','],
  });
  
  let numberMask1 = IMask(output, {
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
  
  let from = 'RUB',
    to = 'USD'
  input.addEventListener('input', api1)
  output.addEventListener('input', api2)
  
  let leftBtn = document.querySelectorAll(".buttons1 button")
  leftBtn.forEach((item) =>
    item.addEventListener('click', () => {
      leftBtn.forEach(item => {
        item.classList.remove("active")
      });
      item.classList.add("active");
      from = item.innerHTML
      api2()
      available()
    }))
  
  let rightBtn = document.querySelectorAll(".buttons2 button")
  rightBtn.forEach((item) =>
    item.addEventListener('click', () => {
      rightBtn.forEach(item => {
        item.classList.remove("active")
      });
      item.classList.add("active");
      to = item.innerHTML
      api1()
      available()
    }))
  
  function api1() {
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
      .then(response => response.json())
      .then(data => {
        if(input.value==""){
          output.value=""
        }
        else{
        input.value=input.value.replace(/,/g,".")
        output.value = input.value.replace(/ /g, "") * Number(data.rates[Object.keys(data.rates)[0]])
        output.value = commify(output.value)
        }
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      })
  }
  
  function api2() {
    fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
      .then(response => response.json())
      .then(data => {
        if(output.value==""){
          input.value=""
        }
        else{
        output.value=output.value.replace(/,/g,".")
        input.value = output.value.replace(/ /g, "") * Number(data.rates[Object.keys(data.rates)[0]])
        input.value = commify(input.value)
        }
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      })
  }

  let p1 = document.querySelector(".online-price")
  let p2 = document.querySelector(".online-currency")
  
  function available() {
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
  
  available()
  api1()