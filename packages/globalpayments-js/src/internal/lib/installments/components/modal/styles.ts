const styles = (_assetBaseUrl: string) => {
    return {
        ".secure-payment-form .modal-overlay": {
            background: "#0000006e",
            position: "fixed",
            top: "0",
            left: "0",
            margin: "0 auto",
            width: "100%",
            height: "100%",
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            "z-index": "9999",
        },
        ".secure-payment-form .modal-wrapper": {
            "font-family": "DMSans",
            background: "#FFFFFF",
            "border-width": "0px",
            "border-radius": "8px",

            overflow: "hidden",
        },
    }
}

export default styles;