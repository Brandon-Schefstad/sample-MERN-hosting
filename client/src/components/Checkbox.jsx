const Checkbox = ({ checked, handleChange }) => {
	return (
		<input
			onChange={(e) => handleChange(e, 'seen')}
			type="checkbox"
			checked={checked}
		/>
	)
}
export default Checkbox
