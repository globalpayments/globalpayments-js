/**
 * Accordion Component
 * Provides simple collapsible/expandable sections for form elements
 */

import {
  createHtmlDivElement,
  createHtmlButtonElement,
  createHtmlImageElement,
  createHtmlSpanElement,
} from "../../../common/html-element";

// Main Accordion Class
export class Accordion {
  private container: HTMLElement;
  private animationDuration: number;

  /**
   * Constructor
   * @param container - Parent HTML element
   * @param animationDuration - Animation speed in ms (default: 300)
   */
  constructor(container: HTMLElement, animationDuration: number = 300) {
    this.container = container;
    this.animationDuration = animationDuration;
    this.initialize();
  }

  /**
   * Initialize the accordion structure
   */
  private initialize(): void {
    this.container.classList.add("gp-accordion");
  }

  /**
   * Add a new collapsible section
   * @param sectionId - Unique identifier
   * @param title - Section header title
   * @param content - Content to toggle
   */
  public addSection(
    sectionId: string,
    title: string,
    iconBeforeText: string,
    iconAfterText: string,
    content: HTMLElement
  ): void {
    // Section wrapper
    const sectionWrapper = createHtmlDivElement({
      className: "gp-accordion__section",
      attributes: [{ "data-section-id": sectionId }],
    });

    // Header button
    const header = createHtmlButtonElement({
      className: "gp-accordion__header",
      attributes: [{ type: "button" }],
    });
    const iconAfterTitle = createHtmlImageElement({
      className: "gp-accordion__icon-after",
      src: iconAfterText,
      alt: "card brand icon",
    });

    // Title span
    const titleSpan = createHtmlSpanElement({
      className: "gp-accordion__title",
      textContent: title,
    });

    const iconBeforeTitle = createHtmlImageElement({
      className: "gp-accordion__icon-before",
      src: iconBeforeText,
      alt: "card brand icon",
    });

    // Icon span
    const icon = createHtmlSpanElement({
      className: "gp-accordion__icon",
    });

    header.appendChild(iconBeforeTitle);
    header.appendChild(titleSpan);
    header.appendChild(iconAfterTitle);
    header.appendChild(icon);

    // Content wrapper
    const contentWrapper = createHtmlDivElement({
      id: `gp-accordion-content-${sectionId}`,
      className: "gp-accordion__content",
    });

    contentWrapper.appendChild(content);

    // Toggle on header click
    header.addEventListener("click", () => {
      this.toggleSection(contentWrapper, header);
    });

    sectionWrapper.appendChild(header);
    sectionWrapper.appendChild(contentWrapper);
    this.container.appendChild(sectionWrapper);
  }

  /**
   * Toggle section visibility
   * @param contentWrapper - Content element
   * @param header - Header button element
   */
  private toggleSection(contentWrapper: HTMLElement, header: HTMLElement): void {
    const isVisible = contentWrapper.classList.contains("gp-accordion__content--visible");

    if (isVisible) {
      this.hideSection(contentWrapper, header);
    } else {
      this.showSection(contentWrapper, header);
    }
  }

  /**
   * Show section with animation
   */
  private showSection(contentWrapper: HTMLElement, header: HTMLElement): void {
    contentWrapper.classList.add("gp-accordion__content--visible");
    header.classList.add("gp-accordion__header--expanded");

    contentWrapper.style.height = "0";
    contentWrapper.style.overflow = "hidden";
    contentWrapper.style.transition = `height ${this.animationDuration}ms ease`;

    this.forceReflow(contentWrapper);
    contentWrapper.style.height = contentWrapper.scrollHeight + "px";

    const handleTransitionEnd = () => {
      contentWrapper.style.height = "auto";
      contentWrapper.removeEventListener("transitionend", handleTransitionEnd);
    };

    contentWrapper.addEventListener("transitionend", handleTransitionEnd, { once: true });
  }

  /**
   * Hide section with animation
   */
  private hideSection(contentWrapper: HTMLElement, header: HTMLElement): void {
    contentWrapper.classList.remove("gp-accordion__content--visible");
    header.classList.remove("gp-accordion__header--expanded");

    contentWrapper.style.height = contentWrapper.scrollHeight + "px";
    contentWrapper.style.overflow = "hidden";
    contentWrapper.style.transition = `height ${this.animationDuration}ms ease`;

    this.forceReflow(contentWrapper);
    contentWrapper.style.height = "0";

    const handleTransitionEnd = () => {
      contentWrapper.style.transition = "";
      contentWrapper.removeEventListener("transitionend", handleTransitionEnd);
    };

    contentWrapper.addEventListener("transitionend", handleTransitionEnd, { once: true });
  }

  /**
   * Collapse a section by its ID
   * @param sectionId - Unique identifier of the section
   */
  public collapseSection(sectionId: string): void {
    const section = this.container.querySelector(`[data-section-id="${sectionId}"]`) as HTMLElement;
    if (!section) return;

    const header = section.querySelector(".gp-accordion__header") as HTMLElement;
    const content = section.querySelector(".gp-accordion__content") as HTMLElement;

    if (header && content) {
      this.hideSection(content, header);
    }
  }

  /**
   * Force browser reflow so height transition starts correctly.
   */
  private forceReflow(element: HTMLElement): number {
    return element.offsetHeight;
  }
}

export default Accordion;
