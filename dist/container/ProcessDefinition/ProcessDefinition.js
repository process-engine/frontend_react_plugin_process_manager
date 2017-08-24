'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _themeProvider = require('../../theme/themeProvider');

var _rest_redux = require('../../redux/rest_redux');

var _rest_redux2 = _interopRequireDefault(_rest_redux);

var _RaisedButton = require('@process-engine-js/frontend_mui/dist/commonjs/Buttons/RaisedButton/RaisedButton.js');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _ProcessableContainer = require('@process-engine-js/process_engine_client_processable_react/dist/commonjs/Processable/ProcessableContainer.js');

var _ProcessableContainer2 = _interopRequireDefault(_ProcessableContainer);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bpmnActions = _rest_redux2.default.actions;

var BpmnModeler = null;
var propertiesPanelModule = null;
var propertiesProviderModule = null;
var camundaModdleDescriptor = null;

if (!global.__SERVER__) {
  BpmnModeler = require('bpmn-js/lib/Modeler');
  propertiesPanelModule = require('bpmn-js-properties-panel');
  propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda');
  camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');
}

var ProcessDefinition = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    executeProcessDefMethod: state.executeProcessDefMethod
  };
}, function (dispatch) {
  return {};
}), _dec(_class = (_temp = _class2 = function (_Component) {
  (0, _inherits3.default)(ProcessDefinition, _Component);
  (0, _createClass3.default)(ProcessDefinition, null, [{
    key: 'getCurrentProcess',
    value: function getCurrentProcess(props) {
      if (props && props.catalog && props.catalog.processDefinitions && props.catalog.processDefinitions.edges && props.catalog.processDefinitions.edges.length === 1 && props.catalog.processDefinitions.edges[0] && props.catalog.processDefinitions.edges[0].node) {
        return props.catalog.processDefinitions.edges[0].node;
      }

      return null;
    }
  }]);

  function ProcessDefinition(props) {
    (0, _classCallCheck3.default)(this, ProcessDefinition);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProcessDefinition.__proto__ || (0, _getPrototypeOf2.default)(ProcessDefinition)).call(this, props));

    _this.BpmnModeler = null;
    _this.EventBus = null;


    _this.state = {
      currentProcess: ProcessDefinition.getCurrentProcess(props),
      currentBpmnProcessKey: null,
      bpmnOnProcessEnded: null,
      bpmnProcessInstance: null,
      bpmnProcessableContainer: null,
      bpmnModeler: null
    };
    return _this;
  }

  (0, _createClass3.default)(ProcessDefinition, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var canvas = (0, _jquery2.default)('#js-canvas');

      setTimeout(function () {
        var bpmnModeler = new BpmnModeler({
          container: canvas,
          propertiesPanel: {
            parent: '#js-properties-panel'
          },
          additionalModules: [propertiesPanelModule, propertiesProviderModule],
          moddleExtensions: {
            camunda: camundaModdleDescriptor
          }
        });

        _this2.EventBus = bpmnModeler.get('eventBus');
        if (_this2.state.currentProcess && _this2.state.currentProcess.id) {
          (function (modeler) {
            _this2.EventBus.on('commandStack.changed', function (event) {
              modeler.moddle.toXML(modeler.definitions, null, function (err, result) {
                _this2.context.store.dispatch(bpmnActions.executeProcessDefMethod({
                  id: _this2.state.currentProcess.id,
                  method: 'updateBpmn'
                }, {
                  body: (0, _stringify2.default)({
                    xml: result
                  })
                }, function (updateBpmnErr) {
                  if (updateBpmnErr) throw updateBpmnErr;
                }));
              });
            });
          })(bpmnModeler);
          _this2.BpmnModeler = bpmnModeler;

          if (_this2.state.currentProcess && _this2.state.currentProcess.xml) {
            var xml = _this2.state.currentProcess.xml;
            _this2.openDiagram(xml);
          }
        }
      }, 0);
    }
  }, {
    key: 'renderProcessContainer',
    value: function renderProcessContainer(processInstance, uiName, uiConfig, uiData) {
      switch (processInstance.processKey) {
        case this.state.currentBpmnProcessKey:
          var bpmnProcessableContainer = _react2.default.createElement(_ProcessableContainer2.default, { modal: false, key: processInstance.nextTaskEntity.id, uiName: uiName, uiConfig: uiConfig, uiData: uiData,
            processInstance: processInstance, executionContext: this.props.executionContext });
          this.setState({
            bpmnProcessableContainer: bpmnProcessableContainer
          });
          break;
        default:
      }
    }
  }, {
    key: 'handleUserTask',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(processInstance, uiName, uiConfig, uiData) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.renderProcessContainer(processInstance, uiName, uiConfig, uiData);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleUserTask(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return handleUserTask;
    }()
  }, {
    key: 'handleManualTask',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(processInstance, uiName, uiConfig, uiData) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return');

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleManualTask(_x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
      }

      return handleManualTask;
    }()
  }, {
    key: 'handleEvent',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(processInstance, eventType, eventData) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('got event: ', eventData);
                // Todo: implement rerender

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleEvent(_x9, _x10, _x11) {
        return _ref3.apply(this, arguments);
      }

      return handleEvent;
    }()
  }, {
    key: 'handleEndEvent',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(processInstance, endEventData) {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = processInstance.processKey;
                _context4.next = _context4.t0 === this.state.currentBpmnProcessKey ? 3 : 5;
                break;

              case 3:
                this.setState({
                  bpmnProcessableContainer: null,
                  bpmnProcessInstance: null
                }, function () {
                  if (_this3.state.bpmnOnProcessEnded) {
                    _this3.state.bpmnOnProcessEnded();
                  }
                });
                return _context4.abrupt('break', 5);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleEndEvent(_x12, _x13) {
        return _ref4.apply(this, arguments);
      }

      return handleEndEvent;
    }()
  }, {
    key: 'openDiagram',
    value: function openDiagram(xml) {
      if (this.BpmnModeler) {
        this.BpmnModeler.importXML(xml, function (err) {
          if (err) {
            (0, _jquery2.default)('#js-drop-zone').removeClass('with-diagram').addClass('with-error');

            (0, _jquery2.default)('#js-drop-zone').find('.error pre').text(err.message);
          } else {
            (0, _jquery2.default)('#js-drop-zone').removeClass('with-error').addClass('with-diagram');
          }
        });
      }
    }
  }, {
    key: 'handleStart',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(processKey, startToken, onProcessEnded, done) {
        var processEngineClientApi, bpmnProcessInstance;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.props.route.injectables && this.props.route.injectables.processEngineClientApi)) {
                  _context5.next = 7;
                  break;
                }

                processEngineClientApi = this.props.route.injectables.processEngineClientApi;
                _context5.next = 4;
                return processEngineClientApi.startProcess(processKey, this, this.props.executionContext, startToken);

              case 4:
                bpmnProcessInstance = _context5.sent;

                if (done) {
                  done();
                }
                this.setState({
                  currentBpmnProcessKey: processKey,
                  bpmnOnProcessEnded: onProcessEnded,
                  bpmnProcessInstance: bpmnProcessInstance
                });

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleStart(_x14, _x15, _x16, _x17) {
        return _ref5.apply(this, arguments);
      }

      return handleStart;
    }()
  }, {
    key: 'handleStop',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(done) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.state.bpmnProcessInstance) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 3;
                return this.state.bpmnProcessInstance.stop();

              case 3:
                this.setState({
                  currentBpmnProcessKey: null,
                  bpmnProcessInstance: null,
                  bpmnProcessableContainer: null
                }, done);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function handleStop(_x18) {
        return _ref6.apply(this, arguments);
      }

      return handleStop;
    }()
  }, {
    key: 'handleRestart',
    value: function handleRestart(processKey, startToken, onProcessEnded, done) {
      var _this4 = this;

      this.handleStop(function () {
        _this4.handleStart(processKey, startToken, onProcessEnded, done);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var styles = require('./ProcessDefinition.scss');

      var theme = (0, _themeProvider.applyTheme)('ProcessDefinition');

      var bpmnProcessContainer = this.state.bpmnProcessableContainer;

      var diagramJsCss = require('diagram-js/assets/diagram-js.css');
      var bpmnCSS = require('./ProcessDefinition.less');

      var processModelContainer = _react2.default.createElement(
        'div',
        { className: styles.bpmnContainer },
        _react2.default.createElement(
          'div',
          { className: 'content', id: 'js-drop-zone' },
          _react2.default.createElement('div', { className: 'canvas', id: 'js-canvas' }),
          _react2.default.createElement('div', { id: 'js-properties-panel' })
        )
      );

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.props.containerClassName, styles.processDefinitionContainer) },
        _react2.default.createElement(
          'h3',
          null,
          this.state.currentProcess.name
        ),
        _react2.default.createElement(_RaisedButton2.default, {
          theme: theme,
          muiProps: {
            label: 'Start',
            primary: true,
            disabled: !this.state.currentProcess || this.state.bpmnProcessInstance
          },
          qflProps: {
            onClick: function onClick(e) {
              _this5.handleStart(_this5.state.currentProcess.key);
            }
          }
        }),
        _react2.default.createElement(_RaisedButton2.default, {
          theme: theme,
          muiProps: {
            label: 'Stop',
            primary: true,
            disabled: !this.state.currentProcess || !this.state.bpmnProcessInstance
          },
          qflProps: {
            onClick: function onClick(e) {
              _this5.handleStop();
            }
          }
        }),
        _react2.default.createElement(_RaisedButton2.default, {
          theme: theme,
          muiProps: {
            label: 'Restart',
            primary: false,
            secondary: true,
            disabled: !this.state.currentProcess || !this.state.bpmnProcessInstance
          },
          qflProps: {
            onClick: function onClick(e) {
              _this5.handleRestart(_this5.state.currentProcess.key);
            }
          }
        }),
        _react2.default.createElement('hr', null),
        bpmnProcessContainer,
        processModelContainer
      );
    }
  }]);
  return ProcessDefinition;
}(_react.Component), _class2.propTypes = {
  children: _react.PropTypes.node,
  executionContext: _react.PropTypes.object,
  executeProcessDefMethod: _react2.default.PropTypes.object,
  catalog: _react.PropTypes.object,
  relay: _react.PropTypes.object,
  route: _react.PropTypes.object,
  containerClassName: _react.PropTypes.string
}, _class2.contextTypes = {
  store: _react.PropTypes.object.isRequired,
  viewer: _react.PropTypes.object.isRequired
}, _temp)) || _class);


var initialQuery = {
  operator: 'and',
  queries: [{
    attribute: 'id',
    operator: '=',
    value: '-1'
  }]
};

var RelayedProcessDefinition = _reactRelay2.default.createContainer(ProcessDefinition, {
  initialVariables: {
    id: '-1',
    query: (0, _stringify2.default)(initialQuery)
  },

  prepareVariables: function prepareVariables(options) {
    var id = options.id;


    var queryObj = initialQuery;
    queryObj.queries[0].value = id;

    return {
      query: (0, _stringify2.default)(queryObj)
    };
  },


  fragments: {
    catalog: function catalog() {
      return function () {
        return {
          children: [{
            alias: 'processDefinitions',
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'query',
              value: {
                kind: 'CallVariable',
                callVariableName: 'query'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'find',
              value: {
                kind: 'CallVariable',
                callVariableName: 'query'
              }
            }],
            children: [{
              children: [{
                children: [{
                  fieldName: 'id',
                  kind: 'Field',
                  metadata: {
                    isRequisite: true
                  },
                  type: 'ID'
                }, {
                  fieldName: 'name',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'key',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }, {
                  fieldName: 'xml',
                  kind: 'Field',
                  metadata: {},
                  type: 'String'
                }],
                fieldName: 'node',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  isRequisite: true
                },
                type: 'ProcessDef'
              }, {
                fieldName: 'cursor',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'String'
              }],
              fieldName: 'edges',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isPlural: true
              },
              type: 'ProcessDefEdge'
            }, {
              children: [{
                fieldName: 'hasNextPage',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'Boolean'
              }, {
                fieldName: 'hasPreviousPage',
                kind: 'Field',
                metadata: {
                  isGenerated: true,
                  isRequisite: true
                },
                type: 'Boolean'
              }],
              fieldName: 'pageInfo',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                isGenerated: true,
                isRequisite: true
              },
              type: 'PageInfo'
            }],
            fieldName: 'ProcessDefConnection',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isConnection: true,
              isFindable: true
            },
            type: 'ProcessDefConnection'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          id: _reactRelay2.default.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'ProcessDefinition_CatalogRelayQL',
          type: 'Catalog'
        };
      }();
    }
  }
});

exports.default = RelayedProcessDefinition;
module.exports = exports['default'];
