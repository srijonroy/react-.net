import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import LoginForm from "../../features/users/LoginForm";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import Loading from "./Loading";
import ModalContainer from "../common/Modals/ModalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <Loading content="Loading app.." />;

  return (
    <>
      <ToastContainer position="top-right" />
      <ModalContainer />
      <Route path="/" exact component={HomePage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/login" component={LoginForm}></Route>
              <Route
                exact
                path="/activities"
                component={ActivityDashboard}
              ></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              ></Route>
              <Route path="/errors"></Route>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
