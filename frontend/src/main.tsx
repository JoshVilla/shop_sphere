import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import "dotenv/config";
import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider
        clientId={
          "973980080955-k30717qoffq6l7hnv173l1103jhqhhg5.apps.googleusercontent.com"
        }
      >
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
