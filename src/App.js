import React, { useState, useRef } from 'react';
import './App.css';


function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [search, setSearch] = useState("")
  const [data, setData] = useState({ data: [] })
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const promiseRef = useRef(null)
  const windowWidth = window.innerWidth

  const handleSubmit = () => {
    console.log("Name:", name)
    console.log("Password:", password)
    console.log("Email:", email)
  };

  const handleReset = () => {
    setName("")
    setPassword("")
    setEmail("")
  };

  const handleSearch = () => {
    const apiKey = process.env.giphyApiKey
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}`)
      .then(res => res.json())
      .then(
        (result) => {
          setData(result)
        },
        (error) => {
          setData({ data: [] })
          console.log(error)
        }
      )

  };

  const onChangeText = () => {
    if (promiseRef.current) {
      clearTimeout(promiseRef.current);
    }
    promiseRef.current = setTimeout(() => {
      handleSearch()
    }, 800);
  };

  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input ref={nameRef} placeholder="name" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
        </label>
        <label>
          Email:
          <input ref={emailRef} placeholder="email" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </label>

        <label>
          Password:
          <input ref={passwordRef} placeholder="password" type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </label>
        <hr />

        <button onClick={() => nameRef?.current?.focus()}>Focus Name Input</button>

        <button onClick={() => emailRef?.current?.focus()}>Focus Email Input</button>

        <button onClick={() => passwordRef?.current?.focus()}>Focus Password Input</button>
        <hr />

        <button onClick={() => {
          handleSubmit()
        }}>Submit</button>
        <button onClick={() => {
          handleReset()
        }}>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value)
              onChangeText(e.target.value)
            }}
            value={search}
          />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'wrap' }}>
        {data.data.map((search) => {
          return (<div key={search.id} style={{ width: windowWidth / 4, height: windowWidth / 4, backgroundColor: 'lightgray', margin: 10, overflow: 'scroll' }}>
            {Object.keys(search).map((searchKey) => {
              return (<div key={searchKey}>
                {typeof (search[searchKey]) === 'string' ? <div style={{ display: 'flex' }}>
                  <div style={{ fontWeight: '500' }}>{searchKey}: </div>
                  <div>{search[searchKey]}</div>
                </div> : null}
              </div>)
            })}
          </div>)
        })}
      </div>
    </React.Fragment>
  );
}

export default App;
