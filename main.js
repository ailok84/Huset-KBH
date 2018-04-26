let template = document.querySelector("#filmtemp").content;
let filmlist = document.querySelector("#filmlist");
let page = 1;
let lookingForData = false;

function fetchFilms() {
    lookingForData = true;

    let urlParams = new URLSearchParams(window.location.search);

    let catid = urlParams.get("category");
    let endpoint = "http://ailishkearns.com/wpt/wp-json/wp/v2/films?_embed&per_page=6&page=" + page
    if (catid) { // DRY
        endpoint = "http://ailishkearns.com/wpt/wp-json/wp/v2/films?_embed&per_page=2&page=" + page + "&categories=" + catid
    }
    fetch(endpoint)
        .then(e => e.json())
        .then(showFilms);


}

function showFilms(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleFilm);
}

function showSingleFilm(aFilm) {
    let clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = aFilm.title.rendered;
    clone.querySelector(".shortdescription").innerHTML = aFilm.acf.shortdescription;
    clone.querySelector(".price span").textContent = aFilm.acf.price;
    clone.querySelector(".genre").textContent = aFilm.acf.genre;
    clone.querySelector(".location").textContent = aFilm.acf.location;
    clone.querySelector(".time").textContent = aFilm.acf.time;
    clone.querySelector(".weekday").textContent = aFilm.acf.weekday;
    clone.querySelector(".doors").textContent = aFilm.acf.doors;
    clone.querySelector(".director").textContent = aFilm.acf.director;

    var day = aFilm.acf.date.substring(0, 2);
    var month = aFilm.acf.date.substring(2, 4);
    var year = aFilm.acf.date.substring(4, 8);


    clone.querySelector(".date").textContent = day + "." + month + "." + year;


    if (aFilm._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", aFilm._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }

    clone.querySelector('.readmore').href = "subpage.html?id=" + aFilm.id;


    filmlist.appendChild(clone);
}
fetchFilms();


//found this stuff online
setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        fetchFilms();
    }
}, 1000)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}
