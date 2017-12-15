import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import DeleteIcon from 'material-ui/svg-icons/action/delete.js';
import cn from 'classnames';

import { ProcessableCrudTable } from '@quantusflow/process_engine_client_processable_react/dist/commonjs/Processable/CrudTable/CrudTable.js';
import { applyTheme } from '../../theme/themeProvider';

class ProcessDefinitions extends Component {
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
    return require('./ProcessDefinitions.scss');
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
      attribute: 'id',
      operator: '!=',
      value: null
    };
  };

  handleRowDoubleClick(row) {
    if (this.props.onRowDoubleClick) {
      this.props.onRowDoubleClick(row);
    }
  }

  versionFormatter(cell, row) {
    let result = 'latest';
    if (!row.latest && !row.draft) {
      result  = 'archived';
    } else if (row.draft) {
      result = 'draft';
    }

    return result + ' (' + (row.version ? row.version : 'x.x.x') + ')';
  }

  columnSchema = () => [
    { name: 'ID', thcProps: { hidden: true, dataField: 'id', isKey: true }, searchable: true },
    { name: 'Name', thcProps: { dataField: 'name', dataSort: true }, searchable: true },
    { name: 'Key', thcProps: { width: 200, dataField: 'key', dataSort: true }, searchable: true },
    { name: 'Version', thcProps: { width: 150, dataField: 'version', dataSort: true, dataFormat: (cell, row) => this.versionFormatter(cell, row) } },
  ];

  itemBasedButtonSchema = () => [
    {
      key: 'delete',
      name: 'Prozess löschen',
      processableKey: 'DeleteProcessDef',
      icon: <DeleteIcon/>,
      themes: {
        buttonTheme: applyTheme('DeleteProcessDef'),
        dialogTheme: applyTheme('DeleteProcessDef'),
        formItemTheme: applyTheme('FormItem'),
        confirmTheme: applyTheme('ConfirmItem'),
        widgetTheme: applyTheme('DeleteProcessDef'),
        theme: applyTheme('ProcessDefinitions')
      }
    }
  ];

  listBasedButtonSchema = () => [];

  filterMenuSchema = () => [
    {
      key: 'tags', name: 'Tags', currentValue: 'all', theme: applyTheme('TableHeader'), items: (() => {
        const tags = [
          { value: 'all', label: 'Alle' },
          { value: 'latest', label: 'Latest' },
          { value: 'drafts', label: 'Drafts' },
          { value: 'archived', label: 'Archived' }
        ];
        return tags;
      })()
    }
  ];

  onFilterChange(key, newValue, choosenElement, element, fetcher) {
    if (fetcher) {
      let newQuery = {
        attribute: 'id',
        operator: '!=',
        value: null
      };

      if (newValue === 'latest') {
        newQuery = {
          operator: 'and',
          queries: [
            {
              attribute: 'id',
              operator: '!=',
              value: null
            },
            {
              attribute: 'latest',
              operator: '=',
              value: true
            }
          ]
        };
      } else if (newValue === 'drafts') {
        newQuery = {
          operator: 'and',
          queries: [
            {
              attribute: 'id',
              operator: '!=',
              value: null
            },
            {
              attribute: 'draft',
              operator: '=',
              value: true
            }
          ]
        };
      } else if (newValue === 'archived') {
        newQuery = {
          operator: 'and',
          queries: [
            {
              attribute: 'id',
              operator: '!=',
              value: null
            },
            {
              attribute: 'latest',
              operator: '!=',
              value: true
            },
            {
              attribute: 'draft',
              operator: '!=',
              value: true
            }
          ]
        };
      }

      fetcher({
        query: JSON.stringify(newQuery)
      });
    }
  }

  baseFilterMenuSchema = () => [];

  render() {
    const { children } = this.props;

    const processableCrudTable = (
      <ProcessableCrudTable
        ref={`processableCrudTable_ProcessDefinition`}
        tableKey={'ProcessDefinition'}

        title='Prozesse'

        executionContext={this.props.executionContext}
        processEngineClientApi={(this.props.route.injectables ? this.props.route.injectables.processEngineClientApi : null)}

        entityTypeName={"ProcessDef"}
        entityTypesName={"ProcessDefs"}

        fetcher={(partialVariables, onReadyStateChange) => this.props.relay.forceFetch(partialVariables, onReadyStateChange)}
        baseFilter={this.getBaseFilter}
        entityCollection={this.props.catalog.processDefinitions}

        onRowDoubleClick={(row) => this.handleRowDoubleClick(row)}

        createButtonTheme={applyTheme('TableHeader:create')}

        processButtonTheme={applyTheme('ProcessManager')}
        processDialogTheme={applyTheme('ProcessManager')}
        processFormItemTheme={applyTheme('ProcessDefinitionFormItem')}
        processConfirmTheme={applyTheme('ProcessDefinitionConfirmItem')}
        processWidgetTheme={applyTheme('ProcessManager')}
        processTheme={applyTheme('ProcessDefinitions')}

        columnSchema={this.columnSchema()}
        itemBasedButtonSchema={this.itemBasedButtonSchema()}
        listBasedButtonSchema={this.listBasedButtonSchema()}
        filterMenuSchema={this.filterMenuSchema()}
        baseFilterMenuSchema={this.baseFilterMenuSchema()}

        onFilterChange={(key, newValue, choosenElement, element, fetcher) => this.onFilterChange(key, newValue, choosenElement, element, fetcher)}

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
          headerContainerClassName: ProcessDefinitions.styles.headerContainer,
          itemBasedElementsClassName: ProcessDefinitions.styles.itemBasedElements,
          filterMenuElementsClassName: ProcessDefinitions.styles.filterMenuElements,
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
        }}
      />
    );

    return (
      <div className={cn(this.props.containerClassName, ProcessDefinitions.styles.processDefinitionsContainer)}>
        {processableCrudTable}
        {children}
      </div>
    );
  }
}

const RelayedProcessDefinitions = Relay.createContainer(ProcessDefinitions, {
  initialVariables: {
    mode: 'initial',
    query: JSON.stringify({
      operator: 'and',
      queries: [
        {
          attribute: 'id',
          operator: '=',
          value: null
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
        processDefinitions: ProcessDefConnection(query: $query, orderBy: $orderBy, first: $first, offset: $offset) {
          edges {
            node {
              id,
              name,
              key,
              latest,
              draft,
              version
              defId
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

export default RelayedProcessDefinitions;
