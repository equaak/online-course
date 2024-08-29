import './Notification.css';

const Notification = ({message, show, onClose }) => {
    if(!show) return null;

    return(
        <div className='overlay'>
            <div className='notification between-center'>
                <p className='notification-title'>{message}</p>
                <button className='notification-button' onClick={onClose}>Mark as Read</button>
            </div>
        </div>
    )
}

export default Notification;