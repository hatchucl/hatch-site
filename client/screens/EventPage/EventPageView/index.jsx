/* eslint react/no-array-index-key: 0 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { generate } from "shortid";
import { FadeInOut, Stagger } from "react-animation-components";

import NavItem from "libs/components/SplitViewNavItem";
import CurrentEvent from "./CurrentEvent";
import EditEvent from "./EditEvent";
import Timeline from "./Timeline";
import Attendees from "./Attendees";
import ContactAttendees from "./ContactAttendees";
import DeleteEvent from "./DeleteEvent";

const routes = [
  {
    to: "/event",
    match: "/event/?$",
    label: "Your Event",
    exact: true,
    component: CurrentEvent,
  },
  {
    to: "/event/edit",
    label: "Edit Details",
    component: EditEvent,
  },
  {
    to: "/event/timeline",
    label: "Timeline",
    component: Timeline,
  },
  {
    to: "/event/attendees",
    label: "Attendees",
    component: Attendees,
  },
  {
    to: "/event/email",
    label: "Contact Attendees",
    component: ContactAttendees,
  },
  {
    to: "/event/delete",
    label: "Delete Event",
    component: DeleteEvent,
  },
];

const EventPageView = () => (
  <div className="splitview-main">
    <aside className="splitview-nav">
      {/* programmatically generate navbar from array */}
      <Stagger delay={50}>
        {routes.map((route, i) => (
          <FadeInOut key={i}>
            <NavItem key={generate()} {...route} />
          </FadeInOut>
        ))}
      </Stagger>
    </aside>

    {/* programmatically generate routes from array */}
    <Switch>
      {routes.map(route => (
        <Route key={generate()} path={route.to} {...route} />
      ))}
      <Route render={() => <Redirect to="/event" />} />
    </Switch>
  </div>
);

export default EventPageView;
