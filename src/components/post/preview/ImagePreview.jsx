import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ImagePreview({ post, row, column }) {
  return (
    <Item key={post._id} row={row} column={column}>
      <Link to={`/posts/${post._id}`}>
        <Content background={post.images[0]}>
          <Name>{post.title}</Name>
        </Content>
      </Link>
    </Item>
  );
}

export default ImagePreview;

ImagePreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
  row: PropTypes.number,
  column: PropTypes.number,
};

ImagePreview.defaultProps = {
  row: -1,
  column: -1,
};

const Item = styled.li`
  position: relative;
  grid-row: ${(props) => 2 * props.row - 1} / span 3;
  grid-column: ${(props) =>
      props.row % 2 === 0 ? 2 * props.column : 2 * props.column - 1} / span 2;
  height: 0;
  padding-bottom: 110%; // Aspect ratio
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  clip-path: polygon(
    50% 0%,
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%
  ); // Hexagon shape
  background-image: ${(props) =>
    props.background &&
    `url(
    data:${props.background.contentType};base64,${Buffer.from(
      props.background.data
    ).toString("base64")}`});
  background-position: center;
  background-size: cover;
`;

const Name = styled.span`
  position: absolute;
  bottom: 25%;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  color: ${(props) => props.theme.text_link};
  background: ${(props) => props.theme.overlay_link};
  z-index: 5;
  text-transform: uppercase;
  max-width: 70%;
  text-align: center;
  font-family: "Source Sans Pro", "Barlow", sans-serif;
  font-size: 1rem;
`;
