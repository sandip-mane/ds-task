// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./components"
import 'react-toastify/dist/ReactToastify.css';

import initializeApplication from "./utils/app";
initializeApplication();
