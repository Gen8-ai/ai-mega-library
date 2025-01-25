import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './admin-dashboard';
import AppBuilder from './app-builder-interface';
import AuthScreen from './auth-screen';
import AIBuilder from './AutonomousAIappBuilder';
import ChatConfig from './chat-config-interface';
import CLI from './cli-ide';
import CodeEditor from './CodeEditor';
import ConfigPage from './config-page';
import DatabaseTable from './database-table-component';
import DataFormatter from './dataformater';
import DevEnvironment from './dev-environment';
import ComponentLibrary from './enhanced-component-library';
import FormComponent from './form-component';
import Preview from './fullscreen-preview';
import GameHUD from './game-hud';
import GameMenu from './game-menu';
import Navigation from './navigation';
import PromptInterface from './prompt-interface';
import ResourcesComponent from './resources-component';
import SetupView from './setup-view';
import StatePreview from './state-preview';
import StyledEditor from './styled-code-editor';
import UIComponents from './ui-components';
import UIPreview from './ui-preview';
import WebStore from './web-store';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Switch>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/builder" component={AppBuilder} />
          <Route path="/auth" component={AuthScreen} />
          <Route path="/ai-builder" component={AIBuilder} />
          <Route path="/chat-config" component={ChatConfig} />
          <Route path="/cli" component={CLI} />
          <Route path="/editor" component={CodeEditor} />
          <Route path="/config" component={ConfigPage} />
          <Route path="/database" component={DatabaseTable} />
          <Route path="/format" component={DataFormatter} />
          <Route path="/dev" component={DevEnvironment} />
          <Route path="/components" component={ComponentLibrary} />
          <Route path="/forms" component={FormComponent} />
          <Route path="/preview" component={Preview} />
          <Route path="/hud" component={GameHUD} />
          <Route path="/menu" component={GameMenu} />
          <Route path="/prompt" component={PromptInterface} />
          <Route path="/resources" component={ResourcesComponent} />
          <Route path="/setup" component={SetupView} />
          <Route path="/state" component={StatePreview} />
          <Route path="/code" component={StyledEditor} />
          <Route path="/ui" component={UIComponents} />
          <Route path="/ui-preview" component={UIPreview} />
          <Route path="/store" component={WebStore} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
│
