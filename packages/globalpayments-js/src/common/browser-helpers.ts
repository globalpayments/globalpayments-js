
export const isSafari: boolean = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

// The "document.documentMode" property is IE-specific.
// Only Internet Explorer (IE) returns a defined value and for all browsers other than IE it will return an 'undefined' value.
export const isIE = Boolean((window.document as any)[`documentMode`]);