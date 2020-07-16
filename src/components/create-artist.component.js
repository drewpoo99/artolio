import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateArtist extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.addInterest = this.addInterest.bind(this);
    this.removeInterest = this.removeInterest.bind(this);
    this.onChangeInspirations = this.onChangeInspirations.bind(this);
    this.onChangeProcesses = this.onChangeProcesses.bind(this);
    this.onChangeLinks = this.onChangeLinks.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        notes: '',
        interests: [],
        inspirations: [],
        processes: [],
        links: []
    }
  }

//   componentDidMount() {
//     axios.get('http://localhost:5000/users/')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             users: response.data.map(user => user.username),
//             username: response.data[0].username
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//   }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    })
  }

  addInterest(e){
	var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("interest");
    var li = document.createElement("li");
    li.setAttribute('id', interest.value);
    li.appendChild(document.createTextNode(interest.value));
    ul.appendChild(li);
    this.setState(state => {
       const interests = state.interests.concat(interest.value);
       return interests;
    })
  }

  removeInterest(e){

  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
            <label>Description: </label>
            <ul id="dynamic-list"></ul>
            <input  type="text"
                required
                className="form-control"
                id="interest"/>
            <button onclick="addInterest()">add item</button>
            <button onclick="removeInterest()">remove item</button>
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}