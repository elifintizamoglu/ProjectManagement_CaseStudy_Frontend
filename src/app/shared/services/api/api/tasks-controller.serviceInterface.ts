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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { CreateTaskRequest } from '../model/models';
import { CreateTaskResponse } from '../model/models';
import { GetAllTasksResponse } from '../model/models';
import { GetTaskByIdResponse } from '../model/models';
import { UpdateTaskRequest } from '../model/models';
import { UpdateTaskResponse } from '../model/models';
import { UpdateUserById400Response } from '../model/models';


import { Configuration }                                     from '../configuration';


export interface AddTaskRequestParams {
    createTaskRequest: CreateTaskRequest;
}

export interface DeleteTaskByIdRequestParams {
    id: number;
}

export interface GetTaskByIdRequestParams {
    id: number;
}

export interface UpdateTaskByIdRequestParams {
    id: number;
    updateTaskRequest: UpdateTaskRequest;
}


export interface TasksControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
* @param requestParameters
     */
    addTask(requestParameters: AddTaskRequestParams, extraHttpRequestParams?: any): Observable<CreateTaskResponse>;

    /**
     * 
     * 
* @param requestParameters
     */
    deleteTaskById(requestParameters: DeleteTaskByIdRequestParams, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
*/
    getAllTasks(extraHttpRequestParams?: any): Observable<Array<GetAllTasksResponse>>;

    /**
     * 
     * 
* @param requestParameters
     */
    getTaskById(requestParameters: GetTaskByIdRequestParams, extraHttpRequestParams?: any): Observable<GetTaskByIdResponse>;

    /**
     * 
     * 
* @param requestParameters
     */
    updateTaskById(requestParameters: UpdateTaskByIdRequestParams, extraHttpRequestParams?: any): Observable<UpdateTaskResponse>;

}
