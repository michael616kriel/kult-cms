import { Application, ControllerBase } from '@kult/core';
import { EntitySchema } from 'typeorm';
type ContentTypeUpdateInput = {
    input: {
        id: number;
        name: string;
        fields?: {
            key: string;
            value: string;
        }[];
    };
};
type ContentTypeRemoveInput = {
    input: {
        id: number;
        name: string;
    };
};
type ContentTypeQueryInput = {
    input: {
        name: string;
        where?: {
            key: string;
            value: string;
        }[];
    };
};
declare class ContentController extends ControllerBase {
    schemas: EntitySchema[];
    constructor(app: Application);
    init(): Promise<void>;
    getModelSchema(name: string): EntitySchema<any> | undefined;
    mapToResponse(name: string, obj: {
        [key: string]: string | number;
    }): {
        name: string;
        fields: {
            [key: string]: string | number;
        }[];
    };
    constructWhereQuery(where?: {
        key: string;
        value: string;
    }[]): {
        [key: string]: string | number;
    };
    getContentItem(ctx: any, { input: { name, where } }: ContentTypeQueryInput): Promise<{
        name: string;
        fields: {
            [key: string]: string | number;
        }[];
    } | null>;
    getContent(ctx: any, { input: { name, where } }: ContentTypeQueryInput): Promise<{
        name: string;
        fields: {
            [key: string]: string | number;
        }[];
    }[] | undefined>;
    createContent(ctx: any, { input: { name, fields } }: ContentTypeUpdateInput): Promise<any[] | undefined>;
    updateContent(ctx: any, { input: { id, name, fields } }: ContentTypeUpdateInput): Promise<any[] | undefined>;
    removeContent(ctx: any, { input: { id, name } }: ContentTypeRemoveInput): Promise<{
        name: string;
        fields: {
            [key: string]: string | number;
        }[];
    } | null>;
}
export default ContentController;
