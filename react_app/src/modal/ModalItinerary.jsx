import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

class ModalItinerary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      dates: [],
      duration: null,
      trip: {},
      events: [],
      dayBase: 1
    };
    this.getNewIndicatorSet = this.getNewIndicatorSet.bind(this);
  }

  isClicked(id, e) {
    this.setState({
      day: id,
    });
  }

  getNewIndicatorSet() {
    const dayBase = this.state.dayBase;
    const newDayBase = dayBase + 7;
    console.log(newDayBase);
    this.setState({
      dayBase: newDayBase
    });
  }

  getSlideIndicator(dayBase) {
    let indicator = [];
      for (let i = 0; i < 7; i++) {

        if (i != 0) {
          indicator.push(
            <li onClick={(e) => this.isClicked(dayBase + i, e)}>
              <p className="day-flag">Day {dayBase + i}</p>
              <span className={(this.state.day === (dayBase + i) ? 'point active' : 'point')}></span>
            </li>
          );
        } else {
          indicator.push(
            <li onClick={(e) => this.isClicked(dayBase, e)}>
              <p className="day-flag">Day {dayBase}</p>
              <span className={(this.state.day === dayBase || this.state.day === 0 ? 'point active' : 'point')}></span>
            </li>
          );
        }
      }
      return indicator;
  }

  getItineraryRadio(dayBase){
    let radio = [];
    for (let i = 0; i < 7; i++) {
      if (i != 0) {
        radio.push(
          <input type="radio" name="slideshow" id={'switch'+(dayBase + i)} dayBase checked={(this.state.day === (dayBase + i) ? 'checked' : null)} />
        );
      } else {
        radio.push(
          <input type="radio" name="slideshow" id={'switch'+(dayBase)} defaultChecked />
        );
      }
    }
    return radio;
  }


  getSchedule(){
    let schedule =
      {
        day1: [
          {time: '6:00am', name: 'Departing Flight', details: 'Air Canada 2000 Gate:E3 <br />Boarding: 5:30 am Destination: Milano, Italy' },
          {time: '8:00am', name: 'Arriving Airport', details: 'To city by a bus' },
          {time: '2:00pm', name: 'The Savoy', details: 'Hotel check-in' },
          {time: '7:00pm', name: 'Events', details: 'Show at Motley Crue American Airlines Arena' },
          {time: '8:00pm', name: 'Hotel', details: 'Lorem ipsum dolor sit amet, diceret blandit cu mei.' }
        ],
        day2: [
          {time: '8:00am', name: 'Breakfast', details: 'At hotel' },
          {time: '10:00am', name: 'Gallery', details: 'Find out Galleria Bianconi' },
          {time: '12:30pm', name: 'Lunch', details: 'At local restaurant' },
          {time: '2:00pm', name: 'City Half Day Tour', details: 'Explore the city' },
          {time: '6:00pm', name: 'Dinner', details: 'at ABC restaurant' },
          {time: '8:00pm', name: 'Show', details: 'at hotel' }
        ],
        day3: [
          {time: '8:00am', name: 'Breakfast', details: 'At hotel' },
          {time: '10:00am', name: 'Day 3', details: 'Activities' },
          {time: '12:30pm', name: 'Lunch', details: 'At local restaurant' },
          {time: '2:00pm', name: 'City Half Day Tour', details: 'Explore the city' },
          {time: '6:00pm', name: 'Dinner', details: 'at ABC restaurant' },
          {time: '8:00pm', name: 'Show', details: 'at hotel' }
        ],
        day4: [
          {time: '8:00am', name: 'Breakfast', details: 'At hotel' },
          {time: '10:00am', name: 'Day 4', details: 'Activities' },
          {time: '12:30pm', name: 'Lunch', details: 'At local restaurant' },
          {time: '2:00pm', name: 'City Half Day Tour', details: 'Ei justo mollis sit. His feugiat pertinacia eu, porro rationibus vis eu. Eum facer commune adversarium ei. Mel ei harum audiam aeterno, pro ne mazim expetenda philosophia.' },
          {time: '6:00pm', name: 'Dinner', details: 'at ABC restaurant' },
          {time: '8:00pm', name: 'Show', details: 'at hotel' }
        ],
        day5: [
          {time: '8:00am', name: 'Breakfast', details: 'At hotel' },
          {time: '10:00am', name: 'Day 5', details: 'Activities' },
          {time: '12:30pm', name: 'Lunch', details: 'At local restaurant' },
          {time: '2:00pm', name: 'City Half Day Tour', details: 'Explore the city' },
          {time: '6:00pm', name: 'Dinner', details: 'at ABC restaurant' },
          {time: '8:00pm', name: 'Show', details: 'Ei justo mollis sit. His feugiat pertinacia eu, porro rationibus vis eu. Eum facer commune adversarium ei. Mel ei harum audiam aeterno, pro ne mazim expetenda philosophia.' }
        ],
        day6: [
          {time: '8:00am', name: 'Breakfast', details: 'At hotel' },
          {time: '10:00am', name: 'Day 6', details: 'Activities' },
          {time: '12:30pm', name: 'Lunch', details: 'At local restaurant' },
          {time: '2:00pm', name: 'City Half Day Tour', details: 'Explore the city' },
          {time: '6:00pm', name: 'Dinner', details: 'at ABC restaurant' },
          {time: '8:00pm', name: 'Show', details: 'at hotel' }
        ],
        day7: [
          {time: '8:00am', name: 'Breakfast', details: 'At hotel' },
          {time: '10:00am', name: 'Day 7', details: 'Activities' },
          {time: '12:30pm', name: 'Lunch', details: 'At local restaurant' },
          {time: '2:00pm', name: 'City Half Day Tour', details: 'Ei justo mollis sit. His feugiat pertinacia eu, porro rationibus vis eu. Eum facer commune adversarium ei. Mel ei harum audiam aeterno, pro ne mazim expetenda philosophia.' },
          {time: '6:00pm', name: 'Dinner', details: 'at ABC restaurant' },
          {time: '8:00pm', name: 'Show', details: 'at hotel' }
        ]
      };
    let output = [];
    let section = '';
    let duration = Object.keys(schedule).length; // 7

    Object.keys(schedule).forEach(function(day) {
      let dayNum = day.substr(3);
      //console.log(day, schedule[][day]);
      //output.push(key, schedule[][day]);

      let daySchedule = schedule[day];
      let sectionChildren = [];
      for (let j = 0; j < daySchedule.length; j++) {
        sectionChildren.push(
          <div className="list__item">
            <div className="list__time">{daySchedule[j].time}</div>
            <div className="list__border"></div>
            <div className="list__desc">
              <h3>{daySchedule[j].name}</h3>
              <div>{daySchedule[j].details}</div>
              <div className="border"></div>
            </div>

          </div>
        );
      }
      section = (
        <section id={'slide'+(dayNum)}>
          <div className="list" id={day}>
            <p className="title">{'Day ' + dayNum}</p>
             {sectionChildren}
          </div>
        </section>);

      output.push(section);
    });

  return output;
  }


  tripLength = () => {
    let start = moment(this.state.start_date, "YYYY-MM-DD");
    let end = moment(this.state.end_date, "YYYY-MM-DD");

    //Difference in number of days
    return moment(start).diff(end, 'days');
  }

  eventDates = () => {
    const theDays = [];
    const loop = this.state.events.forEach((day) => {
      theDays.push(day.date);
      theDays.sort();
      return theDays;
    });
  }




  componentWillReceiveProps(nextProps){
  if(nextProps.trip !== undefined)
    this.setState({ trip: nextProps.trip, events: nextProps.trip.events } , ()=>{
        console.log("state", this.state)
      });
  }





  render() {




    const dayBase = this.state.dayBase;

    let sliderTop = (
      <div id="itinerary-top">
        <ol>
          {this.getSlideIndicator(dayBase)}
        </ol>
        <p className="arrow prev"><i class="fa fa-chevron-left"></i></p>
        <p className="arrow next" onClick={this.getNewIndicatorSet}><i class="fa fa-chevron-right"></i></p>
      </div>
    );

    let slider = (
      <div id="itinerary-wrapper">
        {this.getItineraryRadio(dayBase)}
        <div id="slideshow">
          <div className="slideContents">
            {this.getSchedule()}
          </div>
          <p className="arrow prev">
            <i className="ico"></i>
            <label htmlFor="switch1"></label>
            <label htmlFor="switch2"></label>
            <label htmlFor="switch3"></label>
            <label htmlFor="switch4"></label>
            <label htmlFor="switch5"></label>
            <label htmlFor="switch6"></label>
            <label htmlFor="switch7"></label>
          </p>
          <p className="arrow next">
            <i className="ico"></i>
            <label htmlFor="switch1"></label>
            <label htmlFor="switch2"></label>
            <label htmlFor="switch3"></label>
            <label htmlFor="switch4"></label>
            <label htmlFor="switch5"></label>
            <label htmlFor="switch6"></label>
            <label htmlFor="switch7"></label>
          </p>
        </div>
      </div>
    );
    return (
      <div id="modal">
        <div className="modal fade" id="itinerary" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body chat">
                {sliderTop}
                <div id="showarea">
                {slider}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ModalItinerary