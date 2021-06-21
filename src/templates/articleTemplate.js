import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage} from 'gatsby-plugin-image';
import SEO from '../components/seo';
import Layout from '../components/Layout';
import '../styles/article.css';

export default function articleTemplate({data}) {

    const article = data.markdownRemark;
    const headerImage = getImage(data.headerPic);
    const image = getImage(article.frontmatter.image);
    const articles = data.articles.edges;
    const topics = data.topics.edges;
    let tagCounts = {psychology: 0, philosophy: 0, society: 0, science: 0};
    articles.forEach(article => {
        if (article.node.frontmatter.tags.includes("philosophy")) {
            tagCounts["philosophy"] = tagCounts["philosophy"] + 1
        }
        if (article.node.frontmatter.tags.includes("psychology")) {
            tagCounts["psychology"] = tagCounts["psychology"] + 1
        }
        if (article.node.frontmatter.tags.includes("society")) {
            tagCounts["society"] = tagCounts["society"] + 1
        }
        if (article.node.frontmatter.tags.includes("science")) {
            tagCounts["science"] = tagCounts["science"] + 1
        }
    })

    return (
        <Layout>
            <SEO title={article.frontmatter.title} />
            <main className="home">
                <GatsbyImage className='header-img' image={headerImage} alt="Header Image Waveform" />
                <section className="home-main">
                    <div className="article">
                        <main className="article-main">
                            <h1 className="article-title">{article.frontmatter.title}</h1>
                            <small>{article.frontmatter.date}</small>
                            <div className="tag-info">
                                <small>Filed under: </small>
                                <div className="article-tags">
                                    {
                                        article.frontmatter.tags.map((tag, j) => {
                                            return <Link key={j} to={`/tags/${tag.toLowerCase()}/`}><small>{tag}</small></Link>
                                        })
                                    } 
                                </div>
                            </div>
                            <hr />
                            <GatsbyImage 
                                className="article-main-image" image={image} 
                                alt={`Image for ${article.frontmatter.title}`} 
                            />
                            <div dangerouslySetInnerHTML={{__html: article.html}} />
                        </main>
                    </div>
                    <div className="topics">
                        {
                            topics.length && topics.map((topic, j) => {
                                const image = getImage(topic.node.frontmatter.image);
                                const count = tagCounts[topic.node.frontmatter.tags[0]];
                                return (
                                    <Link to={`/tags/${topic.node.frontmatter.tags[0].toLowerCase()}/`}>
                                        <div key={j} className="topic">
                                            <h3 id="topic-title">{topic.node.frontmatter.title}</h3>
                                            <GatsbyImage className="topic-img" image={image} alt={`Thumbnail for ${topic.node.frontmatter.title}`} />
                                            <h4 id="topic-count">{count} article{count === 1 ? "": "s"}</h4>
                                        </div>
                                    </Link>
                                    
                                )
                            })
                        }
                    </div>
                </section>
            </main>
           
        </Layout> 
    )
}


export const pageQuery = graphql`
    query articleQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html 
            frontmatter {
                title 
                date(formatString: "MMMM DD, YYYY")
                tags 
                image {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
            }
        }
        headerPic: file(relativePath: {eq: "waveform.jpg"}) {
            childImageSharp {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
            }
        }
        articles: allMarkdownRemark(limit: 200 filter: {fileAbsolutePath: {regex: "/articles/"}} sort: { fields: [frontmatter___date], order: DESC}) {
            totalCount
            edges {
                node {
                    html 
                    excerpt(pruneLength: 300)
                    frontmatter {
                        title 
                        date(formatString: "MMMM DD, YYYY")
                        tags 
                        pagetype 
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                        thumb {
                            childImageSharp {
                                gatsbyImageData(
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
            group(field: frontmatter___tags) {
                fieldValue
            }
        }
        topics: allMarkdownRemark(limit: 10 filter: {fileAbsolutePath: {regex: "/topics/"}} sort: { fields: [frontmatter___id], order: ASC}) {
            totalCount
            edges {
                node {
                    html 
                    excerpt(pruneLength: 300)
                    frontmatter {
                        title 
                        tags 
                        pagetype 
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
            group(field: frontmatter___tags) {
                fieldValue
            }
        }
    }
`

 
