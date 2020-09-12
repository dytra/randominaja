import React, { useState, useEffect } from "react";
import Confetti from 'react-dom-confetti';

const MainForm = () => {
  const [currentName, setCurrentName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [tempNameList, setTempNameList] = useState([]);
  const [winner, setWinner] = useState();
  const [submitted, setSubmitted] = useState(false);

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
    // console.log(name);
    let newNameList = [];
    newNameList = [...nameList, name];
    setNameList(newNameList);
    setCurrentName("");
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
    setSubmitted(true);
    setWinner(randomName);
    setNameList(newNameList);

  }

  const handleClickReset = () => {
    setNameList([]);
    setWinner(null);
  }

  const handleClickBack = () => {
    setWinner(null);
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

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setSubmitted(false);

      }, 100);
    }
  }, [winner]);

  return (
    <>
      {/* <Confetti active={submitted} config={confettiConfig} /> */}
      <div className="is-flex" style={{ justifyContent: 'center' }}>
        <Confetti active={submitted} config={confettiConfig} />
      </div>
      {winner && (
        <>

          <div className="is-flex" style={{ flexDirection: 'column', alignItems: 'center',marginBottom:'10em' }}>
            <h3 className="mb-3">Pemenangnya adalah <strong>{winner}</strong>
            </h3>

            <button onClick={handleClickBack} className="button is-secondary is-small">
              <span className="icon is-ismall">
                <i className="fas fa-chevron-left"></i>
              </span>
              <span>Back</span></button>
          </div>
        </>
      )}
      { !winner && nameList.map((item, index) => {
        return (
          <div className="columns mb-3" key={index + item}>

            <div className="column is-4">
              <div className="field" key={index}>
                <div className="control is-flex">
                  <span className="mr-3 is-flex" style={{ alignItems: 'center' }}>{index + 1}</span>
                  <input key={'input' + index + item} name={`listed-name-${index}`} className="input" type="text" defaultValue={item} onInput={(e) => handleChangeNameByIndex(index, e)} />

                </div>
              </div>
            </div>
            <div className="column is-3">
              <a className="button is-danger">
                <span className="icon is-small">
                  <i className="fas fa-trash"></i>
                </span>
                <span>Hapus</span>
              </a>
            </div>
          </div>
        )
      })}

      {
        !winner && (
          <>
            <form className="mb-5" onSubmit={handleSubmitNames}>
              <div className="field">
                <div className="control">

                  <div className="columns">

                    <div className="column is-4">
                      <input name="name" className="input" type="text" placeholder="Entry data..." onChange={handleChangeName} autoComplete="off" value={currentName} required />
                    </div>
                    <div className="column is-3">
                      <button className="button is-secondary" onClick={handleClickTambah}>
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
      <div className="buttons">
        <button className="button is-primary" onClick={handleSubmitRandom}>
          <span className="icon is-ismall">
            <i className="fas fa-sync"></i>
          </span>
          <span>Acakincuy</span></button>
        <button className="button is-secondary" onClick={handleClickReset}>Reset</button>
      </div>
    </>
  )
}

export default MainForm;