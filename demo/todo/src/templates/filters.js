module.exports = function({ current, handleChange }) {
    return `
        <label>
        	<input type="radio" name="filters" value="SHOW_ALL" ${current == 'SHOW_ALL' ? 'checked' : ''} data-onchange="${handleChange}"/>
        	All
        </label>
        <label>
        	<input type="radio" name="filters" value="SHOW_ACTIVE" ${current == 'SHOW_ACTIVE' ? 'checked' : ''} data-onchange="${handleChange}"/>
        	Active
        </label>
        <label>
        	<input type="radio" name="filters" value="SHOW_COMPLETED" ${current == 'SHOW_COMPLETED' ? 'checked' : ''} data-onchange="${handleChange}"/>
        	Completed
        </label>
    `;
};
