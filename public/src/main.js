const API_KEY = 'd7ea524a59ef60701f4883af10e17628'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
})

// DRY

function generateMovie(data, container){
  data.forEach(movie => {
    const article = document.createElement('article')
    article.classList.add('movie')
    article.addEventListener('click',()=>{
      location.hash = `#movie=${movie.id}`
    })
    const img = document.createElement('img')
    img.setAttribute('alt', movie.title)
    img.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
    article.appendChild(img)
    container.appendChild(article)
    })
}

function categoryMovie(data, cotaniner){
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
    containeMovieTrends.innerHTML = ''
    const {data} = await api.get('trending/movie/day')
    const movies = data.results
    generateMovie(movies,containeMovieTrends)
  } catch (error) {
    console.log(error)
  }
}
async function trnedsMovie(){
  trendsMovieSearch.innerHTML = ''
  api.get('trending/movie/day')
    .then((response)=>{
      const dataAxios = response.data
      generateMovie(dataAxios.results,trendsMovieSearch)
    })
    .catch(error=>{
      console.log(error)
    })
}

async function getCategories(){
  generateCategory.innerHTML = ''
  api.get('genre/movie/list')
    .then((response)=>{
      const dataAxios = response.data
      const categories = dataAxios.genres
      categoryMovie(categories, generateCategory)
    })
    .catch(error=>{
      console.log(error)
    })
}
async function getMoviesCategory(id){
  containerMovieSearch.innerHTML = ''
  api.get('discover/movie',{params: {with_genres: id}})
    .then((response)=>{
      const dataAxios = response.data
      generateMovie(dataAxios.results,containerMovieSearch)
    })
    .catch(error=>{
      console.log(error)
    })
}

async function getMoviesSearch(srting){
  movieSearchString.innerHTML = ''
  api.get('search/movie',{params: {query: srting}})
    .then((response)=>{
      const dataAxios = response.data
      generateMovie(dataAxios.results,movieSearchString)

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
      moviedescription.textContent = movie.data.overview
      point.textContent = movie.data.vote_average
      imageSelect.style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${movie.data.poster_path})`
      categoryMovie(movie.data.genres, categorySelect)
      getRelateMovieId(movie_id)
    })
    .catch(error=>{
      console.log(error)
    })
}
async function getRelateMovieId(movie_id){
  listMovieSelect.innerHTML = ''
  api.get(`movie/${movie_id}/similar`)
  .then((movie)=>{
    const movieData = movie.data.results
    console.log(movie)
    generateMovie(movieData,listMovieSelect)
  })
  .catch(error=>{
    console.log(error)
  })
}
