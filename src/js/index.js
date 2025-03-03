import '../styles/app.css'
import '../styles/responsive.css'
import {language,ifAdult} from './lang'
import {nodes, nodeHash} from './nodes'
import {navigator,scrollInfinity} from './navigator'

// const canvas = document.querySelector(".header-bottom")
// const ctx = canvas.getContext('2d')
// canvas.width = window.innerWidth
// canvas.height = 40

// ctx.beginPath()
// ctx.strokeStyle = "#2c4b55";
// ctx.fillStyle="#2c4b55";
// ctx.lineWidth = .1;
// ctx.moveTo(40,0)
// ctx.lineTo(0,0)
// ctx.lineTo(0,40)
// ctx.arc(40,40,40,(Math.PI / 180)*180,(Math.PI / 180)*-90,false)
// ctx.fill()
// ctx.stroke();

// ctx.translate(canvas.width - 40, 0);
// ctx.beginPath()
// ctx.moveTo(0,0)
// ctx.lineTo(40, 0)
// ctx.lineTo(40, 40)
// ctx.arc(0,40,40,0,(Math.PI / 180)*-90,true)
// ctx.fill()
// ctx.stroke();

language()
ifAdult()

nodes.buttonSearch.addEventListener('click', ()=>{
  search()
})
function search(){
  if(!nodes.inputSearch.value==''){
    location.hash = `#search=${nodes.inputSearch.value}`
  }
}
nodeHash.contentArrowImg.addEventListener('click', ()=>{
  nodes.containerMovieSearch.innerHTML = ""
  nodes.imageSelect.src = ''
  history.back()
})
nodes.trendsButton.addEventListener('click', ()=>{
  location.hash = '#trends'
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', scrollInfinity)

document.body.addEventListener("keydown", event=>{
  if(event.code === "Escape")history.back()
})
document.body.addEventListener("keydown", event=>{
  if(event.code === "Enter")search()
})
