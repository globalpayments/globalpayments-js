import def from "./index";

declare global {
    interface Window {
        GlobalPayments: typeof def;
    }
}
