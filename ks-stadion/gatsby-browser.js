const React = require("react");
const LoadingScreen = require("./src/components/common/LoadingScreen").default;
require("@fontsource/montserrat");
require("@fontsource/material-icons");
require("dayjs/locale/pl");
const { PreviewStoreProvider } = require("gatsby-source-prismic");
const { configureStore } = require("@reduxjs/toolkit");
const { Provider } = require("react-redux");
const rootReducer = require("./src/redux/slices").default;
const dayjs = require("dayjs");
const ThemeProvider = require("./src/layouts/themeProvider").default
const Modal = require("./src/components/Modal").default

dayjs.locale("pl");

require("./src/layouts/style.css");
require("./src/layouts/i18.tsx");

exports.onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Hej! Właśnie wykryłem że strona została zaaktualizowana. ` +
      `Odświeżyć dla Ciebie stronę, by pokazać najnowszą zawartość??`
  );
  if (answer === true) {
    window.location.reload();
  }
};

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
