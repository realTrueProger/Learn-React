import React from 'react';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import AddOption from './AddOption';
import OptionModal from './optionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: this.props.options,
        selected: undefined
    };


    handleDeleteState = () => {
        this.setState(() => ({options: []}));
    };

    handleDeleteOption = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((opt) => opt !== option)
        }));
    };

    handleRandom = () => {
        const random = Math.floor(Math.random() * this.state.options.length);
        const selected = this.state.options[random];
        this.setState(() => ({selected}));
    };

    handleAdd = (option) => {
        if (!option) {
            return 'no option';
        }

        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    };

    closeModal = () => {
        this.setState(() => ({selected: undefined}));
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            // nothing here
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        const subTitle = 'Let Indecision App control you life';

        return (
            <div>
                <Header
                    subTitle={subTitle}
                />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handleRandom={this.handleRandom}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteState={this.handleDeleteState}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAdd={this.handleAdd}
                        />
                    </div>

                </div>
                <OptionModal
                    selected={this.state.selected}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};