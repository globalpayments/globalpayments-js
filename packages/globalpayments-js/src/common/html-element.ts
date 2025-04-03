export const createHtmlElement = (
    elementType: string,
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[]
    }): HTMLElement => {
        const { id, className, attributes } = props || {};

        const htmlElement = document.createElement(elementType);
        if (id) {
            htmlElement.id = id;
        }
        if (className) {
            htmlElement.className = className;
        }
        if (attributes) {
            attributes.forEach(attr => {
                const qualifiedName = Object.keys(attr)[0];
                const value = Object.values(attr)[0];
                htmlElement.setAttribute(qualifiedName, value);
            });
        }

        return htmlElement;
}

export const createHtmlDivElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLDivElement => {
        return createHtmlElement('div', props) as HTMLDivElement;
}

export const createHtmlSpanElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
    }): HTMLSpanElement => {
        const { textContent } = props || {};

        const htmlElement = createHtmlElement('span', props) as HTMLSpanElement;
        if (textContent) {
            htmlElement.innerHTML = textContent;
        }

        return htmlElement;
}

export const createHtmlButtonElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
    }): HTMLButtonElement => {
        const { textContent } = props || {};

        const htmlElement = createHtmlElement('button', props) as HTMLButtonElement;
        if (textContent) {
            htmlElement.textContent = textContent;
        }

        return htmlElement;
}

export const createHtmlImageElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        src: string,
        alt: string,
    }): HTMLImageElement => {
        const { src, alt } = props || {};

        const htmlElement = createHtmlElement('img', props) as HTMLImageElement;
        if (src) {
            htmlElement.src = src;
        }
        if (alt) {
            htmlElement.alt = alt;
        }

        return htmlElement;
}

export const createHtmlUlElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLUListElement => {
        return createHtmlElement('ul', props) as HTMLUListElement;
}

export const createHtmlLiElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLLIElement => {
        return createHtmlElement('li', props) as HTMLLIElement;
}

export enum HtmlAnchorTarget {
    Blank = "_blank",
    Self = "_self",
    Parent = "_parent",
    Top = "_top",
}

export const createHtmlAnchorElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        textContent?: string,
        target?: HtmlAnchorTarget,
        href: string,
    }): HTMLAnchorElement => {
        const { href, textContent, target } = props || {};

        const htmlElement = createHtmlElement('a', props) as HTMLAnchorElement;
        htmlElement.href = href || '#';
        htmlElement.rel = 'noopener noreferrer';

        if (textContent) {
            htmlElement.textContent = textContent;
        }
        if (target) {
            htmlElement.target = target;
        }

        return htmlElement;
}

export const createHtmlCheckboxElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        name?: string,
        textContent?: string,
        checked: boolean,
    }): HTMLInputElement => {
        const { name, checked, textContent } = props || {};

        const htmlElement = createHtmlElement('input', props) as HTMLInputElement;
        htmlElement.type = 'checkbox';

        if (name) {
            htmlElement.name = name;
        }
        if (checked) {
            htmlElement.setAttribute('checked', 'checked');
        }
        if (textContent) {
            htmlElement.textContent = textContent;
        }

        return htmlElement;
}

export const createHtmlRadioButtonElement = (
  props?: {
    id?: string,
    className?: string,
    attributes?: { [key: string]: string }[],
    name?: string,
    labelText?: string,
    additionalInfo?: string,
    checked: boolean,
    target?: string,
    value?: string,
  }): HTMLDivElement => {
  const { id, className, attributes, name, labelText, additionalInfo, checked, target, value } = props || {};

  const radioButton = createHtmlElement('input', props) as HTMLInputElement;
  radioButton.type = 'radio';

  if (id) radioButton.id = id;
  if (className) radioButton.className = className;
  if (value) radioButton.value = value;
  if (attributes) {
    attributes.forEach(attr => {
      radioButton.setAttribute(attr.key, attr.value);
    });
  }
  if (name) radioButton.name = name;
  if (checked) radioButton.checked = checked;

  const container = createHtmlDivElement({
    className: "radio-button",
    attributes: [{
      "data-target": target || ''
    }]
  });
  container.addEventListener('click', (_ev: MouseEvent) => {
    radioButton.click();
  });
  container.appendChild(radioButton);

  if (labelText) {
    const label = createHtmlLabelElement();
    if (id) label.htmlFor = id;
    label.textContent = labelText;
    container.appendChild(label);
  }

  const infoSpan = createHtmlSpanElement();
  if (additionalInfo) {
    infoSpan.innerHTML = additionalInfo;
    container.appendChild(infoSpan);
  }

  // Add class "checked" to container if input is checked
  if (checked) container.classList.add('checked');

  return container;
}

export const createHtmlLabelElement = (
    props?: {
        id?: string,
        className?: string,
        attributes?: { [key: string]: string }[],
        htmlFor: string,
        textContent?: string,
    }): HTMLLabelElement => {
        const { htmlFor, textContent } = props || {};

        const htmlElement = createHtmlElement('label', props) as HTMLLabelElement;

        if (htmlFor) {
            htmlElement.htmlFor = htmlFor;
        }
        if (textContent) {
            htmlElement.textContent = textContent;
        }

        return htmlElement;
}

export const createHtmlIFrameElement = (
    props?: {
        id?: string,
        src: string,
        className?: string,
        attributes?: { [key: string]: string }[],
    }): HTMLIFrameElement => {
        const { src } = props || {};

        const htmlElement = createHtmlElement('iframe', props) as HTMLIFrameElement;
        if (src) {
            htmlElement.src = src;
        }

        return htmlElement;
}

export const changeCreditCardFormFieldsVisibility = (visible: boolean): void => {
  const fields = [
    // Apm
    '.credit-card-click-to-pay',
    '.credit-card-google-pay',
    '.credit-card-apple-pay',
    '.other-cards-label',
    '.qr-code-payment-methods-wrapper',
    '.open-banking-button-wrapper',
    '.blik-button-wrapper',
    '.paypal-button-wrapper',
    // Credit card common
    '.credit-card-card-number',
    '.credit-card-card-expiration',
    '.credit-card-card-cvv',
    '.credit-card-card-holder-name',
    '.credit-card-submit',
    // '.credit-card-shield',
    // '.credit-card-logo',
  ];

  fields.forEach((fieldSelector: any) => {
    const domElement = document.querySelector(`${fieldSelector}`);
    if (domElement) {
      domElement.setAttribute('style', `display: ${visible ? 'block' : 'none'};`);
    }
  });
}

export const createToolTip = (
  props?: {
    id?: string,
    className?: string,
    attributes?: { [key: string]: string }[],
    ariaLabel?: string,
    ariaDescribedBy?: string,
    role?: string,
    tabIndex?: string,
    title?: string,
    htmlContent?: string,
  }
): HTMLElement => {
  const {
    id,
    className,
    attributes,
    ariaLabel,
    ariaDescribedBy,
    role,
    tabIndex,
    title,
    htmlContent,
  } = props || {};

  const tooltip = createHtmlDivElement({
    className: className || 'tooltip',
    id: id || '',
    attributes: [
      {'aria-label': ariaLabel || ''},
      {'aria-describedby': ariaDescribedBy || 'tooltipContent'},
      {role: role || 'button'},
      {tabIndex: tabIndex || '0'},
      ...(attributes || [])
    ]
  });

  const content = createHtmlDivElement({
    className: 'tooltip-content',
    attributes: [{ role: 'tooltip' }]
  });

  if (title) {
    const titleElement = document.createElement("h4");
    titleElement.appendChild(document.createTextNode(title || ''));
    content.appendChild(titleElement);
  }
  if (htmlContent) {
    content.appendChild(createHtmlFromString(htmlContent || ''));
  }

  tooltip.appendChild(content);
  return tooltip;
};

export const createHtmlFromString = (htmlString: string): DocumentFragment => {
  const range = document.createRange();
  range.selectNode(document.body);
  return range.createContextualFragment(htmlString);
};
