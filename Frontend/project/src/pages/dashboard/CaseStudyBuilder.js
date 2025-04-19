import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  getMyCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  reorderCaseStudies,
} from "../../services/api";
import "../../styles/CaseStudy.css";
import MediaGallery from "../../components/caseStudy/MediaGallery";
import Timeline from "../../components/caseStudy/Timeline";
import Outcomes from "../../components/caseStudy/Outcomes";

const CaseStudyBuilder = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("list");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await getMyCaseStudies();
        setCaseStudies(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const handleCreateNew = () => {
    reset();
    setCurrentCaseStudy(null);
    setMode("create");
  };

  const handleEdit = async (id) => {
    try {
      const res = await getCaseStudy(id);
      setCurrentCaseStudy(res.data);
      reset(res.data);
      setMode("edit");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      try {
        await deleteCaseStudy(id);
        setCaseStudies(caseStudies.filter((cs) => cs._id !== id));
        if (currentCaseStudy?._id === id) {
          setMode("list");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      let res;
      if (mode === "create") {
        res = await createCaseStudy(data);
        setCaseStudies([...caseStudies, res.data]);
      } else {
        res = await updateCaseStudy(currentCaseStudy._id, data);
        setCaseStudies(
          caseStudies.map((cs) =>
            cs._id === currentCaseStudy._id ? res.data : cs
          )
        );
      }
      setCurrentCaseStudy(res.data);
      alert("Case study saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving case study");
    }
  };

  const handleReorder = async (newOrder) => {
    try {
      await reorderCaseStudies(newOrder);
      const updatedCaseStudies = newOrder
        .map((id) => caseStudies.find((cs) => cs._id === id))
        .filter((cs) => cs);
      setCaseStudies(updatedCaseStudies);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (mode === "list") {
    return (
      <div className="case-study-list">
        <h2>My Case Studies</h2>
        <button onClick={handleCreateNew}>Create New Case Study</button>

        <div className="reorder-container">
          {caseStudies.map((cs, index) => (
            <div key={cs._id} className="case-study-item">
              <span>
                {index + 1}. {cs.title}
              </span>
              <div>
                <button onClick={() => handleEdit(cs._id)}>Edit</button>
                <button onClick={() => handleDelete(cs._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="case-study-builder">
      <h2>{mode === "create" ? "Create" : "Edit"} Case Study</h2>

      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Media</Tab>
          <Tab>Process</Tab>
          <Tab>Outcomes</Tab>
        </TabList>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Slug (URL identifier)</label>
              <input
                type="text"
                {...register("slug", { required: "Slug is required" })}
              />
              {errors.slug && (
                <span className="error">{errors.slug.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Overview</label>
              <textarea
                {...register("overview", { required: "Overview is required" })}
                rows="5"
              />
              {errors.overview && (
                <span className="error">{errors.overview.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Problem Statement</label>
              <textarea {...register("problemStatement")} rows="5" />
            </div>

            <div className="form-group">
              <label>Solution</label>
              <textarea {...register("solution")} rows="5" />
            </div>
          </TabPanel>

          <TabPanel>
            <MediaGallery
              register={register}
              setValue={setValue}
              mediaItems={currentCaseStudy?.mediaGallery || []}
            />
          </TabPanel>

          <TabPanel>
            <Timeline
              register={register}
              setValue={setValue}
              timelineItems={currentCaseStudy?.timeline || []}
            />

            <div className="form-group">
              <label>Tools & Technologies (comma separated)</label>
              <input
                type="text"
                {...register("toolsTechnologies")}
                defaultValue={currentCaseStudy?.toolsTechnologies?.join(", ")}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <Outcomes
              register={register}
              setValue={setValue}
              outcomes={currentCaseStudy?.outcomes || {}}
            />
          </TabPanel>

          <div className="form-group">
            <label>
              <input type="checkbox" {...register("published")} />
              Publish this case study
            </label>
          </div>

          <button type="submit">Save Case Study</button>
          <button type="button" onClick={() => setMode("list")}>
            Cancel
          </button>
        </form>
      </Tabs>
    </div>
  );
};

export default CaseStudyBuilder;
