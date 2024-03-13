import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    starredBtnClicked: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: v4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onClickStarredBtn = () => {
    this.setState(prevState => ({
      starredBtnClicked: !prevState.starredBtnClicked,
    }))
  }

  render() {
    const {appointmentsList, starredBtnClicked, title, date} = this.state
    const starredBtnClassName = starredBtnClicked
      ? 'starred-btn active'
      : 'starred-btn'

    const getFilterStarList = appointmentsList.filter(
      each => each.isStarred === true,
    )

    const displayList = starredBtnClicked ? getFilterStarList : appointmentsList

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="form-image-container">
            <form className="form-details" onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input"
                onChange={this.onChangeTitle}
                id="title"
                type="text"
                placeholder="Title"
                value={title}
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                className="input"
                onChange={this.onChangeDate}
                id="date"
                type="date"
                value={date}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr" />
          <div className="heading-btn-container">
            <h1 className="heading">Appointments</h1>
            <button
              onClick={this.onClickStarredBtn}
              className={starredBtnClassName}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointments">
            {displayList.map(each => (
              <AppointmentItem
                eachAppointment={each}
                key={each.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
