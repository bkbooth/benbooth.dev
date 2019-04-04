# Using images from Unsplash

## Download the image and JSON

1. Find an image on https://unsplash.com/
2. Download the image to `src/assets/unsplash/[UNSPLASH_ID].jpg`
3. Get the JSON from https://api.unsplash.com/photos/[UNSPLASH_ID]?client_id=[UNSPLASH_API_ACCESS_KEY] and...
4. Save it as `src/assets/unsplash/[UNSPLASH_ID].json`

## Use it in Markdown frontmatter

Add the Unsplash photo ID to a property `unsplashHero` in your Markdown frontmatter.

```markdown
---
title: A blog post with an Unsplash hero image
date: 2019-03-29T12:45:00+11:00
unsplashHero: [UNSPLASH_ID]
---

... the rest of the Markdown content
```

Now in your GraphQL query there'll be an `unsplashHero` node nested under the `MarkdownRemark` node. It contains the full contents of the Unsplash JSON file, with the addition of an `image` property with `childImageSharp` nested underneath.

```graphql
query {
  markdownRemark(...) {
    unsplashHero {
      id
      description
      user {
        name
      }
      image {
        childImageSharp {
          ...
        }
      }
    }
  }
}
```

## Use it in other pages and components

You can query for `UnsplashJson` nodes by any of the properties in the Unsplash JSON files, in particular by `id`. In addition to the contents of the JSON files, each `UnsplashJson` node will have an `image` property with `childImageSharp` nested underneath.

```graphql
query {
  unsplashJson(id: { eq: "[UNSPLASH_ID]" }) {
    id
    description
    user {
      name
    }
    image {
      childImageSharp {
        ...
      }
    }
  }
}
```
