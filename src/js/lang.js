import {select,nodes,flagEs,flagEn,siAdult,noAdult} from './nodes'
export let butonChangeMore
export let butonChangeNone

export function language(){
  let lang
  const flagEs = select('.es-es')
  const flagEn = select('.en-us')
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
  if(localStorage.getItem('lang')){
    lang = localStorage.getItem('lang')
    changeDisplayLang(lang)
    return
  }
  if(window.navigator.language){
    lang = window.navigator.language
    if(localStorage.getItem('lang') == "es-ES" || localStorage.getItem('lang') == "es-US" ){
      localStorage.setItem('lang', lang)
      changeDisplayLang(lang)
      return
    }
    localStorage.setItem('lang', 'es-US')
    changeDisplayLang('es-US')
  }
  lang = 'en-US'
  localStorage.setItem('lang', lang)
  changeDisplayLang(lang)
}

export function changeDisplayLang(lang){
  changeLang(lang)
  if(lang == 'es-ES' || lang == 'es-US'){
    flagEs.classList.add('color-clicked')
    flagEn.classList.remove('color-clicked')
  }else{
    flagEn.classList.add('color-clicked')
    flagEs.classList.remove('color-clicked')
  }
}

export function changeLang(lang){
  if(lang == 'en-US'){
    nodes.containerSubtitle.innerText = 'Millions of movies to discover. Be encouraged and know the trends, the premieres and more'
    nodes.conatinerTrendsTitleH2.innerText = 'trends'
    nodes.containerCategoriesH2.innerText = 'category'
    nodes.containerFavoriteH2.innerText = 'favorite movies'
    nodes.titleCreditsH3.innerText = 'credits'
    nodes.categorySelectContainerH3.innerText = 'Related Categories'
    nodes.containerListMovieSelectH3.innerText = 'Similar Movies'
    nodes.inputSearch.placeholder = 'Search'
    nodes.contentFooterA.innerText = '<< - my portfolio - >>'
    nodes.contentFooterP.innerText = 'developed by riszart daryl'
    nodes.askAdultQuestion.innerText = 'You are of legal age (+18)'
    nodes.labelSi.innerText = 'I am'
    nodes.labelNo.innerText = 'I am not' 
    nodes.checkAsk.innerText = 'confirm'
    butonChangeNone = 'See Less'
    butonChangeMore = 'see more'
    nodes.styleButton.forEach(element => {
      element.innerText = 'see more'
    });
  }
  if(lang == "es-ES" || lang == 'es-US'){
    nodes.containerSubtitle.innerText = 'Millones de películas para descubrir. Anímate y conoce las tendencias, los estrenos y más'
    nodes.conatinerTrendsTitleH2.innerText = 'tendencias'
    nodes.containerCategoriesH2.innerText = 'categoria'
    nodes.containerFavoriteH2.innerText = 'películas  favoritas'
    nodes.titleCreditsH3.innerText = 'Créditos'
    nodes.categorySelectContainerH3.innerText = 'Categorías Relacionados'
    nodes.containerListMovieSelectH3.innerText = 'Películas Similares'
    nodes.inputSearch.placeholder = 'Buscar'
    nodes.contentFooterA.innerText = '<< - mi portafolio - >>'
    nodes.contentFooterP.innerText = 'desarrollado por riszart daryl'
    nodes.askAdultQuestion.innerText = 'Eres mayor de Edad (+18)'
    nodes.labelSi.innerText = 'Sí soy'
    nodes.labelNo.innerText = 'No soy'
    nodes.checkAsk.innerText = 'confirmar'
    butonChangeNone = 'ver menos'
    butonChangeMore = 'ver más'
    nodes.styleButton.forEach(element => {
      element.innerText = 'ver más'
    });
  }
}

export function ifAdult(){
  let adult
  if(localStorage.getItem('adult')){
    adult = localStorage.getItem('adult')
    nodes.askSdult.style.display = 'none'
  }else{
    nodes.boyContent.style.overflow = 'hidden'
    nodes.checkAsk.addEventListener('click', ()=>{
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