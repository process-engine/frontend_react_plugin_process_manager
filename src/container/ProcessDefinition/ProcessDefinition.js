import React, {PropTypes, Component} from 'react';
import Relay from 'react-relay';
import cn from 'classnames';

import {connect} from 'react-redux';

import {applyTheme} from '../../theme/themeProvider';
import reduxApi from '../../redux/rest_redux';
const bpmnActions = reduxApi.actions;

import RaisedButton from '@process-engine/frontend_mui/dist/commonjs/Buttons/RaisedButton/RaisedButton.js';
import ProcessableContainer from '@process-engine/process_engine_client_processable_react/dist/commonjs/Processable/ProcessableContainer.js';

import $ from 'jquery';

let BpmnModeler = null;
let propertiesPanelModule = null;
let propertiesProviderModule = null;
let camundaModdleDescriptor = null;

if (!global.__SERVER__) {
  BpmnModeler = require('bpmn-js/lib/Modeler');
  propertiesPanelModule = require('bpmn-js-properties-panel');
  propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda');
  camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda');
}

@connect(
  (state) => ({
    executeProcessDefMethod: state.executeProcessDefMethod
  }),
  (dispatch) => ({})
)
class ProcessDefinition extends Component {
  static propTypes = {
    children: PropTypes.node,
    executionContext: PropTypes.object,
    executeProcessDefMethod: React.PropTypes.object,
    catalog: PropTypes.object,
    relay: PropTypes.object,
    route: PropTypes.object,
    containerClassName: PropTypes.string
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired
  };

  static getCurrentProcess(props) {
    if (props && props.catalog && props.catalog.processDefinitions && props.catalog.processDefinitions.edges &&
      props.catalog.processDefinitions.edges.length === 1 && props.catalog.processDefinitions.edges[0] && props.catalog.processDefinitions.edges[0].node) {
      return props.catalog.processDefinitions.edges[0].node;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      currentProcess: ProcessDefinition.getCurrentProcess(props),
      currentBpmnProcessKey: null,
      bpmnOnProcessEnded: null,
      bpmnProcessInstance: null,
      bpmnProcessableContainer: null,
      bpmnModeler: null
    };
  };

  componentDidMount() {
    const canvas = $('#js-canvas');

    setTimeout(() => {
      const bpmnModeler = new BpmnModeler({
        container: canvas,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      });

      this.EventBus = bpmnModeler.get('eventBus');
      if (this.state.currentProcess && this.state.currentProcess.id) {
        ((modeler) => {
          this.EventBus.on('commandStack.changed', (event) => {
            modeler.moddle.toXML(modeler.definitions, null, (err, result) => {
              this.context.store.dispatch(bpmnActions.executeProcessDefMethod({
                id: this.state.currentProcess.id,
                method: 'updateBpmn'
              }, {
                body: JSON.stringify({
                  xml: result
                })
              }, (updateBpmnErr) => {
                if (updateBpmnErr) throw updateBpmnErr;
              }));
            });
          });
        })(bpmnModeler);
        this.BpmnModeler = bpmnModeler;

        if (this.state.currentProcess && this.state.currentProcess.xml) {
          const xml = this.state.currentProcess.xml;
          this.openDiagram(xml);
        }
      }
    }, 0);
  }

  renderProcessContainer(processInstance, uiName, uiConfig, uiData) {
    switch (processInstance.processKey) {
      case (this.state.currentBpmnProcessKey):
        const bpmnProcessableContainer = (
          <ProcessableContainer modal={false} key={processInstance.nextTaskEntity.id} uiName={uiName} uiConfig={uiConfig} uiData={uiData}
                                processInstance={processInstance} executionContext={this.props.executionContext}/>
        );
        this.setState({
          bpmnProcessableContainer
        });
        break;
      default:
    }
  };

  async handleUserTask(processInstance, uiName, uiConfig, uiData) {
    this.renderProcessContainer(processInstance, uiName, uiConfig, uiData);
  };

  async handleManualTask(processInstance, uiName, uiConfig, uiData) {
    return;
  };

  async handleEvent(processInstance, eventType, eventData) {
    console.log('got event: ', eventData);
    // Todo: implement rerender
  };

  async handleEndEvent(processInstance, endEventData) {
    switch (processInstance.processKey) {
      case (this.state.currentBpmnProcessKey):
        this.setState(
          {
            bpmnProcessableContainer: null,
            bpmnProcessInstance: null
          },
          () => {
            if (this.state.bpmnOnProcessEnded) {
              this.state.bpmnOnProcessEnded();
            }
          }
        );
        break;
      default:
    }
  };

  BpmnModeler = null;
  EventBus = null;

  openDiagram(xml) {
    if (this.BpmnModeler) {
      this.BpmnModeler.importXML(xml, function(err) {
        if (err) {
          $('#js-drop-zone')
            .removeClass('with-diagram')
            .addClass('with-error');

          $('#js-drop-zone').find('.error pre').text(err.message);
        } else {
          $('#js-drop-zone')
            .removeClass('with-error')
            .addClass('with-diagram');
        }
      });
    }
  };

  async handleStart(processKey, startToken, onProcessEnded, done) {
    if (this.props.route.injectables && this.props.route.injectables.processEngineClientApi) {
      const processEngineClientApi = this.props.route.injectables.processEngineClientApi;
      const bpmnProcessInstance = await processEngineClientApi.startProcess(
        processKey,
        this,
        this.props.executionContext,
        startToken
      );
      if (done) {
        done();
      }
      this.setState({
        currentBpmnProcessKey: processKey,
        bpmnOnProcessEnded: onProcessEnded,
        bpmnProcessInstance
      });
    }
  };

  async handleStop(done) {
    if (this.state.bpmnProcessInstance) {
      await this.state.bpmnProcessInstance.stop();
      this.setState({
        currentBpmnProcessKey: null,
        bpmnProcessInstance: null,
        bpmnProcessableContainer: null
      }, done);
    }
  };

  handleRestart(processKey, startToken, onProcessEnded, done) {
    this.handleStop(() => {
      this.handleStart(processKey, startToken, onProcessEnded, done);
    });
  }

  render() {
    const styles = require('./ProcessDefinition.scss');

    const theme = applyTheme('ProcessDefinition');

    let bpmnProcessContainer = this.state.bpmnProcessableContainer;

    const diagramJsCss = require('diagram-js/assets/diagram-js.css');
    const bpmnCSS = require('./ProcessDefinition.less');

    let processModelContainer = (
      <div className={styles.bpmnContainer}>
        <div className="content" id="js-drop-zone">
          <div className="canvas" id="js-canvas"/>
          <div id="js-properties-panel"/>
        </div>
      </div>
    );

    return (
      <div  className={cn(this.props.containerClassName, styles.processDefinitionContainer)}>
        <h3>{this.state.currentProcess.name}</h3>
        <RaisedButton
          theme={theme}
          muiProps={{
            label: 'Start',
            primary: true,
            disabled: (!this.state.currentProcess || this.state.bpmnProcessInstance)
          }}
          qflProps={{
            onClick: (e) => {
              this.handleStart(this.state.currentProcess.key);
            }
          }}
        />
        <RaisedButton
          theme={theme}
          muiProps={{
            label: 'Stop',
            primary: true,
            disabled: (!this.state.currentProcess || !this.state.bpmnProcessInstance)
          }}
          qflProps={{
            onClick: (e) => {
              this.handleStop();
            }
          }}
        />
        <RaisedButton
          theme={theme}
          muiProps={{
            label: 'Restart',
            primary: false,
            secondary: true,
            disabled: (!this.state.currentProcess || !this.state.bpmnProcessInstance)
          }}
          qflProps={{
            onClick: (e) => {
              this.handleRestart(this.state.currentProcess.key);
            }
          }}
        />
        <hr />
        {bpmnProcessContainer}
        {processModelContainer}
      </div>
    );
  };
}

const initialQuery = {
  operator: 'and',
  queries: [
    {
      attribute: 'id',
      operator: '=',
      value: '-1'
    }
  ]
};

const RelayedProcessDefinition = Relay.createContainer(ProcessDefinition, {
  initialVariables: {
    id: '-1',
    query: JSON.stringify(initialQuery)
  },

  prepareVariables(options) {
    const { id } = options;

    const queryObj = initialQuery;
    queryObj.queries[0].value = id;

    return {
      query: JSON.stringify(queryObj)
    };
  },

  fragments: {
    catalog: () => Relay.QL`
      fragment on Catalog {
        processDefinitions: ProcessDefConnection(query: $query, find: $query) {
          edges {
            node {
              id,
              name,
              key,
              xml
            }
          }
        }
      }
    `
  }
});

export default RelayedProcessDefinition;
