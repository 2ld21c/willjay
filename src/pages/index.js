import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Seo from '../components/seo';
import Layout from '../components/Layout';
import '../styles/index.css';

export default function Home({data}) {

    const headerImage = getImage(data.headerPic);
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
            <Seo title="Home" />
            <main className="home">
                <div className="header-wrap">
                    <GatsbyImage className='header-img' image={headerImage} alt="Header Image Waveform" />
                </div>
                <section className="home-main">
                    <div className="latest-articles">
                        <h2 className="articles-heading">The Latest</h2>
                        {
                            articles.length && articles.map((article, i) => {
                                const thumb = getImage(article.node.frontmatter.thumb)
                                return (
                                    <div key={i} className="excerpt">
                                        <div className="excerpt-top">
                                            <GatsbyImage className="article-thumb" image={thumb} alt={`Thumbnail for ${article.node.frontmatter.title}`} />
                                            <ul className="excerpt-metadata">
                                                <li className="excerpt-metadata-heading"><Link to={article.node.fields.slug}><h3>{article.node.frontmatter.title}</h3></Link></li>
                                                <li className="excerpt-metadata-heading"><small>{article.node.frontmatter.date}</small></li>
                                            </ul>
                                        </div>
                                        <div className="excerpt-body">
                                            {article.node.excerpt}
                                        </div>
                                        <Link to={article.node.fields.slug}>
                                          <button className="home-btn">Read More</button>
                                        </Link>
                                    </div>
                                )
                            }) 
                        }
                        <Link to="/articles">
                            <button className="archives-btn">All Articles</button>
                        </Link>     
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
    query homeQuery {
        headerPic: file(relativePath: {eq: "waveform.jpg"}) {
            childImageSharp {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
            }
        }
        articles: allMarkdownRemark(limit: 5 filter: {fileAbsolutePath: {regex: "/articles/"}} sort: { fields: [frontmatter___date], order: DESC}) {
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