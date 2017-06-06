const twitchID = 'bnbkg45d3juqaq8iu3a7bqb0fkud7r';
const searchList = document.querySelector('.search__list');
const channelTitles = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
const channelStreamStatus = [];

function createEndpoint(type, channel) {
  return `https://wind-bow.gomix.me/twitch-api/${type}/${channel}?callback=?`
}

$.each(channelTitles, function(i, val) {
  $.getJSON(createEndpoint('streams', val), function(data) {
    if(data.stream) {
      channelStreamStatus.push('streaming');
    } else {
      channelStreamStatus.push('offline');
    }
  });
})

setTimeout(function(){
  // setTimeout Allows channelStreamStatus to be populated
  $.each(channelTitles, function(i, val) {
    $.getJSON(createEndpoint('channels', val), function(data) {
      console.log(data);
      console.log(`${val} is ${channelStreamStatus[i]}`);
    })
  });
}, 100);
