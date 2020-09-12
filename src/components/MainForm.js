import React, { useState, useEffect } from "react";

const MainForm = () => {
  const [currentName, setCurrentName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [tempNameList, setTempNameList] = useState([]);
  const [winner, setWinner] = useState();

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
    // console.log(tempNameList);
  }, [tempNameList]);

  return (
    <>
      {winner && (
        <div className="mb-3">
          <h3 >The winner is <strong>{winner}</strong></h3>
          <button onClick={handleClickBack} className="button is-secondary is-small">Back</button>
        </div>
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
              <a className="button is-danger">Hapus</a>
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
                      <input name="name" className="input" type="text" placeholder="Input" onChange={handleChangeName} autoComplete="off" value={currentName} required />
                    </div>
                    <div className="column is-3">
                      <button className="button is-secondary" onClick={handleClickTambah}>Tambah</button>

                    </div>

                  </div>
                </div>
              </div>
            </form>

          </>
        )
      }
      <div className="buttons">
        <button className="button is-primary" onClick={handleSubmitRandom}>Acakincuy</button>
        <button className="button is-secondary" onClick={handleClickReset}>Reset</button>
      </div>
    </>
  )
}

export default MainForm;