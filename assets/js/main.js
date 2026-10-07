document.addEventListener('DOMContentLoaded', () => {
  // Theme Handling with Persistence
  const savedTheme = localStorage.getItem('imego-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('imego-theme', newTheme);
    });
  }

  // Dropdown Toggles
  const toolsBtn = document.getElementById('toolsToggleBtn');
  const toolsSubBar = document.getElementById('toolsSubBar');
  const legalBtn = document.getElementById('legalToggleBtn');
  const legalSubBar = document.getElementById('legalSubBar');

  if (toolsBtn && toolsSubBar) {
    toolsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toolsSubBar.classList.toggle('open');
      if (legalSubBar) legalSubBar.classList.remove('open');
    });
  }

  if (legalBtn && legalSubBar) {
    legalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      legalSubBar.classList.toggle('open');
      if (toolsSubBar) toolsSubBar.classList.remove('open');
    });
  }

  // Exclusive FAQ Accordion (Opens clicked item & closes all others automatically)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});