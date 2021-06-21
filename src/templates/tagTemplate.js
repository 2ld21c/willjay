import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import SEO from '../components/seo';
import Layout from '../components/Layout';
import '../styles/tag.css';

export default function tagTemplate({pageContext, data}) {
    console.log(data)
    const articles = data.articles.edges;
    const headerImage = getImage(data.headerPic);
    const { tag } = pageContext;
    const { totalCount } = data.articles;
    const tagHeader = `${tag.charAt(0).toUpperCase()}${tag.slice(1)}: ${totalCount} post${totalCount === 1 ? "" : "s"}`.replace("-", " ");

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
            <SEO title={tag} />
            <main className="home">
                <GatsbyImage className='header-img' image={headerImage} alt="Header Image Waveform" />
                <section className="home-main">
                    <div className="tagged-articles">
                        <h1 className="tags-title">{tagHeader}</h1>
                        {
                            articles.length && articles.map((article, i) => {
                                const thumb = getImage(article.node.frontmatter.thumb)
                                return (
                                    <article key={i} className="tagged-article">
                                        <Link to={article.node.fields.slug}>
                                            <h2 className="article-title">{article.node.frontmatter.title}</h2>
                                        </Link>
                                        <small>{article.node.frontmatter.date}</small>
                                        <hr />
                                        <GatsbyImage className="tag-article-img" image={thumb} alt={`Thumbnail for ${article.node.frontmatter.title}`} />
                                        <p className="article-body">{article.node.excerpt} <Link to={article.node.fields.slug}> <span style={{color: "#099BC9"}}>Read More</span></Link></p>
                                        <div className="article-tags">
                                            {
                                                article.node.frontmatter.tags.map((tag, j) => {
                                                    return <Link key={j} to={`/tags/${tag.toLowerCase()}/`}><small>{tag}</small></Link>
                                                })
                                            } 
                                        </div>    
                                    </article>
                                )
                            })
                        }
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

export const query = graphql`
    query tagTemplateQuery($tag: String) {
        articles: allMarkdownRemark(limit: 200 filter: {frontmatter: {tags: {in: [$tag]}}, fileAbsolutePath: {regex: "/article/"}} sort: { fields: [frontmatter___date], order: DESC}) {
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
        headerPic: file(relativePath: {eq: "waveform.jpg"}) {
            childImageSharp {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                )
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


