import React from 'react';

class WeatherWidget extends React.PureComponent {

  render() {
    return (
      <div style={{ paddingTop: '68px' }} >
        <a className="weatherwidget-io" href="https://forecast7.com/en/28d6677d23/delhi/" data-label_1="DELHI" data-label_2="WEATHER" data-icons="Climacons Animated" data-theme="original" >DELHI WEATHER</a>

        {!function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          // if (!d.getElementById(id)) {
          js = d.createElement(s);
          js.id = id;
          js.src = 'https:weatherwidget.io/js/widget.min.js';
          fjs.parentNode.insertBefore(js, fjs);
          // }
        }
          (document, 'script', 'weatherwidget-io-js')
        }

      </div>
    )
  }
};

export default WeatherWidget;