import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import format from 'date-fns/format';
import { rhythm, scale } from '../utils/typography';

const Container = styled.div`
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
  border-radius: 100%;
  overflow: hidden;
`;

const Details = styled.div`
  margin-left: ${rhythm(0.5)};
`;

const Author = styled.div`
  font-weight: 400;
`;

const Dateline = styled.div`
  opacity: 0.6;
`;

const Spacer = styled.span`
  margin: 0 ${rhythm(0.25)};
`;

const ArticleInfo = ({ date, timeToRead }) => (
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
          <Dateline>
            <time dateTime={date} pubdate>
              {format(date, 'Do MMM YYYY')}
            </time>
            <Spacer>&middot;</Spacer>
            {timeToRead} min read
          </Dateline>
        </Details>
      </Container>
    )}
  />
);

ArticleInfo.propTypes = {
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
};

export default ArticleInfo;

const authorQuery = graphql`
  query AUTHOR_QUERY {
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
