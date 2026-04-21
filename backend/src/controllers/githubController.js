const axios = require('axios');

// Simple in-memory cache
let cache = {
  stats: null,
  repos: null,
  lastFetched: null
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

exports.getUserStats = async (req, res) => {
  const { username } = req.params;

  if (cache.stats && cache.lastFetched && (Date.now() - cache.lastFetched < CACHE_DURATION)) {
    return res.json(cache.stats);
  }

  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

    const repos = reposResponse.data;
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    
    // Calculate top languages
    const langMap = {};
    repos.forEach(repo => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    const totalReposWithLang = Object.values(langMap).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langMap)
      .map(([name, count]) => ({
        name,
        percent: Math.round((count / totalReposWithLang) * 100),
        color: getLangColor(name)
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 4);

    const stats = {
      username: userResponse.data.login,
      totalStars,
      totalCommits: "800+", // GitHub API requires separate events fetch for commits, mocking for now
      totalRepos: userResponse.data.public_repos,
      topLanguages,
      avatarUrl: userResponse.data.avatar_url
    };

    cache.stats = stats;
    cache.lastFetched = Date.now();

    res.json(stats);
  } catch (error) {
    console.error("GitHub API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
};

exports.getTopRepos = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=6`);
    const repos = response.data.map(repo => ({
      id: repo.name,
      title: repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: repo.description || "A professional project hosted on GitHub.",
      longDescription: `Full investigation and deployment of the ${repo.name} repository. Key features include high-performance logic and modular architecture.`,
      tech: [repo.language].filter(Boolean),
      image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      github: repo.html_url,
      live: repo.homepage || repo.html_url,
      stars: repo.stargazers_count
    }));

    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top repos" });
  }
};

function getLangColor(lang) {
  const colors = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    React: "#61dbfb",
    Nextjs: "#000000",
    Python: "#3776ab",
    HTML: "#e34c26",
    CSS: "#264de4"
  };
  return colors[lang] || "#888888";
}
