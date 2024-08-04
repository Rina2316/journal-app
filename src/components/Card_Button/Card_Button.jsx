import "./Card_Button.css"
function Card_Button({ children, className, ...props }) {
	const CL = 'card_button' + (className ? ' ' + className : '')

	return (

		<button {...props} className={CL}>{children}</button>

	)
}

export default Card_Button

