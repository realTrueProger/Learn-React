import React from 'react';

const Action = (props) => (
    <div>
        <button
            className="big-button"
            onClick={props.handleRandom}
            disabled={!props.hasOptions}
        >
            What to do?
        </button>
    </div>
);


export default Action;