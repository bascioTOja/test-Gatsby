const React = require("react");
const { PreviewStoreProvider } = require("gatsby-source-prismic");
const { configureStore } = require("@reduxjs/toolkit");
const LoadingScreen = require("./src/components/common/LoadingScreen").default;
const { Provider } = require("react-redux");
const ThemeProvider = require("./src/layouts/themeProvider").default
require("@fontsource/montserrat");
const rootReducer = require("./src/redux/slices").default;
const Modal = require("./src/components/Modal").default
require("./src/layouts/style.css");
require("./src/layouts/i18.tsx");

exports.wrapRootElement = ({ element }) => {
  const store = configureStore({ reducer: rootReducer });

  return (
    <Provider store={store}>
      <PreviewStoreProvider>
        <LoadingScreen />
        <Modal />
        <ThemeProvider>
        {element}
        </ThemeProvider>
      </PreviewStoreProvider>
    </Provider>
  );
};
