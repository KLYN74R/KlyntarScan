export const ENDPOINTS = {
  CHECKPOINT_STATS: 'get_quorum_thread_checkpoint',
  LATEST_BLOCK_ID: 'sync_state',
  GET_LATEST_BLOCKS: 'get_latest_n_blocks',
  SYMBIOTE_INFO: 'get_symbiote_info',
  GET_SEARCH_RESULT: 'get_search_result',
  FROM_STATE: 'account',
  BLOCK_BY_ID: 'block',
  BLOCK_BY_RID: 'get_block_by_rid',
  EVENT_RECEIPT: 'get_event_receipt',
  SUPER_FINALIZATION_PROOF: 'get_super_finalization',
  SKIP_STAGE_3: 'skip_procedure_stage_3'
};

export const emptyResponse = [
  '',
  'No block',
  'No event with such id',
  'No proof',
  'No SKIP_STAGE_3 for given subchain'
];