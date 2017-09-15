import React from "react";
import { Route, Redirect } from "react-router-dom";
import { generate } from "shortid";

import NavItem from "libs/components/SplitViewNavItem";
import CurrentEvent from "./CurrentEvent";
import DeleteEvent from "./DeleteEvent";

const routes = [
  {
    to: "/event/current",
    label: "Current Event",
    component: CurrentEvent,
  },
  {
    to: "/event/edit",
    label: "Edit Details",
  },
  {
    to: "/event/timeline",
    label: "Timeline",
  },
  {
    to: "/event/attendees",
    label: "Attendees",
  },
  {
    to: "/event/email",
    label: "Contact Attendees",
  },
  {
    to: "/event/delete",
    label: "Delete Event",
    component: DeleteEvent,
  },
];

const EventPageView = () =>
  <div className="splitview-main">
    <aside className="splitview-nav">
      {/* programmatically generate navbar from array */}
      {routes.map(route => <NavItem key={generate()} {...route} />)}
    </aside>

    {/* programmatically generate routes from array */}
    {routes.map(route => <Route key={generate()} path={route.to} {...route} />)}
    <Route
      exact
      path="/event"
      render={() => <Redirect to="/event/current" />}
    />
  </div>;

export default EventPageView;