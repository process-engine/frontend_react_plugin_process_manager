import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import cn from 'classnames';

import ProcessableCrudTable from '@quantusflow/process_engine_client_processable_react/dist/commonjs/Processable/CrudTable/CrudTable.js';
import { applyTheme } from '../../theme/themeProvider';

class TodoBasket extends Component {
  static propTypes = {
    catalog: PropTypes.object,
    executionContext: PropTypes.object,
    relay: PropTypes.object,
    route: PropTypes.object,
    loggedIn: PropTypes.bool,
    containerClassName: PropTypes.string,
    onRowDoubleClick: PropTypes.func
  };

  static styles = (() => {
    if (global.__SERVER__) {
      return null;
    }
    return require('./TodoBasket.scss');
  })();

  static contextTypes = {
    router: PropTypes.object,
    viewer: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  getBaseFilter() {
    return {
      operator: 'and',
      queries: [
        {
          attribute: 'id',
          operator: '!=',
          value: null
        },
        {
          attribute: 'state',
          operator: '=',
          value: 'wait'
        }
      ]
    };
  };

  handleRowDoubleClick(row) {
    if (this.props.onRowDoubleClick) {
      this.props.onRowDoubleClick(row);
    }
  }

  columnSchema = [
    { name: 'ID', thcProps: { hidden: true, dataField: 'id', isKey: true }, searchable: true },
    { name: 'Name', thcProps: { dataField: 'name', dataSort: true }, searchable: true }
  ];

  itemBasedButtonSchema = [];

  listBasedButtonSchema = [];

  filterMenuSchema = [];

  baseFilterMenuSchema = [];

  render() {
    const { children } = this.props;

    const processableCrudTable = (
      <ProcessableCrudTable
        title='offene Aufgaben'

        executionContext={this.props.executionContext}
        processEngineClientApi={(this.props.route.injectables ? this.props.route.injectables.processEngineClientApi : null)}

        entityTypeName={"NodeInstance"}
        fetcher={(partialVariables, onReadyStateChange) => this.props.relay.forceFetch(partialVariables, onReadyStateChange)}
        baseFilter={this.getBaseFilter}
        entityCollection={this.props.catalog.todos}

        onRowDoubleClick={(row) => this.handleRowDoubleClick(row)}

        createButtonTheme={applyTheme('TableHeader')}

        processButtonTheme={applyTheme('ProcessManager')}
        processDialogTheme={applyTheme('ProcessManager')}
        processFormItemTheme={applyTheme('TodoBasketFormItem')}
        processConfirmTheme={applyTheme('TodoBasketConfirmItem')}
        processWidgetTheme={applyTheme('ProcessManager')}
        processTheme={applyTheme('TodoBasket')}

        columnSchema={this.columnSchema}
        itemBasedButtonSchema={this.itemBasedButtonSchema}
        listBasedButtonSchema={this.listBasedButtonSchema}
        filterMenuSchema={this.filterMenuSchema}
        baseFilterMenuSchema={this.baseFilterMenuSchema}

        listBasedButtonTheme={applyTheme('TableHeader')}
        itemBasedButtonTheme={applyTheme('TableHeader')}
        filterMenuTheme={applyTheme('TableHeader')}
        baseFilterMenuTheme={applyTheme('TableHeader')}

        defaultSortName="name"
        defaultSortOrder="asc"

        searchFieldTheme={applyTheme('TableHeader')}

        theme={applyTheme('ProcessableCrudTable')}

        tableTheme={applyTheme('Table')}
        tableOverlayTheme={applyTheme('TableOverlay')}
        tableSelectorTheme={applyTheme('TableSelector')}

        tableStyles={{
          headerContainerClassName: TodoBasket.styles.headerContainer,
          itemBasedElementsClassName: TodoBasket.styles.itemBasedElements,
          filterMenuElementsClassName: TodoBasket.styles.filterMenuElements,
          tableWithFrameClassName: TodoBasket.styles.gridListBox,
          tableWithoutFrameClassName: TodoBasket.styles.gridListBoxNoFrame,
          createButtonClassName: TodoBasket.styles.createButton,
          contentOverlayClassName: TodoBasket.styles.contentOverlay,
          tableBarClassName: TodoBasket.styles.tableBar,
          itemHeaderClassName: TodoBasket.styles.itemHeader,
          searchFieldClassName: TodoBasket.styles.searchField,
          itemBasedMoreButtonClassName: TodoBasket.styles.itemBasedMoreButton,
          itemBasedButtonClassName: TodoBasket.styles.itemBasedButton,
          tableRowClassName: TodoBasket.styles.tableRow,
          tableHeaderRowClassName: TodoBasket.styles.tableHeaderRow,
          tableColumnSelectorClassName: TodoBasket.styles.tableColumnSelector,
          tableHeaderColumnSelectorClassName: TodoBasket.styles.tableHeaderColumnSelector
        }}
        rbtProps={{
          selectRow: null
        }}
      />
    );

    return (
      <div className={cn(this.props.containerClassName, TodoBasket.styles.todoBasketContainer)}>
        {processableCrudTable}
        {children}
      </div>
    );
  }
}

const RelayedTodoBasket = Relay.createContainer(TodoBasket, {
  initialVariables: {
    mode: 'initial',
    query: JSON.stringify({
      operator: 'and',
      queries: [
        {
          attribute: 'id',
          operator: '=',
          value: null
        },
        {
          attribute: 'state',
          operator: '=',
          value: 'wait'
        }
      ]
    }),
    orderBy: JSON.stringify({ attributes: [ { attribute: 'name', order: 'asc' } ] }),
    first: 1,
    offset: 0
  },

  fragments: {
    catalog: (variables) => Relay.QL`
      fragment on Catalog {
        todos: UserTaskConnection(query: $query, orderBy: $orderBy, first: $first, offset: $offset) {
          edges {
            node {
              id,
              name,
              nodeDef {
                id,
                key,
                name,
                processDef {
                  id,
                  key
                }
              }
            },
            cursor
          },
          pageInfo {
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
          }
        }
      }
    `
  }
});

export default RelayedTodoBasket;
