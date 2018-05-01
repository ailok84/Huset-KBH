let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("show me: " + id);


fetch("http://ailishkearns.com/wpt/wp-json/wp/v2/films/" + id + "?_embed")
    .then(e => e.json())
    .then(showSinglePost)


function showSinglePost(aPost) {
    console.log(aPost._embedded);
    document.querySelector("#singleFilm h1").textContent = aPost.title.rendered;
    document.querySelector(".price").textContent = aPost.acf.price;
    document.querySelector(".genre").textContent = aPost.acf.genre;
    document.querySelector(".location").textContent = aPost.acf.location;
    document.querySelector(".time").textContent = aPost.acf.time;
    document.querySelector(".weekday").textContent = aPost.acf.weekday;
    document.querySelector(".doors").textContent = aPost.acf.doors;
    document.querySelector(".director").textContent = aPost.acf.director;
    document.querySelector(".date").textContent = aPost.acf.date;
    document.querySelector(".shortdescription").innerHTML = aPost.content.rendered;

    if (aPost._embedded["wp:featuredmedia"]) { //img is there
        document.querySelector(".poster").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url)
    } else { // no img
        document.querySelector(".poster").remove()
    }



    //show carsection
    document.querySelector("#singleFilm").classList.add("slideInFilm");
}
