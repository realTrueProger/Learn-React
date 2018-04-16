'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteState = _this.handleDeleteState.bind(_this);
        _this.handleRandom = _this.handleRandom.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.handleAdd = _this.handleAdd.bind(_this);
        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'handleDeleteState',
        value: function handleDeleteState() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(option) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (opt) {
                        return opt !== option;
                    })
                };
            });
        }
    }, {
        key: 'handleRandom',
        value: function handleRandom() {
            var random = Math.floor(Math.random() * this.state.options.length);
            console.log(this.state.options[random]);
        }
    }, {
        key: 'handleAdd',
        value: function handleAdd(option) {
            if (!option) {
                return 'no option';
            }

            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // nothing here
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var subTitle = 'Indesicion App controls you!';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, {
                    subTitle: subTitle
                }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handleRandom: this.handleRandom
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteState: this.handleDeleteState,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAdd: this.handleAdd
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subTitle && React.createElement(
            'h2',
            null,
            props.subTitle
        )
    );
};

Header.defaultProps = {
    title: 'Indesicion App by TrueProger'
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handleRandom,
                disabled: !props.hasOptions
            },
            'What to do?'
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            'Options count: ',
            props.options.length
        ),
        React.createElement(
            'button',
            { onClick: props.handleDeleteState },
            'Remove All'
        ),
        React.createElement(
            'ol',
            null,
            props.options.map(function (option) {
                return React.createElement(Option, {
                    key: option,
                    text: option,
                    handleDeleteOption: props.handleDeleteOption
                });
            })
        )
    );
};

var Option = function Option(props) {
    return React.createElement(
        'li',
        null,
        props.text,
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.handleDeleteOption(props.text);
                } },
            'remove'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            e.target.elements.option.value = '';
            var error = this.props.handleAdd(option);
            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    'There is an error: ',
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
