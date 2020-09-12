import React, { useState } from "react";

const MainForm = () => {
  const [currentName, setCurrentName] = useState("");
  const [nameList, setNameList] = useState([]);

  const handleTambah = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
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

  return (
    <>
      <ul>
        {nameList.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
      <form className="mb-5" onSubmit={handleTambah}>
        <div className="field">
          <div className="control">

            <div className="columns">
              <div className="column is-4">
                <input name="name" className="input" type="text" placeholder="Input" onChange={handleChangeName} autoComplete="off" value={currentName} required />
              </div>
              <div className="column is-3">
                <a className="button is-secondary">Tambah</a>

              </div>

            </div>
          </div>
        </div>
      </form>
      <div className="buttons">
        <button className="button is-primary">Acakincuy</button>
      </div>
    </>
  )
}

export default MainForm;