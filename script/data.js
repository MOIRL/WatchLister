const movies = [
 {
 image: "https://www.sangritoday.com/uploads/images/202604/image_1200x675_69de8db105428.webp",
 title: "Spider-Man: Brand New Day",
 director: "Destin Daniel Cretton"
 },
 {
 image: "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
 title: "Guardians of the Galaxy: Volume 3",
 director: "James Gunn"
 },
 {
 image: "https://image.tmdb.org/t/p/original/yihdXomYb5kTeSivtFndMy5iDmf.jpg",
 title: "Project Hail Mary",
 director: "Phil Lord, Christopher Miller"
 },
 {
 image: "https://www.comingsoon.net/wp-content/uploads/sites/3/2023/04/spider-man-across-the-spider-verse-poster.png?w=691",
 title: "Spiderman into the Spiderverse",
 director: "Peter Ramsey"
 },
 {
 image: "https://deadline.com/wp-content/uploads/2023/04/barbie-BARBIE_VERT_TSR_W_TALENT_2764x4096_DOM_rgb.jpg?w=800",
 title: "Barbie",
 director: "Greta Gerwig"
 },
 {
 image: "https://preview.redd.it/new-poster-for-the-drama-v0-ygm26foh20qg1.jpeg?width=640&crop=smart&auto=webp&s=5fcd728c774a437bd2700eb2b5f4a61861617d80",
 title: "The Drama",
 director: "Kristoffer Borgli"
 },
 {
 image: "https://preview.redd.it/official-poster-for-christopher-nolans-the-odyssey-v0-v96w4n3x8z7g1.jpeg?width=640&crop=smart&auto=webp&s=fb43c0e4158a174eabc03af7cd53738c9b86da3a",
 title: "The Odyssey",
 director: "Christopher Nolan"
 },
 {
 image: "https://i.ebayimg.com/images/g/f7oAAOSwK-1nYF5s/s-l1200.jpg",
 title: "Superman",
 director: "James Gunn"
 }
 ];

const API_BASE = "backend";

let favorites = [];
let ratings = {};
let currentUser = null;