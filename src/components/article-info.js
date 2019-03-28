import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import format from 'date-fns/format';
import { rhythm, scale } from '../utils/typography';

export const Container = styled.div`
  ${scale(-0.25)}
  display: flex;
  align-items: center;
  margin: ${rhythm(1)} 0;
  line-height: 1.5rem;
`;

const Photo = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: ${rhythm(0.5)};
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -5px;
    top: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    border-radius: 100%;
    border: 1px solid #0f6d94;
  }
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  img {
    border-radius: 100%;
    overflow: hidden;
  }
`;

const Details = styled.div``;

const Author = styled.div`
  font-weight: 400;
`;

const Dateline = styled.div`
  opacity: 0.6;
`;

const Spacer = styled.span`
  margin: 0 ${rhythm(0.25)};
`;

const CommonDateline = ({ date, timeToRead }) => (
  <Dateline>
    <time dateTime={date}>{format(date, 'Do MMM YYYY')}</time>
    <Spacer>&middot;</Spacer>
    {timeToRead} min read
  </Dateline>
);

const ArticleInfo = ({ date, timeToRead, withAuthor }) =>
  withAuthor ? (
    <StaticQuery
      query={authorQuery}
      render={({ site: { siteMetadata: site }, profilePic }) => (
        <Container>
          <Photo>
            <StyledImage
              fixed={profilePic.childImageSharp.fixed}
              alt={`Photo of ${site.author.name}`}
            />
          </Photo>
          <Details>
            <Author>{site.author.name}</Author>
            <CommonDateline date={date} timeToRead={timeToRead} />
          </Details>
        </Container>
      )}
    />
  ) : (
    <Container>
      <Details>
        <CommonDateline date={date} timeToRead={timeToRead} />
      </Details>
    </Container>
  );

ArticleInfo.propTypes = {
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  withAuthor: PropTypes.bool.isRequired,
};

export default ArticleInfo;

const authorQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
    profilePic: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`;
