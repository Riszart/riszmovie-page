const listMenu = document.querySelector('.content-menu__all')

const deployMenu = document.querySelector('.content-menu').onclick = ()=>{
  const valid = listMenu.classList.toggle('showMenu')
  valid ?show() :hide()
}
const show = ()=>{listMenu.style.display = "flex"}
const hide = ()=>{listMenu.style.display = "none"}