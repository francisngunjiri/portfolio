const username = "francisngunjiri";
const projectsContainer = document.getElementById("projects-grid");
fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    const sortedRepos = repos
      .filter(repo => !repo.fork)
      .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0,6);
    sortedRepos.forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card","neu");
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      projectsContainer.appendChild(card);
    });
  })
  .catch(error => { console.error("Error loading repos:", error); });