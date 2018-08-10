import PeopleFormPage from './People/Form';
import PeopleEditPage from './People/Edit';
import PeoplePage from './People/People';

import CourseFormPage from './Course/Form';
import CourseEditPage from './Course/Edit';
import CoursePage from './Course/Course';

import PaperFormPage from './Paper/Form';
import PaperEditPage from './Paper/Edit';
import PaperPage from './Paper/Paper';

import {
  Person,
} from "@material-ui/icons";


const paths = [
  {
    path: "/people/add",
    navbarName: "Add new person",
    component: PeopleFormPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/people/edit",
    navbarName: "Edit person",
    component: PeopleEditPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/people",
    icon: Person,
    sidebarName: "People",
    navbarName: "People",
    component: PeoplePage,
    exact: true,
    onSide: true,
  },
  {
    path: "/course/add",
    navbarName: "Add new Course",
    component: CourseFormPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/course/edit",
    navbarName: "Edit course",
    component: CourseEditPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/course",
    icon: Person,
    sidebarName: "Course",
    navbarName: "Course",
    component: CoursePage,
    exact: true,
    onSide: true,
  },
  {
    path: "/paper/add",
    navbarName: "Add new Paper",
    component: PaperFormPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/paper/edit",
    navbarName: "Edit paper",
    component: PaperEditPage,
    exact: false,
    onSide: false,
  },
  {
    path: "/paper",
    icon: Person,
    sidebarName: "Paper",
    navbarName: "Paper",
    component: PaperPage,
    exact: true,
    onSide: true,
  },
  { redirect: true, path: "/", to: "/people", navbarName: "Redirect" }
];

export default paths;
