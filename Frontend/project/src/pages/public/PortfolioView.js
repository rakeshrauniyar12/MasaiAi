import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPortfolioByUsername,
  getPublicCaseStudies,
  trackView,
} from "../../services/api";
import "../../styles/PortView.css";
const PortfolioView = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [portfolioRes, caseStudiesRes] = await Promise.all([
          getPortfolioByUsername(username),
          getPublicCaseStudies(username),
        ]);

        setPortfolio(portfolioRes.data);
        setCaseStudies(caseStudiesRes.data);

        await trackView({
          portfolioId: portfolioRes.data._id,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Portfolio not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleCaseStudyView = async (caseStudyId) => {
    try {
      await trackView({
        portfolioId: portfolio._id,
        caseStudyId,
      });
    } catch (err) {
      console.error("Error tracking view:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="portfolio-view"
      style={{
        backgroundColor:
          portfolio.customTheme?.colors?.background ||
          portfolio.selectedTheme?.colors?.background ||
          "#ffffff",
        color:
          portfolio.customTheme?.colors?.text ||
          portfolio.selectedTheme?.colors?.text ||
          "#333333",
        fontFamily:
          portfolio.customTheme?.fonts?.primary ||
          portfolio.selectedTheme?.fonts?.primary ||
          "sans-serif",
      }}
    >
      <header>
        <h1>{portfolio.title}</h1>
        <p>{portfolio.bio}</p>

        {portfolio.socialLinks && (
          <div className="social-links">
            {portfolio.socialLinks.website && (
              <a
                href={portfolio.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            )}
            {portfolio.socialLinks.github && (
              <a
                href={portfolio.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
            {/* Add other social links similarly */}
          </div>
        )}
      </header>

      <section className="case-studies">
        <h2>Case Studies</h2>

        {caseStudies.length === 0 ? (
          <p>No case studies published yet.</p>
        ) : (
          <div className="case-study-grid">
            {caseStudies.map((cs) => (
              <div
                key={cs._id}
                className="case-study-card"
                onClick={() => handleCaseStudyView(cs._id)}
              >
                <h3>{cs.title}</h3>
                <p>{cs.overview.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PortfolioView;
