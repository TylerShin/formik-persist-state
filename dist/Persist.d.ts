import { FC } from "react";
interface Props {
    cacheKey: string;
    debounceTiming?: number;
    confirmMessage?: string;
    sessionStorage?: boolean;
}
declare const Persist: FC<Props>;
export default Persist;
