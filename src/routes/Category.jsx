import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import Posts from "../components/categories/Posts";
import Sort from "../components/shared/Sort";
import Layout from "../components/shared/Layout";

function Category({ match }) {
  const [layout, setLayout] = useState("preview");
  const [sort, setSort] = useState({
    sort_by: "date",
    order: "desc",
  });
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories/${match.params.category}`
  );

  if (error) {
    return <div>Category not found.</div>;
  }

  if (data) {
    return (
      <Wrapper>
        <Container>
          <Header>
            <Heading>{data.name}</Heading>
            <p>{data.description}</p>
          </Header>
          <Settings>
            <Sort send={(update) => setSort(update)} />
            <Layout send={(update) => setLayout(update)} />
          </Settings>
          <Posts
            type="categories"
            category={data}
            page={match.params.page}
            sort={sort}
            layout={layout}
          />
        </Container>
      </Wrapper>
    );
  }

  return <></>;
}

export default Category;

Category.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
      page: PropTypes.string,
    }),
  }).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  text-align: center;
`;

const Heading = styled.h1`
  position: relative;
  font-weight: 300;
  align-self: stretch;
  margin-bottom: 3rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 3px;
    background: ${(props) => props.theme.gradient_primary};
    background: linear-gradient(
      to left,
      ${(props) =>
        `${props.theme.gradient_primary} 0%, ${props.theme.gradient_secondary} 100%`}
    );
  }
`;

const Settings = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  align-self: flex-end;
  margin: 2rem 0;
`;