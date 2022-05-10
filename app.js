const inputLeft=document.querySelector(".inputLeft");
const inputRight=document.querySelector(".inputRight");
const rightButtons=document.querySelectorAll(".selection-right");
const leftButtons=document.querySelectorAll(".selection-left");
leftButtons.forEach((bttn)=>{
    bttn.addEventListener("click",()=>{
        bttn.style.backgroundColor="rgba(131, 58, 224, 1)"
        bttn.style.color='white'
        
    })
})
function example(){
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=RUB ")
    .then((res)=>{
        return res.json();
    }) 
    .then((data)=>{
        console.log(Object.values((data.rates)))
    })  
}
example();




