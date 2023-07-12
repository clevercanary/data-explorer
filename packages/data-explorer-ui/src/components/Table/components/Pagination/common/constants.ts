import { AzulPaginationResponse } from "../../../../../apis/azul/common/entities";

export const DEFAULT_TABLE_PARAMS: Pick<AzulPaginationResponse, "size"> = {
  size: 25,
};
