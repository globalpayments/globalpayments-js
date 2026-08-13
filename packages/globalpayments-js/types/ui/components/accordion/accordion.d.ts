/**
 * Accordion Component
 * Provides simple collapsible/expandable sections for form elements
 */
export declare class Accordion {
    private container;
    private animationDuration;
    /**
     * Constructor
     * @param container - Parent HTML element
     * @param animationDuration - Animation speed in ms (default: 300)
     */
    constructor(container: HTMLElement, animationDuration?: number);
    /**
     * Initialize the accordion structure
     */
    private initialize;
    /**
     * Add a new collapsible section
     * @param sectionId - Unique identifier
     * @param title - Section header title
     * @param content - Content to toggle
     */
    addSection(sectionId: string, title: string, iconBeforeText: string, iconAfterText: string, content: HTMLElement): void;
    /**
     * Toggle section visibility
     * @param contentWrapper - Content element
     * @param header - Header button element
     */
    private toggleSection;
    /**
     * Show section with animation
     */
    private showSection;
    /**
     * Hide section with animation
     */
    private hideSection;
    /**
     * Collapse a section by its ID
     * @param sectionId - Unique identifier of the section
     */
    collapseSection(sectionId: string): void;
    /**
     * Force browser reflow so height transition starts correctly.
     */
    private forceReflow;
}
export default Accordion;
