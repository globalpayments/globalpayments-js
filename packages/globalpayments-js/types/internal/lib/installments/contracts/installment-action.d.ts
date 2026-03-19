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
    constructor(_id: string, _type: string, _timeCreated: string, _resultCode: string, _appId: string, _appName: string);
}
export declare function installmentActionMapper(origin: {
    id: string;
    type: string;
    time_created: string;
    result_code: string;
    app_id: string;
    app_name: string;
}): InstallmentAction;
