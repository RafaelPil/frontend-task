import { useState, useEffect, useCallback } from "react";
import type { ChuckNorrisJoke } from "../types";

const JokesPage = () => {
  const [joke, setJoke] = useState<ChuckNorrisJoke | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/random?category=dev"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jokeData: ChuckNorrisJoke = await response.json();
      setJoke(jokeData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching joke");
      console.error("Error fetching joke:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  // Auto refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchJoke();
    }, 15000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [fetchJoke]);

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleManualRefresh = () => {
    fetchJoke();
  };

  return (
    <div className="jokes-page">
      <h2>Chuck Norris Jokes (Dev)</h2>

      <div className="jokes-container">
        <div className="refresh-section">
          <button
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Loading..." : "Refresh Now"}
          </button>

          {lastUpdated && (
            <p className="last-updated">
              Last updated: {formatTime(lastUpdated)}
            </p>
          )}
        </div>

        <div className="joke-content">
          {isLoading && !joke && (
            <div className="loading">
              <p>Loading joke...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>Error: {error}</p>
              <button
                onClick={handleManualRefresh}
                className="btn btn-secondary"
              >
                Try Again
              </button>
            </div>
          )}

          {joke && (
            <div className="joke-card">
              <div className="joke-header">
                <img
                  src={joke.icon_url}
                  alt="Chuck Norris"
                  className="joke-icon"
                />
                <div className="joke-meta">
                  <p className="joke-id">ID: {joke.id}</p>
                  {joke.categories.length > 0 && (
                    <p className="joke-categories">
                      Categories: {joke.categories.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <blockquote className="joke-text">"{joke.value}"</blockquote>

              <div className="joke-footer">
                <p className="joke-url">
                  <a href={joke.url} target="_blank" rel="noopener noreferrer">
                    Original source
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="auto-refresh-info">
          <p>Jokes auto-refresh every 15 seconds</p>
          <p>Refresh stops when leaving this page</p>
        </div>
      </div>
    </div>
  );
}

export default JokesPage;
