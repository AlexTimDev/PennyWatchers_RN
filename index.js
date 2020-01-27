import {AppRegistry} from "react-native";
import App from "./src/App";
import {name as appName} from "./app.json";
import { Sentry } from "react-native-sentry";

Sentry.config("https://3470e5f6def747d4a10efd5073d03fe4@sentry.io/1457097").install();

AppRegistry.registerComponent(appName, () => App);
