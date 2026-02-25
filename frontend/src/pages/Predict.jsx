import { useState } from 'react'
import { predictText } from '../api'

const SAMPLE_TEXTS = [
    "You're such a loser, nobody likes you",
    "Hey, great job on the presentation today!",
    "I'm going to find you and hurt you",
    "Thanks for being such a good friend",
    "You're so ugly and stupid, just go away",
    "Let's meet up for coffee this weekend",
    "Kill yourself you worthless piece of trash",
    "I really appreciate your help with the project",
]

export default function Predict({ results }) {
    const [text, setText] = useState('')
    const [modelKey, setModelKey] = useState('')
    const [prediction, setPrediction] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const trainedModels = results.filter(r => r.model_key)

    const handlePredict = async () => {
        if (!text.trim() || !modelKey) return
        setLoading(true)
        setError('')
        setPrediction(null)

        try {
            const data = await predictText(text, modelKey)
            setPrediction(data.prediction)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSample = (sample) => {
        setText(sample)
        setPrediction(null)
        setError('')
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <h1 className="page-title">Live Prediction</h1>
                <p className="page-subtitle">
                    Test any text against trained models to detect cyberbullying in real-time
                </p>
            </div>

            {trainedModels.length === 0 ? (
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <div className="empty-state-title">No trained models</div>
                        <div className="empty-state-text">
                            Train at least one model first to make predictions.
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid-2">
                    {/* Input Panel */}
                    <div>
                        <div className="card section">
                            <div className="card-title mb-16">Input Text</div>
                            <textarea
                                className="textarea"
                                placeholder="Type or paste text to analyze for cyberbullying..."
                                value={text}
                                onChange={e => { setText(e.target.value); setPrediction(null); setError('') }}
                                rows={5}
                            />

                            <div className="mt-16">
                                <label className="text-sm text-muted" style={{ display: 'block', marginBottom: 8 }}>
                                    Select Model
                                </label>
                                <select
                                    className="select"
                                    value={modelKey}
                                    onChange={e => { setModelKey(e.target.value); setPrediction(null) }}
                                >
                                    <option value="">Choose a trained model...</option>
                                    {trainedModels.map(r => (
                                        <option key={r.model_key} value={r.model_key}>
                                            {r.display_name} (F1: {(r.metrics.f1_score * 100).toFixed(1)}%)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className="btn btn-primary btn-lg mt-24"
                                onClick={handlePredict}
                                disabled={loading || !text.trim() || !modelKey}
                                style={{ width: '100%' }}
                            >
                                {loading ? <><div className="spinner"></div> Analyzing...</> : '🔍 Analyze Text'}
                            </button>
                        </div>

                        {/* Sample Texts */}
                        <div className="card">
                            <div className="card-title mb-16">💡 Sample Texts</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {SAMPLE_TEXTS.map((sample, i) => (
                                    <button
                                        key={i}
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handleSample(sample)}
                                        style={{
                                            textAlign: 'left',
                                            justifyContent: 'flex-start',
                                            whiteSpace: 'normal',
                                            height: 'auto',
                                            padding: '10px 14px',
                                        }}
                                    >
                                        <span style={{ opacity: 0.5, marginRight: 8 }}>#{i + 1}</span>
                                        {sample}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div>
                        {error && (
                            <div className="prediction-result prediction-bully mb-16">
                                <div className="prediction-icon">❌</div>
                                <div className="prediction-label">Error</div>
                                <p className="text-sm text-muted">{error}</p>
                            </div>
                        )}

                        {prediction && (
                            <div className="card fade-in">
                                <div className={`prediction-result ${prediction.prediction === 1 ? 'prediction-bully' : 'prediction-safe'}`}>
                                    <div className="prediction-icon">
                                        {prediction.prediction === 1 ? '🚨' : '✅'}
                                    </div>
                                    <div className="prediction-label">
                                        {prediction.label}
                                    </div>
                                    {prediction.confidence && (
                                        <div className="prediction-confidence">
                                            Confidence: {(prediction.confidence * 100).toFixed(1)}%
                                        </div>
                                    )}
                                </div>

                                <div className="mt-24">
                                    <div className="text-sm text-muted mb-16">
                                        <strong>Model:</strong> {trainedModels.find(m => m.model_key === modelKey)?.display_name}
                                    </div>
                                    <div className="text-sm text-muted mb-16">
                                        <strong>Original Text:</strong>
                                        <div style={{
                                            padding: '12px',
                                            background: 'var(--bg-glass)',
                                            borderRadius: 'var(--radius-sm)',
                                            marginTop: 8,
                                            lineHeight: 1.6,
                                        }}>
                                            {prediction.original_text || text}
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted">
                                        <strong>Processed Text:</strong>
                                        <div style={{
                                            padding: '12px',
                                            background: 'var(--bg-glass)',
                                            borderRadius: 'var(--radius-sm)',
                                            marginTop: 8,
                                            lineHeight: 1.6,
                                            fontStyle: 'italic'
                                        }}>
                                            {prediction.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!prediction && !error && (
                            <div className="card">
                                <div className="empty-state">
                                    <div className="empty-state-icon">💬</div>
                                    <div className="empty-state-title">Enter text to analyze</div>
                                    <div className="empty-state-text">
                                        Type a message or select a sample text, choose a model, and click "Analyze" to see the prediction.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Compare across models */}
                        {prediction && trainedModels.length > 1 && (
                            <div className="card mt-24 fade-in">
                                <div className="card-title mb-16">🔄 Try with different models</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {trainedModels.map(m => (
                                        <button
                                            key={m.model_key}
                                            className={`btn ${m.model_key === modelKey ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                                            onClick={() => {
                                                setModelKey(m.model_key)
                                                setPrediction(null)
                                            }}
                                        >
                                            {m.display_name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
