import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onClick}) => {
    return (
        <div className='header'>
           <h1>{title}</h1> 
           <Button text="Add" onClick={onClick}/>
        </div>
    )
}

Header.defaultProps = {
    title: 'Task Tracker Default',
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
