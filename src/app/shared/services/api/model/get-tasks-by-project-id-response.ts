/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface GetTasksByProjectIdResponse { 
    id?: number;
    title?: string;
    description?: string;
    status?: GetTasksByProjectIdResponse.StatusEnum;
    createdDate?: string;
}
export namespace GetTasksByProjectIdResponse {
    export type StatusEnum = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
    export const StatusEnum = {
        New: 'NEW' as StatusEnum,
        InProgress: 'IN_PROGRESS' as StatusEnum,
        Completed: 'COMPLETED' as StatusEnum
    };
}


