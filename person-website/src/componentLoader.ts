/**
 * Component Loader
 * Dynamically loads HTML components into the main page
 */

// Import HTML files as raw strings (Vite will bundle them)
import loaderHtml from '../components/loader.html?raw';
import heroHtml from '../components/hero.html?raw';
import aboutHtml from '../components/about.html?raw';
import experienceHtml from '../components/experience.html?raw';
import skillsHtml from '../components/skills.html?raw';
import projectsHtml from '../components/projects.html?raw';
import footerHtml from '../components/footer.html?raw';

interface ComponentConfig {
  selector: string;
  html: string;
}

const components: ComponentConfig[] = [
  { selector: '#loader-component', html: loaderHtml },
  { selector: '#hero-component', html: heroHtml },
  { selector: '#about-component', html: aboutHtml },
  { selector: '#experience-component', html: experienceHtml },
  { selector: '#skills-component', html: skillsHtml },
  { selector: '#projects-component', html: projectsHtml },
  { selector: '#footer-component', html: footerHtml }
];

/**
 * Loads a single component by injecting HTML into the target element
 */
function loadComponent(selector: string, html: string): void {
  try {
    const targetElement = document.querySelector(selector);
    
    if (targetElement) {
      targetElement.innerHTML = html;
    } else {
      console.warn(`Target element not found: ${selector}`);
    }
  } catch (error) {
    console.error(`Error loading component ${selector}:`, error);
  }
}

/**
 * Loads all components defined in the components array
 */
export async function loadAllComponents(): Promise<void> {
  components.forEach(({ selector, html }) => 
    loadComponent(selector, html)
  );
  
  console.log('All components loaded successfully');
}
