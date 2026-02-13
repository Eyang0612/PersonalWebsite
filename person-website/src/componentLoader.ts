/**
 * Component Loader
 * Dynamically loads HTML components into the main page
 */

interface ComponentConfig {
  selector: string;
  path: string;
}

const components: ComponentConfig[] = [
  { selector: '#loader-component', path: '/components/loader.html' },
  { selector: '#hero-component', path: '/components/hero.html' },
  { selector: '#about-component', path: '/components/about.html' },
  { selector: '#experience-component', path: '/components/experience.html' },
  { selector: '#skills-component', path: '/components/skills.html' },
  { selector: '#projects-component', path: '/components/projects.html' },
  { selector: '#footer-component', path: '/components/footer.html' }
];

/**
 * Loads a single component from the specified path and injects it into the target element
 */
async function loadComponent(selector: string, path: string): Promise<void> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${path} (${response.status})`);
    }
    const html = await response.text();
    const targetElement = document.querySelector(selector);
    
    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
      console.warn(`Target element not found: ${selector}`);
    }
  } catch (error) {
    console.error(`Error loading component ${path}:`, error);
  }
}

/**
 * Loads all components defined in the components array
 */
export async function loadAllComponents(): Promise<void> {
  const loadPromises = components.map(({ selector, path }) => 
    loadComponent(selector, path)
  );
  
  await Promise.all(loadPromises);
  console.log('All components loaded successfully');
}
