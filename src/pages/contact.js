import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import SEO from '../components/seo';
import Layout from '../components/Layout';
import '../styles/contact.css';

export default function Contact({data}) {
    const headerImage = getImage(data.headerPic);

    const all_articles = data.all_articles.edges;

    const topics = data.topics.edges;
    let tagCounts = {psychology: 0, philosophy: 0, society: 0, science: 0};
    all_articles.forEach(article => {
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
            <SEO title="Contact" />
            <main className="home">
                <GatsbyImage className='header-img' image={headerImage} alt="Header Image Waveform" />
                <section className="home-main">
                    <div className="contact">
                        <h2 className="contact-title">Contact Me</h2>
                        <p>Available for guest writing or guest speaking.</p>
                        <form name="contact" method="post" data-netlify="true" netlify-honeypot="bot-field" className="form-style-9">
                        <input type="hidden" name="form-name" value="contact" />
                            <ul>
                                <li>
                                    <input type="text" name="field1" className="field-style field-full align-none" placeholder="Name" style={{background: "transparent", color: "#ffffff"}} />
                                </li>
                                <li>
                                    <input type="email" name="field2" className="field-style field-full align-none" placeholder="Email" style={{background: "transparent", color: "#ffffff"}} />
                                </li>
                                <li>
                                <input type="text" name="field3" className="field-style field-full align-none" placeholder="Subject" style={{background: "transparent", color: "#ffffff"}} />
                                </li>
                                <li>
                                <textarea name="field5" className="field-style" placeholder="Message" style={{background: "transparent", color: "#ffffff"}}></textarea>
                                </li>
                                <li>
                                <button type="submit">Submit</button>
                                </li>
                            </ul>
                        </form>
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
    query contactQuery {
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
        
        all_articles: allMarkdownRemark(limit: 200 filter: {fileAbsolutePath: {regex: "/articles/"}} sort: { fields: [frontmatter___date], order: DESC}) {
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
    }
`
