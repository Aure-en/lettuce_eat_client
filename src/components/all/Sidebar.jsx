import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Search from "../shared/Search";
import Filters from "../shared/Filters";
import Sort from "../shared/Sort";

function Sidebar({ send }) {
  return (
    <Container>
      <Search />
      <Sort send={(sort) => send(sort)} />
      <Filters />
    </Container>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  send: PropTypes.func.isRequired,
};

const Container = styled.aside`
  & > * {
    margin: 0.5rem 0;
  }

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;
