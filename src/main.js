import './style.css';

// Initialize Theme
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const currentTheme = getPreferredTheme();
document.documentElement.setAttribute('data-theme', currentTheme);

document.querySelector('#app').innerHTML = `
  <div class="theme-toggle-container">
    <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle Theme">
      ${currentTheme === 'light' ? '🌙' : '☀️'}
    </button>
  </div>
  
  <div class="card">
    <div class="tag">
      <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #00e5ff; margin-right: 4px;"></span>
      Ready for CI/CD
    </div>
    <h1 class="gradient-text">Hello World!</h1>
    <p class="subtitle">A buildable Node.js + Vite application template for testing automated deployment workflows.</p>
    
    <div>
      <button id="action-btn" class="interact-btn">Click Me</button>
      <div id="status" class="status-box">Interaction ready. Try clicking the button!</div>
    </div>

    <div class="info-footer">
      Build output will be bundled into <code>/dist</code> folder.
      <hr />
      v 0.1
    </div>
  </div>
`;

// Setup Interaction Button
const button = document.querySelector('#action-btn');
const statusDiv = document.querySelector('#status');
let clickCount = 0;

button.addEventListener('click', () => {
  clickCount++;
  statusDiv.innerHTML = `✨ Clicked <strong>${clickCount}</strong> ${clickCount === 1 ? 'time' : 'times'}! Current environment: <code>Production Build Test</code>`;

  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'none';
  }, 100);
});

// Setup Theme Toggle
const themeToggle = document.querySelector('#theme-toggle');
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
});

