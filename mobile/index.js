/**
 * @format
 */

import 'react-native-reanimated';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Require cycle: node_modules/victory',
  'Toolbar has no editor. Please make sure the prop getEditor returns a ref to the editor component.',
  'Require cycle: index.js -> App.tsx -> node_modules/@react-native-firebase/messaging/lib/index.js -> node_modules/@react-native-firebase/messaging/modular/index.js -> index.js',
]);

AppRegistry.registerComponent(appName, () => App);
