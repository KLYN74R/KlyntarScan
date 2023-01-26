import { ENDPOINTS } from './endpoints';

export const ENTITIES = {
    EMPTY: 'No data',
    ROFM_STATE: 'FROM_STATE',
    BLOCK_BY_ID: 'BLOCK_BY_ID',
    BLOCK_BY_RID: 'BLOCK_BY_RID',
    SUPER_FINALIZATION_PROOF: 'SUPER_FINALIZATION_PROOF',
    SKIP_STAGE_3: 'SKIP_STAGE_3',
    EVENT_RECEIPT: 'EVENT_RECEIPT'
};

export const getEndpointByEntityType = (type: string) => {
    if (type === ENTITIES.EMPTY) {
        throw new Error('No endpoint for `Empty` entity');
    }

    return ENDPOINTS[type as keyof typeof ENDPOINTS];
}