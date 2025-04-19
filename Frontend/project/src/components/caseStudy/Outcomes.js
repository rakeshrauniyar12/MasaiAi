import React from 'react';

const Outcomes = ({ outcomes, register, setValue }) => {
  const handleAddMetric = () => {
    setValue('outcomes.metrics', [
      ...(outcomes.metrics || []),
      { name: '', value: '' }
    ]);
  };

  const handleRemoveMetric = (index) => {
    const updatedMetrics = [...(outcomes.metrics || [])];
    updatedMetrics.splice(index, 1);
    setValue('outcomes.metrics', updatedMetrics);
  };

  const handleMetricChange = (index, field, value) => {
    const updatedMetrics = [...(outcomes.metrics || [])];
    updatedMetrics[index][field] = value;
    setValue('outcomes.metrics', updatedMetrics);
  };

  const handleAddTestimonial = () => {
    setValue('outcomes.testimonials', [
      ...(outcomes.testimonials || []),
      { name: '', role: '', quote: '' }
    ]);
  };

  const handleRemoveTestimonial = (index) => {
    const updatedTestimonials = [...(outcomes.testimonials || [])];
    updatedTestimonials.splice(index, 1);
    setValue('outcomes.testimonials', updatedTestimonials);
  };

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...(outcomes.testimonials || [])];
    updatedTestimonials[index][field] = value;
    setValue('outcomes.testimonials', updatedTestimonials);
  };

  return (
    <div className="outcomes">
      <h3>Project Outcomes</h3>
      
      <div className="metrics-section">
        <h4>Metrics</h4>
        <button type="button" onClick={handleAddMetric}>Add Metric</button>
        
        {(outcomes.metrics || []).map((metric, index) => (
          <div key={`metric-${index}`} className="metric-item">
            <input
              type="text"
              placeholder="Metric name"
              value={metric.name}
              onChange={(e) => handleMetricChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={metric.value}
              onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveMetric(index)}>Remove</button>
          </div>
        ))}
      </div>
      
      <div className="testimonials-section">
        <h4>Testimonials</h4>
        <button type="button" onClick={handleAddTestimonial}>Add Testimonial</button>
        
        {(outcomes.testimonials || []).map((testimonial, index) => (
          <div key={`testimonial-${index}`} className="testimonial-item">
            <input
              type="text"
              placeholder="Name"
              value={testimonial.name}
              onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              value={testimonial.role}
              onChange={(e) => handleTestimonialChange(index, 'role', e.target.value)}
            />
            <textarea
              placeholder="Quote"
              value={testimonial.quote}
              onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
              rows="3"
            />
            <button type="button" onClick={() => handleRemoveTestimonial(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outcomes;