let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("show me: " + id);


fetch("http://ailishkearns.com/wpt/wp-json/wp/v2/films/" + id + "?_embed")
    .then(e => e.json())
    .then(showSinglePost)


function showSinglePost(aPost) {
    console.log(aPost._embedded);
    document.querySelector("#singleFilm h1").textContent = aPost.title.rendered;
    document.querySelector(".price span").textContent = aPost.acf.price;
    document.querySelector(".genre span").textContent = aPost.acf.genre;
    document.querySelector(".location span").textContent = aPost.acf.location;
    document.querySelector(".time span").textContent = aPost.acf.time;
    document.querySelector(".weekday span").textContent = aPost.acf.weekday;
    document.querySelector(".doors span").textContent = aPost.acf.doors;
    document.querySelector(".director span").textContent = aPost.acf.director;
    //document.querySelector(".date").textContent = aPost.acf.date;
    document.querySelector(".shortdescription").innerHTML = aPost.content.rendered;
    var year = aPost.acf.date.substring(0, 4);
    var month = aPost.acf.date.substring(4, 6);
    var day = aPost.acf.date.substring(6, 8);

    document.querySelector(".date span").textContent = day + "." + month + "." + year;




    if (aPost._embedded["wp:featuredmedia"]) { //img is there
        document.querySelector(".poster").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url)
    } else { // no img
        document.querySelector(".poster").remove()
    }



    //show carsection
    document.querySelector("#singleFilm").classList.add("slideInFilm");
}
