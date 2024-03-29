import React, { useState, useEffect, useRef } from "react";
import Confetti from 'react-dom-confetti';
import Wheel from "./Wheel";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 300)

const MainForm = ({ winner, setWinner, spinning, setSpinning }) => {
  const [currentName, setCurrentName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [tempNameList, setTempNameList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [wheelActive, setWheelActive] = useState(true);
  const [theWheel, setTheWheel] = useState();
  const [confettiActive, setConfettiActive] = useState(false);
  const myRef = useRef(null)
  /*winwheel*/
  // Vars used by the code in this page to do power controls.
  let wheelPower = 0;
  let wheelSpinning = false;

  const confettiConfig = {
    angle: 90,
    spread: 240,
    startVelocity: 40,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const executeScroll = () => scrollToRef(myRef)
  const handleSubmitNames = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    // console.log(name);
    let newNameList = [];
    newNameList = [...nameList, name];
    setNameList(newNameList);
    setCurrentName("");
  }

  const handleClickTambah = e => {
    e.preventDefault();
    const name = currentName;
    if (!name) {
      alert("Tolong input data terlebih dahulu");
      return;
    }
    // console.log(name);
    let newNameList = [];
    newNameList = [...nameList, name];
    setNameList(newNameList);
    setCurrentName("");
  }

  const handleChangeWheel = e => {
    console.log('wheel active', e.target.checked);
    setWheelActive(e.target.checked);
  }

  const handleClickRemove = index => {
    const newNameList = nameList.filter((item, idx) => {
      return idx !== index
    });
    setNameList(newNameList);
  }

  const handleChangeName = e => {
    const name = e.target.value;
    setCurrentName(name);

  }

  const handleSubmitRandom = e => {
    e.preventDefault();
    /* combine from temp */
    let newNameList = nameList.map((item, index) => {
      const found = tempNameList.find(itemTemp => {
        return itemTemp.idx === index;
      });
      if (found) {
        return found.name
      } else {
        return item;
      }
    })
    console.log(newNameList);
    /* get random */
    const randomIndex = newNameList.length * Math.random() | 0;
    const randomName = newNameList[randomIndex];

    // scrollToRef(myRef);

    // myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSubmitted(true);

    if (!wheelActive) {
      setWinner(randomName);
      setConfettiActive(true);
    } else {
      if (theWheel) {
        resetWheel();
        startSpin();
      }
      setConfettiActive(false);
      setWinner(null);

    }
    setNameList(newNameList);
  }

  const handleClickReset = () => {
    setNameList([]);
    setWinner(null);
    setSubmitted(false);
  }

  const handleClickBack = () => {
    setWinner(null);
    setSubmitted(false);
  }

  const handleChangeNameByIndex = (index, e) => {
    e.persist();
    const val = e.target.value;
    let curTempIndex;
    const foundTemp = tempNameList.find((item, idx) => {
      curTempIndex = idx;
      return item.idx === index;
    });
    // console.log('foundtemp', foundTemp);
    // console.log(tempNameList);
    // return;
    if (foundTemp) {
      let newTempNameList = [...tempNameList];
      newTempNameList[curTempIndex].name = val;
      setTempNameList(newTempNameList)
    } else {
      const obj = {
        idx: index,
        name: val
      }
      // console.log(obj);
      setTempNameList([...tempNameList, obj])
    }

  }

  // -------------------------------------------------------
  // Click handler for spin button.
  // -------------------------------------------------------
  function startSpin() {
    setSpinning(true);
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning === false) {
      // Based on the power level selected adjust the number of spins for the wheel, the more times is has
      // to rotate with the duration of the animation the quicker the wheel spins.
      if (wheelPower === 1) {
        theWheel.animation.spins = 3;
      } else if (wheelPower === 2) {
        theWheel.animation.spins = 8;
      } else if (wheelPower === 3) {
        theWheel.animation.spins = 15;
      }

      // Disable the spin button so can't click again while wheel is spinning.
      // document.getElementById('spin_button').src = "http://dougtesting.net//elements/images/examples/spin_off.png";
      // document.getElementById('spin_button').className = "";

      // Begin the spin animation by calling startAnimation on the wheel object.
      theWheel.startAnimation();

      // Set to true so that power can't be changed and spin button re-enabled during
      // the current animation. The user will have to reset before spinning again.
      wheelSpinning = true;
    }
  }

  // -------------------------------------------------------
  // Function for reset button.
  // -------------------------------------------------------
  function resetWheel() {
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    // document.getElementById('pw1').className = "";  
    // document.getElementById('pw2').className = "";
    // document.getElementById('pw3').className = "";

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
  }

  useEffect(() => {
    // if (submitted) {
    setTimeout(() => {
      // setSubmitted(false);
      if (!wheelActive) {
        setSubmitted(false);
        // alert("yow");
        setConfettiActive(false);
      }
    }, 100);
    // }
    // alert("yolo");
  }, [confettiActive, wheelActive]);

  useEffect(() => {
    if (confettiActive) {
      setTimeout(() => {
        // setSubmitted(false);
        if (wheelActive) {
          // alert("yow");
          setConfettiActive(false);
        }
      }, 100);
    }
  }, [confettiActive, wheelActive]);

  useEffect(() => {
    if (!theWheel) return;
    startSpin();
    // eslint-disable-next-line
  }, [theWheel,]);

  return (
    <>
      {/* <Confetti active={submitted} config={confettiConfig} /> */}



      <div style={{ display: wheelActive && submitted ? 'block' : 'none' }}>
        <div className="is-flex" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Wheel setTheWheel={setTheWheel} submitted={submitted} wheelActive={wheelActive} setConfettiActive={setConfettiActive} setWinner={setWinner} setSpinning={setSpinning} executeScroll={executeScroll} nameList={nameList} />
        </div>
      </div>

      <div style={{ display: winner ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', marginBottom: '10em' }} ref={myRef}>
        <div className="is-flex" style={{ justifyContent: 'center' }}>
          <Confetti active={confettiActive} config={confettiConfig} />
        </div>
        <h3 className="mb-3" >Pemenangnya adalah <strong>{winner}</strong>
        </h3>
        <div className="field is-grouped">
          <p className="control">
            <button onClick={handleClickBack} className="button is-secondary is-small">
              <span className="icon is-ismall">
                <i className="fas fa-chevron-left"></i>
              </span>
              <span>Back</span></button>

          </p>
          <p className="control">
            <a className="button is-danger is-light is-small" href="https://saweria.co/dytraio" target="_blank" rel="noopener noreferrer">
              <span className="icon is-small">
                <i className="fas fa-heart"></i>
              </span>
              <span>Beri Tip</span>
            </a>
          </p>
        </div>
      </div>

      { !winner && !submitted && nameList.map((item, index) => {
        return (
          <div className="columns mb-3" key={index + item}>

            <div className="column is-9">
              <div className="field has-addons" key={index}>
                {/* <div className="control is-flex"> */}
                {/* <span className="mr-3 is-flex" style={{ alignItems: 'center' }}>

                  </span> */}
                <p class="control">
                  <span class="button is-static">{index + 1}</span>
                </p>
                <p class="control is-expanded">
                  <input key={'input' + index + item} name={`listed-name-${index}`} className="input" type="text" defaultValue={item} onInput={(e) => handleChangeNameByIndex(index, e)} />
                </p>

                {/* </div> */}
              </div>
            </div>
            <div className="column is-3">
              <button className="button is-danger" onClick={() => handleClickRemove(index)}>
                <span className="icon is-small">
                  <i className="fas fa-trash"></i>
                </span>
                <span>Hapus</span>
              </button>
            </div>
          </div>
        )
      })}

      {
        !winner && !submitted && (
          <>
            <form className="mb-5" onSubmit={handleSubmitNames}>
              <div className="field">
                <div className="control">

                  <div className="columns">

                    <div className="column is-9">
                      <input name="name" className="input" type="text" placeholder="Entry data..." onChange={handleChangeName} autoComplete="off" value={currentName} required />
                    </div>
                    <div className="column is-3">
                      <button className="button is-secondary" onClick={handleClickTambah} disabled={!currentName}>
                        <span className="icon is-small">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span>Tambah</span></button>

                    </div>

                  </div>
                </div>
              </div>
            </form>

          </>
        )
      }
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" onChange={handleChangeWheel} disabled={nameList?.length < 1} checked={wheelActive} /> Acakin dengan animasi animasi
          </label>
        </div>
      </div>
      <div className="buttons">
        <button className="button is-primary" onClick={handleSubmitRandom} disabled={nameList?.length < 1}>
          <span className="icon is-ismall">
            <i className="fas fa-sync"></i>
          </span>
          <span>Acakin</span></button>
        <button className="button is-secondary" onClick={handleClickReset} disabled={nameList?.length === 0}>Reset</button>
      </div>
    </>
  )
}

export default MainForm;