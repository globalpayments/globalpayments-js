/**
 * InstallmentAction class model.
 */
export default class InstallmentAction {
    id: string;
    type: string;
    timeCreated: string;
    resultCode: string;
    appId: string;
    appName: string;

    constructor(
        _id: string,
        _type: string,
        _timeCreated: string,
        _resultCode: string,
        _appId: string,
        _appName: string,
    ) {
        this.id = _id;
        this.type = _type;
        this.timeCreated = _timeCreated;
        this.resultCode = _resultCode;
        this.appId = _appId;
        this.appName = _appName;
    }
}

export function installmentActionMapper(origin: {
    id: string,
    type: string,
    time_created: string,
    result_code: string,
    app_id: string,
    app_name: string,
}): InstallmentAction {
    return {
        id: origin.id,
        type: origin.type,
        timeCreated: origin.time_created,
        resultCode: origin.result_code,
        appId: origin.app_id,
        appName: origin.app_name,
    };
}