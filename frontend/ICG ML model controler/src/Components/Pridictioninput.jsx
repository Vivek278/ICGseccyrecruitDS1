import React, { useState } from 'react';
import './Components.css';

function PredictionInput() {
  const [features, setFeatures] = useState(Array(30).fill(''));
  const [lineInput, setLineInput] = useState('');
  const [useLineInput, setUseLineInput] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleLineInputChange = (e) => {
    setLineInput(e.target.value);
  };


  const getFeaturesArray = () => {
    if (useLineInput) {
    
      const parts = lineInput.split(',').map(s => s.trim()).filter(Boolean);
      if (parts.length !== 30) {
        throw new Error('Please enter exactly 30 feature values separated by commas.');
      }
      if (parts.some(p => isNaN(Number(p)))) {
        throw new Error('All features must be valid numbers.');
      }
      return parts.map(Number);
    } else {
      if (features.some(f => f === '' || isNaN(Number(f)))) {
        throw new Error('Please enter valid numbers for all features.');
      }
      return features.map(Number);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const inputFeatures = getFeaturesArray();

      setLoading(true);
      const response = await fetch('https://engigrow-scrt.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: inputFeatures }),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.predicted_class);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h2>Enter Features for Prediction</h2>

      <div className="toggle-input-mode">
        <label>
          <input
            type="checkbox"
            checked={useLineInput}
            onChange={() => {
              setUseLineInput(!useLineInput);
              setError(null);
              setPrediction(null);
            }}
          />
          Use single-line input
        </label>
      </div>

      <form onSubmit={handleSubmit} className="prediction-form">
        {useLineInput ? (
          <div className="input-group">
            <label>All Features (comma separated)</label>
            <input
              type="text"
              value={lineInput}
              onChange={handleLineInputChange}
              placeholder="Enter 30 feature values separated by commas"
              style={{ fontFamily: 'monospace' }}
              required
            />
          </div>
        ) : (
          features.map((value, idx) => (
            <div key={idx} className="input-group">
              <label>Feature {idx + 1}</label>
              <input
                type="number"
                step="any"
                value={value}
                onChange={(e) => handleChange(idx, e.target.value)}
                placeholder={`Enter value for F${idx + 1}`}
                required
              />
            </div>
          ))
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {prediction !== null && (
        <p className="result-msg">
          Predicted Class: <strong>{prediction}</strong>
        </p>
      )}
    </div>
  );
}

export default PredictionInput;
