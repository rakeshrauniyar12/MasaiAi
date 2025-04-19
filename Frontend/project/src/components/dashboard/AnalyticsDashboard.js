import React, { useState, useEffect } from 'react';
import { getPortfolioAnalytics } from '../../services/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getPortfolioAnalytics();
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (!analytics) return <div>No analytics data available</div>;

  return (
    <div className="analytics-dashboard">
      <h2>Portfolio Analytics</h2>
      
      <div className="summary-cards">
        <div className="card">
          <h3>Total Views</h3>
          <p>{analytics.summary?.totalViews || 0}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Popular Case Studies</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={analytics.popularCaseStudies}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="caseStudy.title" 
              angle={-45} 
              textAnchor="end" 
              height={70}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#8884d8" name="Views" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recent-activity">
        <h3>Recent Views</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Case Study</th>
              <th>Referrer</th>
            </tr>
          </thead>
          <tbody>
            {analytics.recentViews.map((view, index) => (
              <tr key={index}>
                <td>{new Date(view.timestamp).toLocaleString()}</td>
                <td>{view.caseStudy?.title || 'Portfolio Home'}</td>
                <td>{view.referrer || 'Direct'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;