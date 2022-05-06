const inputLeft=document.querySelector(".inputLeft");
const inputRight=document.querySelector(".inputRight");
function example(){
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=RUB ")
    .then((res)=>{
        return res.json();
    }) 
    .then((data)=>{
        console.log(data.base)
    })  
}
example()
var numberMask = IMask(
    document.getElementById('number-mask'),
    {
      mask: Number,
      min: -10000,
      max: 10000,
      thousandsSeparator: ' '
    });


