const API_KEY = 'd7ea524a59ef60701f4883af10e17628'
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
  },
})

// DRY

function generateMovie(
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
    article.addEventListener('click',()=>{
      location.hash = `#movie=${movie.id}`
    })
    const img = document.createElement('img')
    img.setAttribute('alt', movie.title)
    img.setAttribute(lazyLoad?'data-img':'src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
    img.classList.remove('error')
    img.addEventListener('error',()=>{
      img.classList.add('error')
      img.setAttribute('alt', `imagen de -(- ${movie.title} -)- NO DISPONIBLE`)
    })
    article.appendChild(img)
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
// async function trnedsMovie(apiUrl, container){
//   api.get(`${apiUrl}`)
//     .then((response)=>{
//       const dataAxios = response.data.results
//       generateMovie(
//         dataAxios,
//         container,
//         {
//           clean:true,
//           lazyLoad:true
//         }
//       )
//       maxPage = response.data.total_pages
//     })
//     .catch(error=>{
//       console.log(error)
//     })
// }

async function getCategories(){
  api.get('genre/movie/list')
    .then((response)=>{
      const dataAxios = response.data.genres
      categoryMovie(dataAxios, generateCategory)
    })
    .catch(error=>{
      console.log(error)
    })
}
// async function getMoviesCategory(apiUrl,id,container){
//   api.get(`${apiUrl}`,{params: {with_genres:id}})
//     .then((response)=>{
//       const dataAxios = response.data.results
//       generateMovie(
//         dataAxios,
//         container,
//         {
//           clean:true,
//           lazyLoad:true
//         }
//       )
//     })
//     .catch(error=>{
//       console.log(error)
//     })
// }
async function responseApi({
  apiUrl,
  params:{
    nameMovie = "",
    idCategory = ""
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

// async function getMoviesSearch(apiUrl,srting,container){
//   api.get(`${apiUrl}`,{params: {query: srting}})
//     .then((response)=>{
//       const dataAxios = response.data.results
//       generateMovie(
//         dataAxios,
//         container,
//         {
//           clean:true,
//           lazyLoad:true
//         }
//       )
//       querySearchMovie = srting
//     })
//     .catch(error=>{
//       console.log(error)
//     })
// }
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
      imageSelect.setAttribute('src',`https://image.tmdb.org/t/p/w300/${movie.data.poster_path}`)
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
    console.log(movie)
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
    const scrollBotton = (scrollTop + clientHeight) >= (scrollHeight - 100)
    if(scrollBotton ){
      count++
      api.get(`${apiUrl}`,{params: {page: count, query: query, with_genres:id}})
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