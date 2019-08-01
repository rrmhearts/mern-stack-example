import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    interval: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    apiResponse: "failing",
  };

  callAPI() {
    fetch("http://localhost:3001/api/testAPI")
      .then(res => res.text())
      .then((res) => this.setState({apiResponse: res}));
  }
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.callAPI();
    this.getDataFromDb();
    this.setState({ interval: setInterval(this.getDataFromDb, 1000) });
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
    
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  addToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    idTodelete = parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id; // what is with this underscore??
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    idToUpdate = parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id; // what is with this underscore??
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  render() {
    const {data} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <ul>
              {data.length <= 0
                ? 'NO DB ENTRIES YET'
                : data.map((dat) => (
                    <span style={{ padding: '10px' }} key={data.message}>
                      {dat.message}
                      <span style={{ color: 'gray' }}> ({dat.id})</span>.
                    </span>
                  ))}
            </ul>
            <div style={{ padding: '10px' }}>
              <input
                type="text"
                onChange={(e) => this.setState({ message: e.target.value })}
                placeholder="Add Sentence"
                style={{ width: '200px' }}
              />
              <button style={{ padding: '5px', width: '70px', color: 'black', backgroundColor: '#61dafb', 
                               borderColor: '#61dafb', marginLeft: '5px'}} onClick={() => this.addToDB(this.state.message)}>
                ADD
              </button>
            </div>
            <div style={{ padding: '10px' }}>
              <input
                type="text"
                style={{ width: '200px' }}
                onChange={(e) => this.setState({ idToDelete: e.target.value })}
                placeholder="Delete by ID"
              />
              <button style={{ padding: '5px', width: '70px', color: 'black', backgroundColor: '#61dafb', 
                               borderColor: '#61dafb', marginLeft: '5px' }} onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                DELETE
              </button>
            </div>
            <div style={{ padding: '10px'}}>
              <input
                type="text"
                style={{ width: '200px',  marginLeft: '-74px'  }}
                onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                placeholder="Update by ID"
              /> <br/>
              <input
                type="text"
                style={{ width: '200px' }}
                onChange={(e) => this.setState({ updateToApply: e.target.value })}
                placeholder="Update Sentence"
              />
              <button style={{ padding: '5px', width: '70px', color: 'black', backgroundColor: '#61dafb', 
                               borderColor: '#61dafb', marginLeft: '5px' }} onClick={() =>
                  this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                }
              >
                UPDATE
              </button>
              <p>{this.state.apiResponse}</p>

            </div>
          </div>
        </header>
        
      </div>
    );
  }
}

export default App;
