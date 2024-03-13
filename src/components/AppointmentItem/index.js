import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsStarred} = props
  const {id, title, date, isStarred} = eachAppointment

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const startBtnClicked = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-list">
      <div className="appointment-card">
        <div className="title-star-cont">
          <p className="title">{title}</p>
          <button
            className="star-button"
            onClick={startBtnClicked}
            type="button"
            data-testid="star"
          >
            <img className="star-icon" src={starImgUrl} alt="star" />
          </button>
        </div>
        <p className="date">{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
