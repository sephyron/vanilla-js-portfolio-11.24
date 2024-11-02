import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from '../counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

document.addEventListener('DOMContentLoaded', () => {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('click', () => {
      const projectId = project.getAttribute('data-id');
      window.history.pushState({}, '', `/project/${projectId}`);
      loadProjectDetail(projectId);
    });
  });

  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    if (path.startsWith('/project/')) {
      const projectId = path.split('/').pop();
      loadProjectDetail(projectId);
    } else {
      loadPortfolio();
    }
  });

  const loadPortfolio = () => {
    document.getElementById('main-content').innerHTML = `
      <section id="portfolio">
        <h2>Projects</h2>
        <div class="project" data-id="1">
          <img src="project1.jpg" alt="Project 1">
          <h3>Project 1</h3>
        </div>
        <div class="project" data-id="2">
          <img src="project2.jpg" alt="Project 2">
          <h3>Project 2</h3>
        </div>
        <!-- Add more projects as needed -->
      </section>
    `;
    attachProjectListeners();
  };

  const loadProjectDetail = (projectId) => {
    document.getElementById('main-content').innerHTML = `
      <section id="project-detail">
        <h2>Project ${projectId}</h2>
        <p>Details about project ${projectId}...</p>
        <button id="back-button">Back to Portfolio</button>
      </section>
    `;
    document.getElementById('back-button').addEventListener('click', () => {
      window.history.pushState({}, '', '/');
      loadPortfolio();
    });
  };

  const attachProjectListeners = () => {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
      project.addEventListener('click', () => {
        const projectId = project.getAttribute('data-id');
        window.history.pushState({}, '', `/project/${projectId}`);
        loadProjectDetail(projectId);
      });
    });
  };

  if (window.location.pathname.startsWith('/project/')) {
    const projectId = window.location.pathname.split('/').pop();
    loadProjectDetail(projectId);
  } else {
    loadPortfolio();
  }
});
