import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your options:</h3>
            <button
                className="button button--link"
                onClick={props.handleDeleteState}
            >
                Remove All
            </button>
        </div>

        <ol>
            {props.options.length === 0 && <p className="widget__message">Please add your options</p>}
            {props.options.map((option, index) =>
                <Option
                    key={option}
                    text={option}
                    index={index + 1}
                    handleDeleteOption={props.handleDeleteOption}
                />)}
        </ol>
    </div>
);

export default Options;