import React, { useEffect } from "react";

const Wheel = ({ setTheWheel, submitted, wheelActive, setConfettiActive, setWinner, setSpinning ,executeScroll,nameList}) => {


  // -------------------------------------------------------
  // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
  // -------------------------------------------------------
  function alertPrize(indicatedSegment) {
    // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    // alert("You have won " + indicatedSegment.text);
    setConfettiActive(true);
    setWinner(indicatedSegment.text);
    setSpinning(false);
    executeScroll();
    // setSubmitted(false);
  }

  useEffect(() => {
    if (!submitted) return;
    if (!wheelActive) return;
    // Create new wheel object specifying the parameters at creation time.
    let theWheelObj = {
      'numSegments': 8,
      'outerRadius': 212,
      'centerX': 217,
      'centerY': 219,
      'textFontSize': 28,
      'segments':
        [
          { 'fillStyle': '#eae56f', 'text': 'Prize 1' },
          { 'fillStyle': '#89f26e', 'text': 'Prize 2' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize 3' },
          { 'fillStyle': '#e7706f', 'text': 'Prize 4' },
          { 'fillStyle': '#eae56f', 'text': 'Prize 5' },
          { 'fillStyle': '#89f26e', 'text': 'Prize 6' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize 7' },
          { 'fillStyle': '#e7706f', 'text': 'Prize 8' }
        ],
      'animation':
      {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished': alertPrize
      }
    };
    theWheelObj.numSegments = nameList.length;
    theWheelObj.segments = nameList.map(item => {
      return {
        fillStyle: '#ffffff',
        text: item
      }
    });
    setTheWheel(new window.Winwheel(theWheelObj));
    // eslint-disable-next-line
  }, [submitted, wheelActive, setTheWheel]);
  return (
    <canvas id='canvas' width='500' height='500' >
      Canvas not supported, use another browser.
    </canvas>
  )
}

export default Wheel;