import { visit } from "../../support/helpers";

function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )
 
  cy.task('table', violationData)
}
  
describe("experience - attributes", () => {
  beforeEach(() => {
    visit("accessibility");
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y(null, null, terminalLog);
  });
});
  