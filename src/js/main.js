import {API_KEY} from './secrets'
import {nodes,nodeHash,btn} from './nodes'
import axios from 'axios'


const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language':localStorage.getItem('lang'),
    'include_adult':localStorage.getItem('adult'),
  },
})

// DRY

export async function generateMovie(
  data, 
  container,
  {
    clean,
    lazyLoad
  }
  ){
  if(clean == true)container.innerHTML = ''
  data.forEach(movie => {
    const article = document.createElement('article')
    article.classList.add('movie')
    article.setAttribute('data-select',movie.id)

    const img = document.createElement('img')
    img.setAttribute('alt', movie.title)
    img.setAttribute(lazyLoad?'data-img':'src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
    img.classList.remove('error')
    img.addEventListener('click',()=>{
      location.hash = `#movie=${movie.id}-${movie.title}`
    })
    img.addEventListener('error',()=>{
      img.setAttribute('src', `https://riszart.github.io/riszmovie-page/public/img/no-disponible.jpg`)
      img.setAttribute('alt', `imagen de -(- ${movie.title} -)- NO DISPONIBLE`)
    })
    const btn = document.createElement('button')
    btn.classList.add('movie-btn')
    const imgBtn = document.createElement('img')

    likedMovieList()[movie.id] && btn.classList.add('movie-btn__liked') // condicional que aplica cambios si es true  -similar a esto-  if(likedMovieList()[movie.id])btn.classList.add('movie-btn__liked')
    imageBtn()
    function imageBtn(){
      if(!btn.classList.contains('movie-btn__liked')){
        imgBtn.setAttribute('src', 'https://riszart.github.io/riszmovie-page/public/img/plus-svgrepo-com.svg')
      }else {
        imgBtn.setAttribute('src', `https://riszart.github.io/riszmovie-page/public/img/favorite-svgrepo-com.svg`)
      }
      btn.classList.toggle('movie-btn__liked')
    }
    btn.addEventListener('click', (event)=>{
      imageBtn()
      gettrendingPreview() 
      addfavorite(movie)
      getMoviesFavorite() 
    })
    btn.appendChild(imgBtn)
    article.append(btn,img)
    container.appendChild(article)

    if(lazyLoad)lazyLoader.observe(img)
  })
}

export function categoryMovie(data, cotaniner){
  cotaniner.innerHTML = ''
  data.forEach(category => {
    const div = document.createElement('div')
    div.classList.add('category-item')
    const p = document.createElement('p')
    p.classList.add("name-category")
    p.addEventListener('click', ()=>{
      location.hash = `#category=${category.id}-${category.name}`
    })
    const categoryName = document.createTextNode(category.name)
    const span = document.createElement("span")
    span.setAttribute('id', `id${category.id}`)
    span.setAttribute('class', `color-category`)
    p.appendChild(categoryName)
    div.append(span, p)
    cotaniner.appendChild(div)
  });
}

//----
export async function gettrendingPreview(){
  try {
    const {data} = await api.get('trending/movie/day')
    const movies = data.results
    generateMovie(
      movies,
      nodes.containeMovieTrends,
      {
        clean:true,
        lazyLoad:true
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export async function getCategories(){
  api.get('genre/movie/list',{
    params: {
    }
  })
    .then((response)=>{
      const dataAxios = response.data.genres
      categoryMovie(dataAxios, nodes.generateCategory)
    })
    .catch(error=>{
      console.log(error)
    })
}

export async function responseApi({
  apiUrl,
  params:{
    nameMovie = "",
    idCategory = "",
  },
  container,
}){
  api.get(`${apiUrl}`,{
    params: {
      query:nameMovie,
      with_genres:idCategory
    }
  })
  .then((response)=>{
    const dataAxios = response.data.results
    generateMovie(
      dataAxios,
      container,
      {
        clean:true,
        lazyLoad:true
      }
    )
  })
  .catch(error=>{
    console.log(error)
  })
}

export async function getMovieById(movie_id){
  nodes.movieSearchString.innerHTML = ''
  nodes.categorySelect.innerHTML = ''
  api.get(`movie/${movie_id}`)
    .then((movie)=>{
      nodes.movieTitle.textContent = movie.data.title
      nodes.titleLoad.style.display = 'none'
      nodes.moviedescription.textContent = movie.data.overview
      nodes.loadDescription.style.display = 'none'
      nodeHash.title.innerHTML = `${movie.data.vote_average}<span style="color:yellow;">&starf;</span>`
      nodes.startLoad.style.display = 'none'
      nodes.imageSelect.setAttribute('src',`https://image.tmdb.org/t/p/w500/${movie.data.poster_path}`)
      nodes.imageSelect.classList.remove('error')
      nodes.imageSelect.addEventListener('error',()=>{
        nodes.imageSelect.classList.add('error')
        nodes.imageSelect.setAttribute('src', `https://riszart.github.io/riszmovie-page/public/img/no-disponible.jpg`)
      })
      categoryMovie(movie.data.genres,nodes.categorySelect)
      getRelateMovieId(movie_id)
    })
    .catch(error=>{
      console.log(error)
    })
}
export async function getRelateMovieId(movie_id){
  api.get(`movie/${movie_id}/similar`)
  .then((movie)=>{
    const movieData = movie.data.results
    generateMovie(
      movieData,
      window.innerWidth < 970?nodes.listMovieSelect:nodes.containerListMovieSelectDesktop,
      {
        clean:true,
        azyLoad:true
      }
    )
  })
  .catch(error=>{
    console.log(error)
  })
}

const lazyLoader = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      const url = entry.target.getAttribute('data-img')
      entry.target.setAttribute('src', url)
    }
  })
})

export function scrollMove({id = "",query = "",container,apiUrl}){
  return ()=>{
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement
    let count = 1
    // const pageNotMax = page < maxPage
    const scrollBotton = (scrollTop + clientHeight) >= (scrollHeight - 100)
    if(scrollBotton ){
      count++
      api.get(`${apiUrl}`,{params: {page: count, query: query, with_genres:id,language:"es-ES"}})
      .then((response)=>{
        const dataAxios = response.data.results
        generateMovie(
          dataAxios,
          container,
          {
            clean:false,
            lazyLoad:true
          }
        )
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
}
export async function getVideoMovie(movie_id,movie_name){
  api.get(`movie/${movie_id}/videos`)
  .then((movie)=>{
    nodeHash.movieVideoPlay.innerHTML = ""
    const movieData = movie.data.results
    if(!movieData.length == 0){
      const div = document.createElement('div')
      nodeHash.movieVideoPlay.appendChild(div)
      const player = new YT.Player(div,{
        videoId: movieData[movieData.length - 1].key,
        // width: 100,
        // height: 100,
        playerVars:{
          autoplay:0
          }
      })
    }else {
      const div = document.createElement('div')
      div.classList.add('content-text__youtube')
      const p = document.createElement('p')
      p.classList.add('text-youtube')
      let lang = localStorage.getItem('lang')
      if(lang == 'es-US'|| lang == 'es-ES')p.textContent = "ir a"
      else p.textContent = "go to"
      const btn = document.createElement('buttom')
      btn.classList.add('btn-youtube-go')
      btn.textContent = "youtube"
      let letter = movie_name.split(' ').join('+')
      btn.addEventListener('click',()=>{
        let a = nodes.movieTitle.innertext
        window.open(`https://www.youtube.com/results?search_query=${letter}+Trailer`, '_blank')
      } )
      div.append(p,btn)
      nodeHash.movieVideoPlay.appendChild(div)
    }
  })
  .catch(error=>{
    console.log(error)
  })
}
export async function getCreditsMovie(movie_id, block=false){
  api.get(`movie/${movie_id}/credits`)
  .then((credits)=>{
    let count = 0
    const dataCredits = credits.data.cast
    dataCredits.length > 6
    ?btn.buttomSeeMoreCredits.classList.remove('inactive')
    :btn.buttomSeeMoreCredits.classList.add('inactive')
    // console.log(dataCredits)
    nodes.movieContainer.innerHTML = ""
    dataCredits.forEach((credit)=>{
      count++
      if(count < 7 || block==true){
        const article = document.createElement('article')
        const divImg = document.createElement('div')
        const img = document.createElement('img')
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${credit.profile_path}`)
        img.addEventListener('error',()=>{
          img.setAttribute('src', `https://riszart.github.io/riszmovie-page/public/img/user-undefined.svg`)
        })
        img.setAttribute('alt', credit.original_name)
        const div = document.createElement('div')
        const characterName = document.createElement('p')
        characterName.textContent = credit.character
        const name = document.createElement('p')
        name.textContent = credit.original_name
  
        divImg.appendChild(img)
        div.append(name,characterName)
        article.append(divImg,div)
        nodes.movieContainer.appendChild(article)
      }
    })
  })
  .catch(error=>{
    console.log(error)
  })
}
function addfavorite(movie){
  let likedMovie = likedMovieList()
  
  if(likedMovie[movie.id]){
    likedMovie[movie.id] = undefined
  }else{
    likedMovie[movie.id] = movie
  }
  localStorage.setItem('movie-liked', JSON.stringify(likedMovie))
  likedMovie
}
function likedMovieList(){
  const item = JSON.parse(localStorage.getItem('movie-liked'))
  let movies
  if(item)movies = item
  else movies={}
  return movies
}
export function getMoviesFavorite(){
  const likeMovies = likedMovieList()
  let arrayLikeMovies = Object.values(likeMovies)
  // console.log(arrayLikeMovies)
  generateMovie(arrayLikeMovies,nodes.containerFavoriteList,{clean:true,lazyLoad:false})
}
