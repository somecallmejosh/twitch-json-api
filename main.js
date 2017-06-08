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

      let logo = data.logo;
      logo ? logo = logo : logo = logo = 'https://unsplash.it/100/100';

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
      userName.textContent = data.name;
      user.appendChild(userName);

      // TODO: if user doesn't exist
      // Will need to reconstruct logic to show varying user states
      // Show user name
      // Append message
      // Show a different image for this user


      // TODO: if one exsits, add stream title
      // Then append it to the user container
      // if(channelStreamTitle[i].length) {
        // create element
        // add Class
        // add text content
        // append to user
      // }

      const status = document.createElement('div');
      status.className = `status`;
      status.textContent = channelStreamStatus[i];
      item.appendChild(user);
      item.appendChild(status);
      searchList.appendChild(item);
    })
  });
}, 200);
