// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import 'react-toastify/dist/ReactToastify.css';
import "./components"

import initializeApplication from "./utils/app";
initializeApplication();
