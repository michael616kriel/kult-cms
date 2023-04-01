/// <reference types="node" />
import { Application, PluginBase } from '@kult/core';
export default class KultCMS extends PluginBase {
    constructor(app: Application);
    initialize(): Promise<void>;
}
export declare const getCmsGraphqlSchema: () => Buffer;
