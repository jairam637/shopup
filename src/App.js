import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const handleSubmit = (e) => {};

  const handleReset = () => {};

  const handleSearch = (e) => {
    // log your value here
  };

  const debounce = (callback, delay) => {
    if (restore) {
      vm.search = "";
    }
    if (vm.promise) {
      $timeout.cancel(vm.promise);
    }
    vm.promise = $timeout(function () {
      vm.dtInstance.reloadData();
    }, 800);
  };
    // add your debounce logic here
  };
  const debouncedSearch = debounce(handleSearch, 1000);
  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" type="text" />
        </label>
        <label>
          Email:
          <input placeholder="email" type="text" />
        </label>


        <label>
          Password:
          <input placeholder="password" type="text" />
        </label>
        <hr />
        <button>Focus Name Input</button>
        <button>Focus Email Input</button>
        <button>Focus Password Input</button>
        <hr />
        <button>Submit</button>
        <button>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            onChange={debouncedSearch}
          />
        </label>
      </div>
    </React.Fragment>
  );
}

export default App;
