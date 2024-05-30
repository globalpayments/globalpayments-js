const encode = (data: string): string => {
    return window.btoa(data);
}

const decode = (encodedData: string): string => {
    return window.atob(encodedData);
}

export const DataEncoderHelper = {
    encode,
    decode,
};