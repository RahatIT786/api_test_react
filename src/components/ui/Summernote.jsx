import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Summernote = ({ placeholder, onContentChange }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(() => ({
		readonly: false, // all options from https://xdsoft.net/jodit/docs/
		placeholder: placeholder || 'Start typing...'
	}), [placeholder]);

	const handleBlur = (newContent) => {
		setContent(newContent);
		if (onContentChange) {
			onContentChange(newContent);
		}
	};

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1}
			onBlur={handleBlur}
			onChange={() => {}}
		/>
	);
};

export default Summernote;
