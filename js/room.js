const id = location.search.split("=")[1];
const url = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`;
const token = 'YgRO5RRU2GzDxTIbOwqKolkqlgnPA2GwVpFvbGPC9T197e6wRVOHMkHO7JRG';
const imgCarousel = document.querySelector(".carousel-inner");
const roomInfo = document.querySelector(".Info");
const amenitiesList = document.querySelector(".amenities-list");
let roomData = [];

axios.defaults.headers['Authorization'] = `Bearer ${token}`;

axios.get(url).then((res) => {
	roomData = res.data.room[0];
	photos(roomData);
	infoRoom(roomData);
  amenitiesRoom(roomData);
  document.querySelector('.loading-box').classList.add('active');
});

// 照片切換
function photos(){
  const imgLa = document.querySelector('.img-la');
  const imgGroup = document.querySelectorAll('.list-group li');
  imgLa.innerHTML = `<img src="${roomData.imageUrl[0]}"/>`;
  imgGroup.forEach((roomImg, i) => {
    let show = `<img src="${roomData.imageUrl[i]}"/>`
    roomImg.innerHTML = show;
    roomImg.addEventListener('mouseover', () => {
      imgLa.innerHTML = show;
    })
  })
}
// 內容介紹
function infoRoom() {
  roomInfo.innerHTML = `
  <h3 class="mt-3 font-weight-bolder">${roomData.name}</h3>
  <p>${roomData.description}</p>
  <div class="room-price">
    <p class="mr-3">平日每晚： ${currency(roomData.normalDayPrice)}</p>
    <p class="mr-3 holiday-Price">假日每晚： ${currency(roomData.holidayPrice)}</p>
  </div>
  <hr>
	<ul class="description">
		<li class="w-50">人數限制： ${roomData.descriptionShort.GuestMin} ~ ${roomData.descriptionShort.GuestMax}</li>
		<li class="w-50">床型： ${roomData.descriptionShort.Bed[0]}</li>
		<li class="w-50">衛浴： ${roomData.descriptionShort["Private-Bath"]} 間 </li>
    <li class="w-50">房間大小： ${roomData.descriptionShort.Footage} 平方公尺 </li>
    <li class="w-50">Check In： ${roomData.checkInAndOut.checkInEarly} ~ ${roomData.checkInAndOut.checkInLate}</li>
    <li class="w-50">Check Out： ${roomData.checkInAndOut.checkOut}</li>
  </ul>
  <hr>
	`;
}
// 房間設施
function amenitiesRoom() {
  const keys = ['Wi-Fi', 'Television', 'Great-View', 'Breakfast', 'Air-Conditioner', 'Smoke-Free', 'Mini-Bar', 'Refrigerator', 'Child-Friendly', 'Room-Service', 'Sofa', 'Pet-Friendly'];
  const amenitiesList = document.querySelectorAll('.amenities-list li');
  keys.forEach((item, i) => {
    if(roomData.amenities[item]){
      amenitiesList[i].classList.add('active');
    } else {
      amenitiesList[i].classList.remove('active');
    }
  })
};