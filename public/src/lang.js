let lang
function language(){
  if(localStorage.getItem('lang')){
    lang = localStorage.getItem('lang')
    changeDisplayLang(lang)
    return
  }
  if(window.navigator.language){
    lang = window.navigator.language
    changeDisplayLang(lang)
    return
  }
  lang = 'en-US'
  localStorage.setItem('lang', lang)
  changeDisplayLang(lang)
}
language()

function changeDisplayLang(){
  if(lang == 'es-ES'){
    flagEs.classList.add('color-clicked')
    flagEn.classList.remove('color-clicked')
  }else{
    flagEn.classList.add('color-clicked')
    flagEs.classList.remove('color-clicked')
  }
}

flagEn.addEventListener('click',()=>{
  localStorage.setItem('lang','en-US')
  language()
  location.reload()
})
flagEs.addEventListener('click',()=>{
  localStorage.setItem('lang','es-ES')
  language()
  location.reload()
})