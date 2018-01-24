import React from "react";
import * as Icon from "react-feather";
import { NavItem } from "libs/components/Navigation";

export default [
  <NavItem to="/" match="^/$" label="Home" icon={<Icon.Home />} />,
  <NavItem to="/users" label="Users" icon={<Icon.Users />} />,
  <NavItem
    to="/event"
    match="/event/*"
    label="Event"
    icon={<Icon.Calendar />}
  />,
  <NavItem to="/courses" label="Courses" icon={<Icon.Package />} />,
  <NavItem to="/profile" label="Profile" icon={<Icon.User />} />,
];
