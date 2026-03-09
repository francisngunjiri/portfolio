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
      const card = document.createElement("article");
      card.classList.add("project-card","card","reveal");
      const fullname = repo.full_name || `${username}/${repo.name}`;
      const description = repo.description ? repo.description : "No description available.";
      const img = "images/sample-project.png";
      card.innerHTML = `
        <img src="${img}" alt="${repo.name} screenshot" style="width:100%; border-radius:8px; margin-bottom:12px">
        <h3>${repo.name}</h3>
        <p class="section-sub">${description}</p>
        <div style="display:flex;gap:10px;margin-top:12px">
          <a href="#" class="btn-outline case-open" data-fullname="${fullname}" data-name="${repo.name}" data-desc="${description}">View case study</a>
          <a href="${repo.html_url}" class="btn" target="_blank" rel="noopener">GitHub</a>
        </div>
      `;

      projectsContainer.appendChild(card);
    });

    // lazy bind case-open buttons (delegation)
    projectsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.case-open');
      if(!btn) return;
      e.preventDefault();
      const fullname = btn.dataset.fullname;
      const name = btn.dataset.name;
      const desc = btn.dataset.desc;
      // dispatch a custom event to be handled by main script
      window.dispatchEvent(new CustomEvent('openCaseStudy', { detail: { fullname, name, desc } }));
    });

  })
  .catch(error => { console.error("Error loading repos:", error); });