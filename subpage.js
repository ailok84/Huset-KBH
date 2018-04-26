let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://ailishkearns.com/wpt/wp-json/wp/v2/films" + id)
    .then(e => e.json())
    .then(showSinglePost)


function showSinglePost(aPost) {
    console.log(aPost);
    document.querySelector("#singleFilm h1").textContent = aPost.title.rendered;


    //show carsection
    document.querySelector("#singleFilm").classList.add("slideInFilm");
}
