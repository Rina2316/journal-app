import "./Journal_list.css"
import Card_Button from '../Card_Button/Card_Button';
import Journal_Item from '../Jornal_Item/Jornal_item';
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function Journal_list({ items,setItem }) {
	const {userId}=useContext(UserContext)

	if (items.length === 0) {
		return <p>Записей пока нет</p>
	}
	const sortItems = (a, b) => {
		if (a.date > b.date) {
			return 1
		} else {
			return -1
		}
	}

	return <>{
		items.filter(el=>el.userId===userId)
		.sort(sortItems)
		.map((el, index) => (<Card_Button key={index} onClick={()=>{setItem(el)}}>
			<Journal_Item
				title={el.title}
				text={el.post}
				date={el.date}
			/>

		</Card_Button>))}
	</>

}

export default Journal_list