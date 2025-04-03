const styles = (_assetBaseUrl: string) => {
    const imageBase = _assetBaseUrl + "images/";
    return {
        ".bank-selection-wrapper":{
            "background": "#F6F8FD",
            "padding":"2%"
        },
        ".bank-selection": {
            "display": "flex",
            "align-items": "center",
            "flex-flow": "wrap",
            "margin-bottom": "30px"
        },
        ".bank-selecction-option": {
            "width": "23%",
            "height": "120px",
            "cursor": "pointer",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "box-shadow": "1px 2px 5px 1px lightgrey",
            "margin-right":"2%",
            "margin-left":"0",
            "margin-top":"1%",
            "background":"var(--payWithBank-button-color-background-default,#FFFFFF)",
            "border-radius":"var(--payWithBank-button-border-radius,0.125rem)",
            "flex-direction":"column"
        },
        ".bank-selecction-option::before":{
            "content": `url(${imageBase}external-link.svg)`,
            "width": "10px",
            "height": "110px",
            "position": "absolute",
            "margin-left": "20%"
        },
        ".bank-selecction-option:hover": {
            "border":"var(--payWithBank-QRbutton-weight-border-hover,1px) solid var(--payWithBank-button-color-border-hover,#707689)"
        },
        ".bank-selecction-option:active": {
            // "outline": `${cssTokens["--payWithBank-button-weight-focus-indicator"]} solid ${colors.brand.accent2}`,
            // "outline-offset": "2px",
            "background":"var(--payWithBank-button-color-background-pressed)",
            "border":"var(--payWithBank-QRbutton-weight-focus-indicator,3px) solid var(--payWithBank-button-color-border-hover,#707689)"
        },
        ".qr-code-button": {
            "background":"var(--payWithBank-QRbutton-color-background-default,#E5F4FF)"
        },
        ".title-text":{
            "color":"var(--payWithBank-color-label,#333333)",
            "font-size":"var(--payWithBank-size-text-label,16px)",
            "font-weight":"var(--payWithBank-font-weight-text-label,400)",
            "line-height":"20px",
            "font-family":"var(--payWithBank-label-fontFamily,sans-serif)"
        },
    };
};

export default styles;