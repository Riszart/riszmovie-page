let count
buttonSearch.addEventListener('click', ()=>{
  // console.log(inputSearch.value)
  search()
})
function search(){
  if(!inputSearch.value==''){
    location.hash = `#search=${inputSearch.value}`
  }
}
arrowBotton.addEventListener('click', ()=>{
  history.back()
  // location.hash = '#home='
})
trendsButton.addEventListener('click', ()=>{
  location.hash = '#trends'
})

window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator(){
  if(location.hash.startsWith('#trends')){trendsPage()}
  else if(location.hash.startsWith('#search=')){searchPage()}
  else if(location.hash.startsWith('#movie=')){movieDetailPage()}
  else if(location.hash.startsWith('#category=')){categoriesPage()}
  else{homePage()}
  window.scrollTo({
    top:0,
    left:0
  })
}

function homePage(){
  // console.log('home')
  title.classList.remove('inactive')
  containerSearch.classList.remove('inactive')
  header.classList.add('inactive')
  containerMovieSelect.classList.add('inactive')
  categorySearch.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  containerTrends.classList.remove('inactive')
  containerCategories.classList.remove('inactive')
  trends.classList.add('inactive')
  containerFooter.classList.remove('inactive')

  gettrendingPreview() 
  getCategories()
}

function categoriesPage(){
  count = 1
  // console.log('categories')
  header.classList.remove('inactive')
  containerSearch.classList.add('inactive')
  title.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  containerMovieSelect.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  categorySearch.classList.remove('inactive')
  trends.classList.add('inactive')

  const [_, categoryData] = location.hash.split('=') 
  const [categoryId, categoryName] = categoryData.split('-')
  getMoviesCategory(categoryId, true, count)
  titleCategorySearch.innerHTML = categoryName.split('%20').join(' ')
  categoryButton.onclick = ()=>{
    count++
    getMoviesCategory(categoryId, false, count)
  }
}

function movieDetailPage(){
  // console.log('movies')
  containerSearch.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  containerFooter.classList.add('inactive')
  categorySearch.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  containerMovieSelect.classList.remove('inactive')
  arrowBotton.classList.remove('inactive')
  trends.classList.add('inactive')
  header.classList.remove('inactive')

  const [_, movieid] = location.hash.split('=') 
  getMovieById(movieid)
}

function searchPage(){
  count = 1
  // console.log('search')
  header.classList.remove('inactive')
  categorySearch.classList.add('inactive')
  title.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  containerMovieSelect.classList.add('inactive')
  listMovieSearch.classList.remove('inactive')
  trends.classList.add('inactive')
  containerFooter.classList.remove('inactive')
  
  //['#search','string']
  const [_, query] = location.hash.split('=') 
  getMoviesSearch(query,true, count)
  buttonSeeMoreSearch.onclick = ()=>{
    count++
    getMoviesSearch(query ,false , count)
  }
}

function trendsPage(){
  count = 1
  // console.log('trends')
  containerSearch.classList.add('inactive')
  containerTrends.classList.add('inactive')
  containerCategories.classList.add('inactive')
  header.classList.remove('inactive')
  trends.classList.remove('inactive')
  containerMovieSelect.classList.add('inactive')
  categorySearch.classList.add('inactive')
  listMovieSearch.classList.add('inactive')
  trnedsMovie(false, count)
  buttonSeeMoreTrends.onclick = ()=>{
    count++
    trnedsMovie(true, count)
  }
}
// div3.addEventListener("click",event => {
//   event.stopPropagation()
//   });

// const Cr = (elemento) => document.createElement(elemento);
// const parrafo = Cr('p');

document.body.addEventListener("keydown", event=>{
  if(event.code === "Escape")history.back()
})
document.body.addEventListener("keydown", event=>{
  if(event.code === "Enter")search()
})
