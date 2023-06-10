let scrollInfinity
let apiSection
let containerMovie

buttonSearch.addEventListener('click', ()=>{
  // console.log(inputSearch.value)
  search()
})
function search(){
  if(!inputSearch.value==''){
    location.hash = `#search=${inputSearch.value}`
  }
}
contentArrowImg.addEventListener('click', ()=>{
  history.back()
  // location.hash = '#home='
})
trendsButton.addEventListener('click', ()=>{
  location.hash = '#trends'
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
window.addEventListener('scroll', scrollInfinity)

function navigator(){
  if(scrollInfinity){
    window.removeEventListener('scroll', scrollInfinity)
    scrollInfinity = undefined
  }

  if(location.hash.startsWith('#trends')){trendsPage()}
  else if(location.hash.startsWith('#search=')){searchPage()}
  else if(location.hash.startsWith('#movie=')){movieDetailPage()}
  else if(location.hash.startsWith('#category=')){categoriesPage()}
  else{homePage()}
  window.scrollTo({
    top:0,
    left:0
  })

  if(scrollInfinity){
    window.addEventListener('scroll', scrollInfinity)
  }
}

function homePage(){
  // console.log('home')
  title.innerText = 'riszmovie!...'
  contentArrowImg.classList.add('inactive')
  containerSearchMovie.classList.remove('showSearch')

  containerSubtitle.classList.remove('inactive')
  title.classList.remove('inactive')
  containerSearch.classList.remove('inactive')
  // header.classList.add('inactive')
  containerMovieSelect.classList.add('inactive')
  categorySearch.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  containerTrends.classList.remove('inactive')
  containerCategories.classList.remove('inactive')
  trends.classList.add('inactive')
  containerFooter.classList.remove('inactive')
  mainMovie.classList.remove('change-movie-select')
  containerListMovieSelectDesktop.classList.add('inactive')

  gettrendingPreview() 
  getCategories()
}

function categoriesPage(){
  contentArrowImg.classList.remove('inactive')

  // console.log('categories')
  header.classList.remove('inactive')
  containerSearch.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  containerMovieSelect.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  categorySearch.classList.remove('inactive')
  trends.classList.add('inactive')
  mainMovie.classList.remove('change-movie-select')


  const [_, categoryData] = location.hash.split('=') 
  const [categoryId, categoryName] = categoryData.split('-')
  responseApi({
    apiUrl:'discover/movie',
    container:containerMovieSearch,
    params:{
      idCategory:categoryId
    }
  })
  // getMoviesCategory('discover/movie',categoryId,containerMovieSearch)
  title.innerHTML = categoryName.split('%20').join(' ')
  scrollInfinity = scrollMove({
    id:categoryId,
    container:containerMovieSearch,
    apiUrl:'discover/movie'
  })
}

function movieDetailPage(){
  // console.log('movies')
  contentArrowImg.classList.remove('inactive')

  containerSearch.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  containerFooter.classList.remove('inactive')
  categorySearch.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  containerMovieSelect.classList.remove('inactive')
  trends.classList.add('inactive')
  header.classList.remove('inactive')
  

  const [_, movieid] = location.hash.split('=') 
  containerListMovieSelectDesktop.classList.add('inactive')

  if(window.innerWidth > 970){
    mainMovie.classList.add('change-movie-select')
  containerListMovieSelectDesktop.classList.remove('inactive')

  }

  getMovieById(movieid)

  listMovieSelect
}

function searchPage(){
  console.log('search')
  contentArrowImg.classList.remove('inactive')
  containerSearchMovie.classList.add('showSearch')

  containerSubtitle.classList.add('inactive')
  header.classList.remove('inactive')
  categorySearch.classList.add('inactive')
  title.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  containerMovieSelect.classList.add('inactive')
  listMovieSearch.classList.remove('inactive')
  trends.classList.add('inactive')
  containerFooter.classList.remove('inactive')
  mainMovie.classList.remove('change-movie-select')
  //['#search','string']
  const [_, queryHash] = location.hash.split('=') 
  responseApi({
    apiUrl:'search/movie',
    container:movieSearchString,
    params:{
      nameMovie:queryHash,
    }
  })
  // getMoviesSearch('search/movie',queryHash,movieSearchString)
  scrollInfinity = scrollMove({
    query:queryHash,
    container:movieSearchString,
    apiUrl:'search/movie'
  })
}

function trendsPage(){
  // console.log('trends')
  contentArrowImg.classList.remove('inactive')
  title.innerText = 'tendencia'
  containerSearch.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  header.classList.remove('inactive')
  trends.classList.remove('inactive')
  containerMovieSelect.classList.add('inactive')
  categorySearch.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  mainMovie.classList.remove('change-movie-select')

  responseApi({
    apiUrl:'trending/movie/day',
    container:trendsMovieSearch,
    params:''
  })
  // trnedsMovie('trending/movie/day', trendsMovieSearch,)
  scrollInfinity = scrollMove({
    container:trendsMovieSearch,
    apiUrl:'trending/movie/day'
  })
  // buttonSeeMoreTrends.onclick = ()=>{
  // }
}
document.body.addEventListener("keydown", event=>{
  if(event.code === "Escape")history.back()
})
document.body.addEventListener("keydown", event=>{
  if(event.code === "Enter")search()
})

