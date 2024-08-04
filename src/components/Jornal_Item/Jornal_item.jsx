import "./Jornal_item.css"
function Journal_Item({title,post,date}) {
const FormatDate= new Intl.DateTimeFormat("ru-RU").format(date)

	return (

		<>
			<h2 className="Journal_item__header">{title}</h2>
			<h2 className="Journal_item__body">
				<div className="Journal_item__date">{FormatDate}</div>
				<div className="Journal_item__text">{post}</div>
			</h2>
		</>

	)
}

export default Journal_Item
