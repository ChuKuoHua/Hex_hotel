const roomList = document.getElementById('room-list');
const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const token = 'YgRO5RRU2GzDxTIbOwqKolkqlgnPA2GwVpFvbGPC9T197e6wRVOHMkHO7JRG';
let data = [];

axios.defaults.headers['Authorization'] = `Bearer ${token}`;

axios.get(url).then((res) => {
  data = res.data.items;
  render(data);
  document.querySelector('.loading-box').classList.add('active');
});

function render(){
  let str = '';
  data.forEach((room) => {
    str += `
    <div class="col-md-4 col-md-6 pl-0 room-box">
      <div class="room-bg" style="background-image:url(${room.imageUrl})">
        <a class="room-link" href="./room.html?id=${room.id}">
          <div class="room-content">
            <div class="room-tit text-center">
              ${room.name}
            </div>
            <span class="normal">${currency(room.normalDayPrice)} / 平日</span>
            <span class="holiday">${currency(room.holidayPrice)} / 假日</span>
          </div>
        </a>
      </div>
    </div>
    `
  })
  roomList.innerHTML = str;
};