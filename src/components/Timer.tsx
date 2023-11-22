import React, { useState } from 'react';
import { TimerProps } from '../../types';

const Timer = (props: TimerProps): JSX.Element => {
  // const [duration, setDuration] = useState(0);

  // async function handleSubmit(e) {
  //   // Prevents the browser from refreshing the page upon submit
  //   e.preventDefault();
  //   const form = e.target;
  // }

  // function initializeClock(duration: number) {
  //   const clock = document.getElementById('timer');
  //   const hoursLeft = document.getElementById('hours')!;
  //   const minutesLeft = document.getElementById('minutes')!;
  //   const secondsLeft = document.getElementById('seconds')!;

  // function updateClock() {
  //   const t = getTimeRemaining(duration);

  //   hoursLeft.innerHTML = ('0' + t.hours).slice(-2);
  //   minutesLeft.innerHTML = ('0' + t.minutes).slice(-2);
  //   secondsLeft.innerHTML = ('0' + t.seconds).slice(-2);

  //   if (t.total <= 0) {
  //     clearInterval(timeinterval);
  //   }
  // }

  //   updateClock();
  //   const timeinterval = setInterval(updateClock, 1000);
  // }

  // initializeClock(duration);

  return (
    <div id='timer'>
      <div>
        <span className='hours'></span>
        <div className='smalltext'>Hours</div>
      </div>
      <div>
        <span className='minutes'></span>
        <div className='smalltext'>Minutes</div>
      </div>
      <div>
        <span className='seconds'></span>
        <div className='smalltext'>Seconds</div>
      </div>
      <hr />
      <form>
        <h4> Duration </h4>
        <label>
          Enter time: <input name='durationInput' />
        </label>
        <button id='start' type='submit'>
          Start Timer
        </button>
      </form>
    </div>
  );
};

export default Timer;
