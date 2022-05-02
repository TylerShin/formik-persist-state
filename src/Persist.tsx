import { useFormikContext } from "formik";
import { FC, useEffect, useRef } from "react";
import isEqual from "react-fast-compare";
import { getSavedContext } from "./utils/localStorage";

interface Props {
  cacheKey: string;
  debounceTiming?: number;
  confirmMessage?: string;
  sessionStorage?: boolean;
}

const Persist: FC<Props> = ({ cacheKey, sessionStorage, confirmMessage, debounceTiming = 300 }) => {
  const context = useFormikContext();
  const setFormikState = context.setFormikState;
  const lastSavedContext = useRef<typeof context>();

  useEffect(() => {
    const savedContext = getSavedContext(cacheKey, sessionStorage);
    if (!savedContext) {
      return;
    }

    const parsedContext = JSON.parse(savedContext) as typeof context;
    if (!parsedContext.dirty) {
      return;
    }

    if (!confirmMessage) {
      setFormikState(parsedContext);
      return;
    }

    if (window.confirm(confirmMessage)) {
      setFormikState(parsedContext);
    } else {
      window.localStorage.removeItem(cacheKey);
    }
  }, [cacheKey, sessionStorage, confirmMessage, setFormikState]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isEqual(context, lastSavedContext.current)) {
        return;
      }

      if (sessionStorage) {
        window.sessionStorage.setItem(cacheKey, JSON.stringify(context));
      } else {
        window.localStorage.setItem(cacheKey, JSON.stringify(context));
      }

      lastSavedContext.current = context;
    }, debounceTiming);

    return () => {
      clearTimeout(timeout);
    };
  }, [cacheKey, context, debounceTiming, sessionStorage]);

  return null;
};

export default Persist;
