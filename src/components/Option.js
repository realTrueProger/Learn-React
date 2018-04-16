import React from 'react';

const Option = (props) => (
    <li className="option">
        <p className="option__text">{props.index}. {props.text}</p>
        <button
            className="button button--link"
            onClick={(e) => {
            props.handleDeleteOption(props.text);
        }
        }>remove
        </button>
    </li>
);

export default Option;