'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _delete = require('material-ui/svg-icons/action/delete.js');

var _delete2 = _interopRequireDefault(_delete);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CrudTable = require('@process-engine-js/process_engine_client_processable_react/dist/commonjs/Processable/CrudTable/CrudTable.js');

var _CrudTable2 = _interopRequireDefault(_CrudTable);

var _themeProvider = require('../../theme/themeProvider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessDefinitions = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ProcessDefinitions, _Component);

  function ProcessDefinitions(props) {
    (0, _classCallCheck3.default)(this, ProcessDefinitions);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProcessDefinitions.__proto__ || (0, _getPrototypeOf2.default)(ProcessDefinitions)).call(this, props));

    _this.columnSchema = [{ name: 'ID', thcProps: { hidden: true, dataField: 'id', isKey: true }, searchable: true }, { name: 'Name', thcProps: { dataField: 'name', dataSort: true }, searchable: true }, { name: 'Key', thcProps: { dataField: 'key', dataSort: true }, searchable: true }];
    _this.itemBasedButtonSchema = [{
      key: 'delete',
      name: 'Prozess löschen',
      processableKey: 'DeleteProcessDef',
      icon: _react2.default.createElement(_delete2.default, null),
      themes: {
        buttonTheme: (0, _themeProvider.applyTheme)('DeleteProcessDef'),
        dialogTheme: (0, _themeProvider.applyTheme)('DeleteProcessDef'),
        formItemTheme: (0, _themeProvider.applyTheme)('FormItem'),
        confirmTheme: (0, _themeProvider.applyTheme)('ConfirmItem'),
        widgetTheme: (0, _themeProvider.applyTheme)('DeleteProcessDef'),
        theme: (0, _themeProvider.applyTheme)('ProcessDefinitions')
      }
    }];
    _this.listBasedButtonSchema = [];
    _this.filterMenuSchema = [];
    _this.baseFilterMenuSchema = [];
    return _this;
  }

  (0, _createClass3.default)(ProcessDefinitions, [{
    key: 'getBaseFilter',
    value: function getBaseFilter() {
      return {
        attribute: 'id',
        operator: '!=',
        value: null
      };
    }
  }, {
    key: 'handleRowDoubleClick',
    value: function handleRowDoubleClick(row) {
      if (this.props.onRowDoubleClick) {
        this.props.onRowDoubleClick(row);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var children = this.props.children;


      var processableCrudTable = _react2.default.createElement(_CrudTable2.default, {
        title: 'Prozesse',

        executionContext: this.props.executionContext,
        processEngineClientApi: this.props.route.injectables ? this.props.route.injectables.processEngineClientApi : null,

        entityTypeName: "ProcessDef",
        fetcher: function fetcher(partialVariables, onReadyStateChange) {
          return _this2.props.relay.forceFetch(partialVariables, onReadyStateChange);
        },
        baseFilter: this.getBaseFilter,
        entityCollection: this.props.catalog.processDefinitions,

        onRowDoubleClick: function onRowDoubleClick(row) {
          return _this2.handleRowDoubleClick(row);
        },

        createButtonTheme: (0, _themeProvider.applyTheme)('CreateProcessDefinition'),
        createDialogTheme: (0, _themeProvider.applyTheme)('CreateProcessDefinition'),
        createFormItemTheme: (0, _themeProvider.applyTheme)('ProcessDefinitionFormItem'),
        createConfirmTheme: (0, _themeProvider.applyTheme)('ProcessDefinitionConfirmItem'),
        createWidgetTheme: (0, _themeProvider.applyTheme)('CreateProcessDefinition'),
        createTheme: (0, _themeProvider.applyTheme)('ProcessDefinitions'),

        columnSchema: this.columnSchema,
        itemBasedButtonSchema: this.itemBasedButtonSchema,
        listBasedButtonSchema: this.listBasedButtonSchema,
        filterMenuSchema: this.filterMenuSchema,
        baseFilterMenuSchema: this.baseFilterMenuSchema,

        listBasedButtonTheme: (0, _themeProvider.applyTheme)('TableHeader'),
        itemBasedButtonTheme: (0, _themeProvider.applyTheme)('TableHeader'),
        filterMenuTheme: (0, _themeProvider.applyTheme)('TableHeader'),
        baseFilterMenuTheme: (0, _themeProvider.applyTheme)('TableHeader'),

        defaultSortName: 'name',
        defaultSortOrder: 'asc',

        searchFieldTheme: (0, _themeProvider.applyTheme)('TableHeader'),

        theme: (0, _themeProvider.applyTheme)(),
        tableTheme: (0, _themeProvider.applyTheme)('Table'),
        tableSelectorTheme: (0, _themeProvider.applyTheme)('TableSelector'),

        tableStyles: {
          tableWithFrameClassName: ProcessDefinitions.styles.gridListBox,
          tableWithoutFrameClassName: ProcessDefinitions.styles.gridListBoxNoFrame,
          createButtonClassName: ProcessDefinitions.styles.createButton,
          contentOverlayClassName: ProcessDefinitions.styles.contentOverlay,
          tableBarClassName: ProcessDefinitions.styles.tableBar,
          itemHeaderClassName: ProcessDefinitions.styles.itemHeader,
          searchFieldClassName: ProcessDefinitions.styles.searchField,
          itemBasedMoreButtonClassName: ProcessDefinitions.styles.itemBasedMoreButton,
          itemBasedButtonClassName: ProcessDefinitions.styles.itemBasedButton,
          tableRowClassName: ProcessDefinitions.styles.tableRow,
          tableHeaderRowClassName: ProcessDefinitions.styles.tableHeaderRow,
          tableColumnSelectorClassName: ProcessDefinitions.styles.tableColumnSelector,
          tableHeaderColumnSelectorClassName: ProcessDefinitions.styles.tableHeaderColumnSelector
        }
      });

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.props.containerClassName, ProcessDefinitions.styles.processDefinitionsContainer) },
        processableCrudTable,
        children
      );
    }
  }]);
  return ProcessDefinitions;
}(_react.Component), _class.propTypes = {
  catalog: _react.PropTypes.object,
  executionContext: _react.PropTypes.object,
  relay: _react.PropTypes.object,
  route: _react.PropTypes.object,
  loggedIn: _react.PropTypes.bool,
  containerClassName: _react.PropTypes.string,
  onRowDoubleClick: _react.PropTypes.func
}, _class.styles = function () {
  if (global.__SERVER__) {
    return null;
  }
  return require('./ProcessDefinitions.scss');
}(), _class.contextTypes = {
  router: _react.PropTypes.object,
  viewer: _react.PropTypes.object
}, _temp);


var RelayedProcessDefinitions = _reactRelay2.default.createContainer(ProcessDefinitions, {
  initialVariables: {
    mode: 'initial',
    query: (0, _stringify2.default)({
      operator: 'and',
      queries: [{
        attribute: 'id',
        operator: '=',
        value: null
      }]
    }),
    orderBy: (0, _stringify2.default)({ attributes: [{ attribute: 'name', order: 'asc' }] }),
    first: 1,
    offset: 0
  },

  fragments: {
    catalog: function catalog(variables) {
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
              name: 'orderBy',
              value: {
                kind: 'CallVariable',
                callVariableName: 'orderBy'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: 'Int'
              },
              name: 'first',
              value: {
                kind: 'CallVariable',
                callVariableName: 'first'
              }
            }, {
              kind: 'Call',
              metadata: {
                type: 'Int'
              },
              name: 'offset',
              value: {
                kind: 'CallVariable',
                callVariableName: 'offset'
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
                  fieldName: 'defId',
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
                fieldName: 'startCursor',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'endCursor',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'hasNextPage',
                kind: 'Field',
                metadata: {
                  isRequisite: true
                },
                type: 'Boolean'
              }, {
                fieldName: 'hasPreviousPage',
                kind: 'Field',
                metadata: {
                  isRequisite: true
                },
                type: 'Boolean'
              }],
              fieldName: 'pageInfo',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
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
          name: 'ProcessDefinitions_CatalogRelayQL',
          type: 'Catalog'
        };
      }();
    }
  }
});

exports.default = RelayedProcessDefinitions;
module.exports = exports['default'];
