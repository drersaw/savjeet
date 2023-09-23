import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Map from "./components/Map";
import AsideIndex from "./components/AsideIndex";
import {
  FranchiseCinemasList,
  NearbyCinemasList
} from "./components/CinemaList";
import Provider from "./components/Provider";
import loadable from "@loadable/component";

// Minimal react component for page not found aside.
const NotFound = () => (
  <Typography variant="h6">404, Page Not Found!</Typography>
);

// Use @loadable/component to dynamic import the CinemaMarkers & NearbyCinemaMarkes
const CinemaMarkers = loadable(() => import("./components/CinemaMarkers"));
const NearbyCinemaMarkers = loadable(() =>
  import("./components/NearbyCinemaMarkers")
);

const App = () => (
  <Provider>
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} sx={{ minHeight: 400 }}>
          <Map>
            <Switch>
              <Route exact path="/">
                <CinemaMarkers />
              </Route>
              <Route path="/nearby">
                <NearbyCinemaMarkers />
              </Route>
              <Route path="/:franchiseId/:countryCode">
                <CinemaMarkers />
              </Route>
            </Switch>
          </Map>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 1 }}>
            <Switch>
              <Route exact path="/" component={AsideIndex} />
              <Route path="/nearby" component={NearbyCinemasList} />
              <Route
                path="/:franchiseId/:countryCode"
                component={FranchiseCinemasList}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  </Provider>
);

export default App;
