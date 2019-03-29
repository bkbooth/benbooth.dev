import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import format from 'date-fns/format';
import { Author, Container, Dateline, Photo, Spacer, StyledImage } from './styled/article-info';

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
          <div>
            <Author>{site.author.name}</Author>
            <CommonDateline date={date} timeToRead={timeToRead} />
          </div>
        </Container>
      )}
    />
  ) : (
    <Container>
      <div>
        <CommonDateline date={date} timeToRead={timeToRead} />
      </div>
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
