let API_KEY = 'd7ea524a59ef60701f4883af10e17628'

let querySearchMovie
let maxPage
let count = 1

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    language:lang
  },
})

// DRY

async function generateMovie(
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
      img.classList.add('error')
      img.setAttribute('alt', `imagen de -(- ${movie.title} -)- NO DISPONIBLE`)
    })
    const btn = document.createElement('button')
    btn.classList.add('movie-btn')
    btn.addEventListener('click', ()=>{
      let selectElement = containeMovieTrends.querySelector(`[data-select="${movie.id}"] button.movie-btn__liked`)
      if(selectElement){
        containeMovieTrends.querySelector(`[data-select="${movie.id}"] button`).classList.remove('movie-btn__liked')
      }else{
        btn.classList.toggle('movie-btn__liked')
      }
      addfavorite(movie)
      getMoviesFavorite()
    })

    likedMovieList()[movie.id] && btn.classList.add('movie-btn__liked') // condicional que aplica cambios si es true  -similar a esto-  if(likedMovieList()[movie.id])btn.classList.add('movie-btn__liked')
    // let arrayLikeMovies = Object.keys(likedMovieList())
    // arrayLikeMovies.forEach((movieFavorite)=>{
    //   if(movieFavorite == movie.id){
    //     btn.classList.add('movie-btn__liked')
    //   }
    // })
    article.append(btn,img)
    container.appendChild(article)

    if(lazyLoad)lazyLoader.observe(img)
    })
}

function categoryMovie(data, cotaniner){
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
async function gettrendingPreview(){
  try {
    const {data} = await api.get('trending/movie/day')
    const movies = data.results
    generateMovie(
      movies,
      containeMovieTrends,
      {
        clean:true,
        lazyLoad:true
      }
    )
  } catch (error) {
    console.log(error)
  }
}


async function getCategories(){
  api.get('genre/movie/list',{
    params: {
    }
  })
    .then((response)=>{
      const dataAxios = response.data.genres
      categoryMovie(dataAxios, generateCategory)
    })
    .catch(error=>{
      console.log(error)
    })
}

async function responseApi({
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

async function getMovieById(movie_id){
  movieSearchString.innerHTML = ''
  categorySelect.innerHTML = ''
  api.get(`movie/${movie_id}`)
    .then((movie)=>{
      movieTitle.textContent = movie.data.title
      titleLoad.style.display = 'none'
      moviedescription.textContent = movie.data.overview
      loadDescription.style.display = 'none'
      title.innerHTML = `${movie.data.vote_average}<span style="color:yellow;">&starf;</span>`
      startLoad.style.display = 'none'
      imageSelect.setAttribute('src',`https://image.tmdb.org/t/p/w500/${movie.data.poster_path}`)
      imageSelect.classList.remove('error')
      imageSelect.addEventListener('error',()=>{
        imageSelect.classList.add('error')
        imageSelect.setAttribute('alt', `Imagen de -(- ${movie.data.title} -)- NO DISPONIBLE..!!!`)
      })
      categoryMovie(movie.data.genres,categorySelect)
      getRelateMovieId(movie_id)
    })
    .catch(error=>{
      console.log(error)
    })
}
async function getRelateMovieId(movie_id){
  api.get(`movie/${movie_id}/similar`)
  .then((movie)=>{
    const movieData = movie.data.results
    generateMovie(
      movieData,
      window.innerWidth < 970?listMovieSelect:containerListMovieSelectDesktop,
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

function scrollMove({id = "",query = "",container,apiUrl}){
  return ()=>{
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement
    // const pageNotMax = page < maxPage
    const scrollBotton = (scrollTop + clientHeight) >= (scrollHeight - 50)
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
async function getVideoMovie(movie_id,movie_name){
  api.get(`movie/${movie_id}/videos`)
  .then((movie)=>{
    movieVideoPlay.innerHTML = ""
    const movieData = movie.data.results
    if(!movieData.length == 0){
      const div = document.createElement('div')
      movieVideoPlay.appendChild(div)
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
      p.textContent = "ir a"
      const btn = document.createElement('buttom')
      btn.classList.add('btn-youtube-go')
      btn.textContent = "youtube"
      let letter = movie_name.split(' ').join('+')
      btn.addEventListener('click',()=>{
        let a = movieTitle.innertext
        window.open(`https://www.youtube.com/results?search_query=${letter}+Trailer`, '_blank')
      } )
      div.append(p,btn)
      movieVideoPlay.appendChild(div)
    }
  })
  .catch(error=>{
    console.log(error)
  })
}
async function getCreditsMovie(movie_id, block=false){
  api.get(`movie/${movie_id}/credits`)
  .then((credits)=>{
    let count = 0
    const dataCredits = credits.data.cast
    dataCredits.length > 6
    ?buttomSeeMoreCredits.classList.remove('inactive')
    :buttomSeeMoreCredits.classList.add('inactive')
    // console.log(dataCredits)
    movieContainer.innerHTML = ""
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
        movieContainer.appendChild(article)
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
function getMoviesFavorite(){
  const likeMovies = likedMovieList()
  let arrayLikeMovies = Object.values(likeMovies)
  // console.log(arrayLikeMovies)
  generateMovie(arrayLikeMovies,containerFavoriteList,{clean:true,lazyLoad:false})
}


