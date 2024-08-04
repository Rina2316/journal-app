import Card_Button from "../Card_Button/Card_Button"
import "./Journal_add_button.css"
function Journal_add_button({clearForm}) {


	return (

		<Card_Button className ="journal_add" onClick={clearForm}>
			<img  src="./plus.svg" alt="plus" />
			Новое воспоминание
		</Card_Button>

	)
}

export default Journal_add_button