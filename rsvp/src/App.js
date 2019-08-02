import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuests: "",
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Nick',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Matt K',
        isConfirmed: false,
        isEditing: true
      }
    ]
  }

  removeGuestAt = index => {
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    });
  }

  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;
      })
    });
  }

  toggleConfirmationAt = index => this.toggleGuestPropertyAt("isConfirmed", index);

  toggleEditingAt = index => this.toggleGuestPropertyAt("isEditing", index);

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () => 
    this.state.guests.filter((guest) => guest.isConfirmed == true).length

  getUnconfirmedGuests = () => this.getTotalInvited - this.getAttendingGuests

  setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name
          }
        }
        return guest;
      })
    });
  }

  toggleFilter = () => 
    this.setState({ isFiltered: !this.state.isFiltered });
 
  handleNameInput = e => {
    this.setState( {pendingGuests: e.target.value} )
  }

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuests,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuests: ""
    });
  }
    

  render() {
    const totalInvited = this.getTotalInvited();
    const totalUnconfirmed = this.getUnconfirmedGuests();
    const totalAttending = this.getAttendingGuests();
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
            <input type="text" value={this.state.pendingGuests} onChange={this.handleNameInput} placeholder="Invite Someone" />
              <button type="submit" name="submit" 
              value="submit">Submit</button>
        </form>
      </header>
          <div className="main">
            <div>
              <h2>Invitees</h2>
              <label>
                <input type="checkbox" 
                  onChange={this.toggleFilter}
                  checked={this.state.isFiltered}
                /> Hide those who haven't responded
          </label>
        </div>
              <Counter totalInvited={totalInvited}
                numberUnconfirmed={totalInvited - totalAttending}
                numberAttending={totalAttending}
              />
              
              <GuestList 
              setNameAt={this.setNameAt}
              toggleConfirmationAt={this.toggleConfirmationAt} 
              toggleEditingAt={this.toggleEditingAt}
              guests={this.state.guests} 
              isFiltered={this.state.isFiltered}
              onRemove={this.removeGuestAt}
              pendingGuests={this.state.pendingGuests}
              />
      </div>
    </div>
                );
              }
            }
            
            export default App;
