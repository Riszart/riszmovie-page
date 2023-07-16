import {gettrendingPreview,getCategories,getMoviesFavorite,scrollMove,getMovieById,getVideoMovie,getCreditsMovie} from './main'
import {responseApi} from './main'
import {butonChangeMore,butonChangeNone} from './lang'
import {nodes,nodeHash,btn} from './nodes'

export let scrollInfinity

export function navigator(){
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
  nodeHash.conatinerImagePerfil.classList.remove('inactive')
  nodeHash.movieVideoPlay.innerHTML = ""
  nodeHash.title.innerText = 'riszmovie!...'
  nodeHash.containerLang.classList.remove('inactive')
  nodeHash.contentArrowImg.classList.add('inactive')
  nodeHash.containerSearchMovie.classList.remove('showSearch')

  nodes.containerSubtitle.classList.remove('inactive')
  nodeHash.title.classList.remove('inactive')
  nodeHash.containerSearch.classList.remove('inactive')
  // nodeHash.header.classList.add('inactive')
  nodeHash.containerMovieSelect.classList.add('inactive')
  nodeHash.categorySearch.classList.add('inactive')
  nodeHash.listMovieSearch.classList.add('inactive')
  nodeHash.containerTrends.classList.remove('inactive')
  nodeHash.containerCategories.classList.remove('inactive')
  nodeHash.trends.classList.add('inactive')
  nodeHash.containerFooter.classList.remove('inactive')
  nodeHash.mainMovie.classList.remove('change-movie-select')
  nodes.containerListMovieSelectDesktop.classList.add('inactive')
  nodeHash.containerFavorite.classList.remove('inactive')

  gettrendingPreview() 
  getCategories()
  getMoviesFavorite()
}

function categoriesPage(){
  nodeHash.movieVideoPlay.innerHTML = ""
  nodeHash.contentArrowImg.classList.remove('inactive')
  nodeHash.conatinerImagePerfil.classList.add('inactive')


  // console.log('categories')
  nodeHash.containerLang.classList.add('inactive')
  nodeHash.header.classList.remove('inactive')
  nodeHash.containerSearch.classList.add('inactive')
  nodeHash.containerTrends.classList.add('inactive')
  nodeHash.containerCategories.classList.add('inactive')
  nodeHash.containerMovieSelect.classList.add('inactive')
  nodeHash.listMovieSearch.classList.add('inactive')
  nodeHash.categorySearch.classList.remove('inactive')
  nodeHash.trends.classList.add('inactive')
  nodeHash.mainMovie.classList.remove('change-movie-select')
  nodeHash.containerFavorite.classList.add('inactive')

  const [_, categoryData] = location.hash.split('=') 
  const [categoryId, categoryNameEncoded] = categoryData.split('-')
  const categoryName = decodeURIComponent(categoryNameEncoded)
  // console.log(location.hash.split('=') )
  responseApi({
    apiUrl:'discover/movie',
    container:nodes.containerMovieSearch,
    params:{
      idCategory:categoryId
    }
  })
  // getMoviesCategory('discover/movie',categoryId,nodes.containerMovieSearch)
  nodeHash.title.innerHTML = categoryName.split('%20').join(' ')
  scrollInfinity = scrollMove({
    id:categoryId,
    container:nodes.containerMovieSearch,
    apiUrl:'discover/movie'
  })
}

function movieDetailPage(){
  // console.log('movies')
  nodeHash.contentArrowImg.classList.remove('inactive')
  nodeHash.containerLang.classList.add('inactive')
  nodeHash.conatinerImagePerfil.classList.add('inactive')

  nodeHash.containerSearch.classList.add('inactive')
  nodeHash.containerTrends.classList.add('inactive')
  nodeHash.containerCategories.classList.add('inactive')
  nodeHash.containerFooter.classList.remove('inactive')
  nodeHash.categorySearch.classList.add('inactive')
  nodeHash.listMovieSearch.classList.add('inactive')
  nodeHash.containerMovieSelect.classList.remove('inactive')
  nodeHash.trends.classList.add('inactive')
  nodeHash.header.classList.remove('inactive')
  nodeHash.containerFavorite.classList.add('inactive')

  const [_, movie] = location.hash.split('=') 
  const [movieid, moviename] = movie.split('-')
  nodes.containerListMovieSelectDesktop.classList.add('inactive')

  // if(window.innerWidth > 970){
  //   nodeHash.mainMovie.classList.add('change-movie-select')
  // nodes.containerListMovieSelectDesktop.classList.remove('inactive')
  // }

  getMovieById(movieid)
  getVideoMovie(movieid,decodeURIComponent(moviename))
  getCreditsMovie(movieid)
  btn.buttomSeeMoreCredits.onclick = ()=>{
    if(!btn.buttomSeeMoreCredits.classList.contains('clicked-btn')){
      btn.buttomSeeMoreCredits.classList.add('clicked-btn')
      getCreditsMovie(movieid,true)
      nodes.titleCredits.querySelector('.clicked-btn').innerText = butonChangeNone
    }else {
      nodes.titleCredits.querySelector('.clicked-btn').innerText = butonChangeMore
      btn.buttomSeeMoreCredits.classList.remove('clicked-btn')
      getCreditsMovie(movieid,false)
    }
  }
}
let valid
function searchPage(){
  console.log('search')
  nodeHash.contentArrowImg.classList.remove('inactive')
  nodeHash.containerSearchMovie.classList.add('showSearch')
  nodeHash.containerLang.classList.add('inactive')
  nodeHash.conatinerImagePerfil.classList.add('inactive')

  nodes.containerSubtitle.classList.add('inactive')
  nodeHash.header.classList.remove('inactive')
  nodeHash.categorySearch.classList.add('inactive')
  nodeHash.title.classList.add('inactive')
  nodeHash.containerTrends.classList.add('inactive')
  nodeHash.containerCategories.classList.add('inactive')
  nodeHash.containerMovieSelect.classList.add('inactive')
  nodeHash.listMovieSearch.classList.remove('inactive')
  nodeHash.trends.classList.add('inactive')
  nodeHash.containerFooter.classList.remove('inactive')
  nodeHash.mainMovie.classList.remove('change-movie-select')
  nodeHash.containerFavorite.classList.add('inactive')

  //['#search','string']
  const [_, queryHash] = location.hash.split('=') 
  responseApi({
    apiUrl:'search/movie',
    container:nodes.movieSearchString,
    params:{
      nameMovie:queryHash,
    }
  })
  // getMoviesSearch('search/movie',queryHash,nodes.movieSearchString)
  scrollInfinity = scrollMove({
    query:queryHash,
    container:nodes.movieSearchString,
    apiUrl:'search/movie'
  })
}

function trendsPage(){
  // console.log('trends')
  nodeHash.conatinerImagePerfil.classList.add('inactive')
  nodeHash.contentArrowImg.classList.remove('inactive')
  nodeHash.title.innerText = 'tendencia'
  nodeHash.containerSearch.classList.add('inactive')
  nodeHash.containerTrends.classList.add('inactive')
  nodeHash.containerCategories.classList.add('inactive')
  nodeHash.header.classList.remove('inactive')
  nodeHash.trends.classList.remove('inactive')
  nodeHash.containerMovieSelect.classList.add('inactive')
  nodeHash.categorySearch.classList.add('inactive')
  nodeHash.listMovieSearch.classList.add('inactive')
  nodeHash.containerFavorite.classList.add('inactive')
  nodeHash.mainMovie.classList.remove('change-movie-select')
  nodeHash.containerLang.classList.add('inactive')

  responseApi({
    apiUrl:'trending/movie/day',
    container:nodes.trendsMovieSearch,
    params:''
  })
  scrollInfinity = scrollMove({
    container:nodes.trendsMovieSearch,
    apiUrl:'trending/movie/day'
  })

}

