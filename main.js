const twitchID = 'bnbkg45d3juqaq8iu3a7bqb0fkud7r';
const searchList = document.querySelector('.search__list');
const channelTitles = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin'];
const channelStreamStatus = [];
const channelStreamTitle = [];

function createEndpoint(type, channel) {
  return `https://wind-bow.gomix.me/twitch-api/${type}/${channel}?callback=?`
}

$.each(channelTitles, function(i, val) {
  $.getJSON(createEndpoint('streams', val), function(data) {
    console.log(data);
    if(data.stream) {
      channelStreamStatus.push('streaming');
      channelStreamTitle.push(`${data.stream.channel.game}: ${data.stream.channel.status}`);
    } else {
      channelStreamStatus.push('offline');
      channelStreamTitle.push('');
    }
  });
})

setTimeout(function(){
  // setTimeout Allowls channelStreamStatus to be populated
  $.each(channelTitles, function(i, val) {
    $.getJSON(createEndpoint('channels', val), function(data) {
      console.log(data);
      console.log(`${val} is ${channelStreamStatus[i]}`);
      let streamStatus = channelStreamStatus[i];
      let logo = data.logo;
      logo ? logo = logo : logo = logo = 'https://unsplash.it/100/100';

      // Does user exist?
      let isError = data.error;

      const item = document.createElement('a');
      item.className = `search__item ${channelStreamStatus[i]}`;
      item.setAttribute('href', data.url);
      item.setAttribute('target', '_blank');
      item.setAttribute('rel', 'noopener');

      const avatar = document.createElement('div');
      avatar.classList.add('avatar');

      const img = document.createElement('img');
      img.setAttribute('src', logo);
      avatar.appendChild(img);
      item.appendChild(avatar);


      const user = document.createElement('div');
      user.classList.add('user');
      const userName = document.createElement('div');
      userName.classList.add('user-name');
      if (data.error) {
        userName.textContent = data.message;
        item.classList.add('unknown-user');
        item.removeAttribute('href');
        item.removeAttribute('rel');
        item.removeAttribute('target');
      } else {
        userName.textContent = data.name;
      }
      user.appendChild(userName);

      const status = document.createElement('div');
      status.className = `status`;
      status.textContent = streamStatus;
      item.appendChild(user);
      item.appendChild(status);
      searchList.appendChild(item);

      if(streamStatus == "streaming") {
        const streamContainer = document.createElement('div');
        let gameTitle = data.game;
        let gameStatus = data.status;
        // Some game titles and statuses are showing as 'null'
        if(gameTitle == null) {
          gameTitle = '';
        } else {
          gameTitle = `${gameTitle} - `;
        }
        if(gameStatus == null) {
          gameStatus = 'Streaming, without a title.';
        } else {
          gameStatus = gameStatus;
        }
        streamContainer.className = 'stream-title';
        streamContainer.textContent = `${gameTitle}${gameStatus}`;
        user.append(streamContainer);
      }
    })
  });
}, 300);
