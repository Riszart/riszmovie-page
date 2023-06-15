let lang
let API_KEY
function language(){
  if(localStorage.getItem('lang')){
    lang = localStorage.getItem('lang')
    changeDisplayLang(lang)
    return
  }
  if(window.navigator.language){
    localStorage.setItem('lang', window.navigator.language)
    changeDisplayLang(lang)
    return
  }
  console.log('pass')
  lang = 'en-US'
  localStorage.setItem('lang', lang)
  changeDisplayLang(lang)
}
language()

function changeDisplayLang(){
  changeLang()
  if(lang == 'es-ES' || lang == 'es-US'){
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

function changeLang(){
  console.log(lang)
  if(lang == 'en-US'){
    // console.log(lang)
    containerSubtitle.innerText = 'Millions of movies to discover. Be encouraged and know the trends, the premieres and more'
    conatinerTrendsTitleH2.innerText = 'trends'
    containerCategoriesH2.innerText = 'category'
    containerFavoriteH2.innerText = 'favorite movies'
    titleCreditsH3.innerText = 'credits'
    categorySelectContainerH3.innerText = 'Related Categories'
    containerListMovieSelectH3.innerText = 'Similar Movies'
    inputSearch.placeholder = 'Search'
    contentFooterA.innerText = '<< - my portfolio - >>'
    contentFooterP.innerText = 'developed by riszart daryl'
    askAdultQuestion.innerText = 'You are of legal age (+18)'
    labelSi.innerText = 'I am'
    labelNo.innerText = 'I am not'
    checkAsk.innerText = 'confirm'
    styleButton.forEach(element => {
      element.innerText = 'see more'
    });
  }
  if(lang == "es-ES" || lang == 'es-US'){
    // console.log(lang)
    containerSubtitle.innerText = 'Millones de películas para descubrir. Anímate y conoce las tendencias, los estrenos y más'
    conatinerTrendsTitleH2.innerText = 'tendencias'
    containerCategoriesH2.innerText = 'categoria'
    containerFavoriteH2.innerText = 'películas  favoritas'
    titleCreditsH3.innerText = 'Créditos'
    categorySelectContainerH3.innerText = 'Categorías Relacionados'
    containerListMovieSelectH3.innerText = 'Películas Similares'
    inputSearch.placeholder = 'Buscar'
    contentFooterA.innerText = '<< - mi portafolio - >>'
    contentFooterP.innerText = 'desarrollado por riszart daryl'
    askAdultQuestion.innerText = 'Eres mayor de Edad (+18)'
    labelSi.innerText = 'Sí soy'
    labelNo.innerText = 'No soy'
    checkAsk.innerText = 'confirmar'
    styleButton.forEach(element => {
      element.innerText = 'ver más'
    });
  }
}

let adult
function ifAdult(){
  if(localStorage.getItem('adult')){
    adult = localStorage.getItem('adult')
    askSdult.style.display = 'none'
  }else{
    boyContent.style.overflow = 'hidden'
    checkAsk.addEventListener('click', ()=>{
      if(siAdult.checked){
        adult = true
      }else if(noAdult.checked){
        adult = false
      }
      localStorage.setItem('adult',adult)
      location.reload()
    })
  }
}
ifAdult()
if(localStorage.getItem('adult')){
  API_KEY = 'd7ea524a59ef60701f4883af10e17628'
}
