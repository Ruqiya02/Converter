const input=document.querySelector("input");
const buttons=document.querySelectorAll(".selection")
input.addEventListener("keyup",(event)=>{
    if(event.keyCode>65&&event.keyCode<90){
        input.innerHTML=""
    }
})
// fetch("https://api.exchangerate.host/latest?base=USD&symbols=RUB ")
// .then((res)=>{
//     return res.json()
// })
// .then((data)=>{
//     console.log(data.base)
// })

function api1(){
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=RUB ")
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data.rates[Object.keys(data.rates)[0]])
    })
 

}
api1()


