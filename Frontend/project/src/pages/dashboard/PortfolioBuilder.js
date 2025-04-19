import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  getMyPortfolio,
  createUpdatePortfolio,
  checkUsernameAvailability
} from '../../services/api';
import "../../styles/PortfolioBuil.css"
import ThemeSelector from '../../components/portfolio/ThemeSelector';

const PortfolioBuilder = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const username = watch('username');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getMyPortfolio();
        setPortfolio(res.data);
        if (res.data) {
          Object.keys(res.data).forEach(key => {
            if (key !== '_id' && key !== '__v') {
              setValue(key, res.data[key]);
            }
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const checkUsername = async () => {
      if (username && username !== portfolio?.username) {
        try {
          const res = await checkUsernameAvailability(username);
          setUsernameAvailable(res.data.available);
        } catch (err) {
          console.error(err);
        }
      }
    };

    const timer = setTimeout(() => {
      if (username) checkUsername();
    }, 500);

    return () => clearTimeout(timer);
  }, [username, portfolio?.username]);

  const onSubmit = async (data) => {
    try {
      const res = await createUpdatePortfolio(data);
      setPortfolio(res.data);
      alert('Portfolio saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving portfolio');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="portfolio-builder">
      <h2>Portfolio Builder</h2>
      
      <Tabs>
        <TabList>
          <Tab>Basic Info</Tab>
          <Tab>Social Links</Tab>
          <Tab>Theme</Tab>
          <Tab>Publish</Tab>
        </TabList>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <span className="error">{errors.username.message}</span>}
              {!usernameAvailable && (
                <span className="error">Username is not available</span>
              )}
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <span className="error">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                {...register('bio')}
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input
                type="text"
                {...register('skills')}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                {...register('socialLinks.website')}
              />
            </div>

            <div className="form-group">
              <label>GitHub</label>
              <input
                type="url"
                {...register('socialLinks.github')}
              />
            </div>

            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                {...register('socialLinks.linkedin')}
              />
            </div>

            <div className="form-group">
              <label>Twitter</label>
              <input
                type="url"
                {...register('socialLinks.twitter')}
              />
            </div>

            <div className="form-group">
              <label>Dribbble</label>
              <input
                type="url"
                {...register('socialLinks.dribbble')}
              />
            </div>

            <div className="form-group">
              <label>Behance</label>
              <input
                type="url"
                {...register('socialLinks.behance')}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <ThemeSelector 
              register={register}
              setValue={setValue}
              selectedTheme={portfolio?.selectedTheme}
              customTheme={portfolio?.customTheme}
            />
          </TabPanel>

          <TabPanel>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  {...register('published')}
                />
                Publish Portfolio
              </label>
            </div>
          </TabPanel>

          <button type="submit" disabled={!usernameAvailable}>
            Save Portfolio
          </button>
        </form>
      </Tabs>
    </div>
  );
};

export default PortfolioBuilder;