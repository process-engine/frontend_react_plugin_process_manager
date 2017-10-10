import React, {PropTypes, Component} from 'react';
import Relay from 'react-relay';
import cn from 'classnames';

import {connect} from 'react-redux';

import {applyTheme} from '../../theme/themeProvider';
import reduxApi from '../../redux/rest_redux';
const bpmnActions = reduxApi.actions;

import RaisedButton from '@process-engine-js/frontend_mui/dist/commonjs/Buttons/RaisedButton/RaisedButton.js';
import ProcessableContainer from '@process-engine-js/process_engine_client_processable_react/dist/commonjs/Processable/ProcessableContainer.js';

import $ from 'jquery';

let BpmnModeler = null;
let BpmnViewer = null;
let propertiesPanelModule = null;
let propertiesProviderModule = null;
let camundaModdleDescriptor = null;

if (!global.__SERVER__) {
  BpmnModeler = require('bpmn-js/lib/Modeler');
  BpmnViewer = require('bpmn-js/lib/Viewer');
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
    params: PropTypes.object,
    containerClassName: PropTypes.string,
    onLoadNewTask: PropTypes.func,
    onProcessFinished: PropTypes.func,
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

  static getUserTask(props) {
    if (props && props.catalog && props.catalog.userTasks && props.catalog.userTasks.edges &&
      props.catalog.userTasks.edges.length === 1 && props.catalog.userTasks.edges[0] && props.catalog.userTasks.edges[0].node) {
      return props.catalog.userTasks.edges[0].node;
    }

    return null;
  }

  constructor(props) {
    super(props);

    const currentProcess = ProcessDefinition.getCurrentProcess(props);

    this.state = {
      currentProcess,
      currentUserTaskToExecute: ProcessDefinition.getUserTask(props),
      currentBpmnProcessKey: null,
      bpmnOnProcessEnded: null,
      bpmnProcessInstance: null,
      bpmnProcessableContainer: null,
      bpmnModeler: null,

      isDraftMode: currentProcess.draft,
      isLatest: currentProcess.latest,
    };
  };

  componentDidMount() {
    const canvas = $('#js-canvas');
    setTimeout(() => {
      if (this.state.isDraftMode) {
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
      } else {
        const bpmnViewer = new BpmnViewer({
          container: canvas
        });
        this.BpmnViewer = bpmnViewer;
        if (this.state.currentProcess && this.state.currentProcess.xml) {
          const xml = this.state.currentProcess.xml;
          this.openDiagram(xml);
        }
      }

      if (!this.state.isDraftMode && this.state.currentUserTaskToExecute && this.props.executionContext) {
        this.handleStartTask(this.state.currentProcess.key, this.state.currentUserTaskToExecute, this.props.executionContext, this.props.onProcessFinished);
      }
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isDraftMode && this.state.currentUserTaskToExecute && !this.props.executionContext && nextProps.executionContext) {
      // Load task, create ProcessInstance and render ProcessContainer with it
      this.handleStartTask(this.state.currentProcess.key, this.state.currentUserTaskToExecute, nextProps.executionContext, this.props.onProcessFinished);
    }
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
            bpmnProcessInstance: null,
          },
          () => {
            if (this.state.bpmnOnProcessEnded) {
              this.state.bpmnOnProcessEnded(this.state.currentUserTaskToExecute);
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
    } else if (this.BpmnViewer) {
      this.BpmnViewer.importXML(xml, function(err) {
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

  async handleStartTask(processKey, userTaskEntity, context, onProcessEnded, done) {
    if (this.props.route.injectables && this.props.route.injectables.processEngineClientApi) {
      const processEngineClientApi = this.props.route.injectables.processEngineClientApi;
      this.setState({
        currentBpmnProcessKey: processKey,
        bpmnOnProcessEnded: onProcessEnded
      }, async () => {
        const bpmnProcessInstance = await processEngineClientApi.continueProcess(
          processKey,
          this,
          userTaskEntity,
          context
        );
        if (done) {
          done();
        }
        this.setState({
          bpmnProcessInstance
        });
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

  handleEditDraft() {
    this.context.store.dispatch(bpmnActions.executeProcessDefMethod({
      id: this.state.currentProcess.id,
      method: 'getDraft'
    }, {
      body: null
    }, (getDraftErr, data) => {
      if (getDraftErr) throw getDraftErr;

      if (this.props.onLoadNewTask) {
        this.props.onLoadNewTask(data.id);
      }
    }));
  }

  handleCancelEditDraft() {
    this.context.store.dispatch(bpmnActions.executeProcessDefMethod({
      id: this.state.currentProcess.id,
      method: 'getLatest'
    }, {
      body: null
    }, (getDraftErr, data) => {
      if (getDraftErr) throw getDraftErr;

      if (this.props.onLoadNewTask) {
        this.props.onLoadNewTask(data.id);
      }
    }));
  }

  handlePublishDraft() {
    this.context.store.dispatch(bpmnActions.executeProcessDefMethod({
      id: this.state.currentProcess.id,
      method: 'publishDraft'
    }, {
      body: null
    }, (getDraftErr, data) => {
      if (getDraftErr) throw getDraftErr;

      this.props.relay.forceFetch({}, (e) => {
        if (e.mounted && e.done) {
          const currentProcess = ProcessDefinition.getCurrentProcess(this.props);
          this.setState({
            currentProcess,
            isDraftMode: currentProcess.draft,
            isLatest: currentProcess.latest,
          });
        }
      });
    }));
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

    let executionControlPanel = (
      <div>
        <RaisedButton
          theme={theme}
          muiProps={{
            label: 'Start',
            primary: true,
            disabled: (!this.state.isLatest && !this.state.currentUserTaskToExecute) || this.state.isDraftMode || (!this.state.currentProcess || this.state.bpmnProcessInstance),
            onClick: (e) => {
              this.handleStart(this.state.currentProcess.key, null, this.props.onProcessFinished);
            }
          }}
        />
        <RaisedButton
          theme={theme}
          muiProps={{
            label: 'Stop',
            primary: true,
            disabled: (!this.state.isLatest && !this.state.currentUserTaskToExecute) || this.state.isDraftMode || (!this.state.currentProcess || !this.state.bpmnProcessInstance),
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
            disabled: (!this.state.isLatest && !this.state.currentUserTaskToExecute) || this.state.isDraftMode || (!this.state.currentProcess || !this.state.bpmnProcessInstance),
            onClick: (e) => {
              this.handleRestart(this.state.currentProcess.key, null, this.props.onProcessFinished);
            }
          }}
        />
        <hr />
      </div>
    );

    let editControlPanel = null;
    if (!this.state.currentUserTaskToExecute) {
      editControlPanel = (
        <div>
          <RaisedButton
            theme={theme}
            muiProps={{
              label: (this.state.isDraftMode ? 'Abbrechen' : 'Bearbeiten'),
              primary: true,
              disabled: !this.state.isLatest && !this.state.isDraftMode,
              onClick: (e) => {
                if (!this.state.isDraftMode) {
                  this.handleEditDraft();
                } else {
                  this.handleCancelEditDraft();
                }
              }
            }}
          />
          <RaisedButton
            theme={theme}
            muiProps={{
              label: 'Veröffentlichen',
              primary: true,
              disabled: !this.state.isDraftMode,
              onClick: (e) => {
                this.handlePublishDraft();
              }
            }}
          />
          <hr />
        </div>
      );
    }

    const mode = (this.state.currentProcess.draft ? 'DRAFT' : (this.state.currentProcess.latest ? 'LATEST' : 'ARCHIVED'));

    return (
      <div  className={cn(this.props.containerClassName, styles.processDefinitionContainer)}>
        {editControlPanel}
        <h3>{this.state.currentProcess.name} ({mode})</h3>
        {executionControlPanel}
        {bpmnProcessContainer}
        {processModelContainer}

      </div>
    );
  };
}

const initialQuery = {
  attribute: 'id',
  operator: '=',
  value: '00000000-0000-0000-0000-000000000000'
};

const initialUserTaskQuery = {
  attribute: 'id',
  operator: '=',
  value: '00000000-0000-0000-0000-000000000000'
};

const RelayedProcessDefinition = Relay.createContainer(ProcessDefinition, {
  initialVariables: {
    id: '00000000-0000-0000-0000-000000000000',
    query: JSON.stringify(initialQuery),
    taskId: '00000000-0000-0000-0000-000000000000',
    userTaskQuery: JSON.stringify(initialUserTaskQuery)
  },

  prepareVariables(options) {
    const { id, taskId } = options;

    const queryObj = initialQuery;
    queryObj.value = id;

    const userTaskQueryObj = initialUserTaskQuery;
    userTaskQueryObj.value = taskId;

    return {
      query: JSON.stringify(queryObj),
      userTaskQuery: JSON.stringify(userTaskQueryObj),
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
              xml,
              draft,
              latest,
              version
            }
          }
        },
        userTasks: UserTaskConnection(query: $userTaskQuery, find: $userTaskQuery) {
          edges {
            node {
              id,
              name,
              processToken {
                id,
                data
              },
              nodeDef {
                id,
                name,
                key,
                extensions,
                processDef {
                  id,
                  key,
                  draft,
                  latest,
                  version
                }
              }
            }
          }
        }
      }
    `
  }
});

export default RelayedProcessDefinition;
